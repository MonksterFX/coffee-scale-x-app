import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Device, State } from 'react-native-ble-plx';
import { bleManager, startScan, stopScan } from '../services/bleService';
import { DeviceEventEmitter } from 'react-native';
import {
  CHARACTERISTIC_COMMAND_UUID,
  CHARACTERISTIC_WEIGHT_VALUE_UUID,
  COMMANDS,
  SERVICE_WEIGHT_UUID,
} from '../const';
import { decode } from 'base64-arraybuffer';

interface Measurement {
  index: number;
  top: number;
  bottom: number;
  flow: number;
  total: number;
  receivedAt?: Date;
}

interface BleState {
  currentState: State;
  currentDevice?: Device;
  scannedDevices: Device[];
  lastValue?: Measurement;
  brewStarted?: Date;
  record: Measurement[];
  isRecording: boolean;
  connect: (device: Device) => Promise<void>;
  tare: () => void;
  start: () => void;
  stop: () => void;
  startRecording: () => void;
  stopRecording: () => void;
}

function start() {
  useBleStore.setState({ scannedDevices: [] });
  startScan();
}

function stop() {
  stopScan();
  useBleStore.setState({ currentDevice: undefined, scannedDevices: [] });
}

async function tare(): Promise<void> {
  console.log('send tare request');

  useBleStore
    .getState()
    .currentDevice?.writeCharacteristicWithResponseForService(
      SERVICE_WEIGHT_UUID,
      CHARACTERISTIC_COMMAND_UUID,
      COMMANDS.tare
    );

  // reset record when tare
  useBleStore.setState({ record: [] });
}

function decodeValues(msg: string): Measurement {
  const buf = decode(msg);

  if (buf.byteLength === 12) {
    const arr = new Int32Array(buf);

    return {
      top: arr[1],
      bottom: arr[2],
      total: arr[1] + arr[2],
      index: arr[0],
      receivedAt: new Date(),
      flow: -1,
    };
  }

  throw new Error(
    `byte length of message must be 12 bytes long, but is ${buf.byteLength}`
  );
}

async function connect(device: Device) {
  const _connectedDevice = await bleManager
    .connectToDevice(device.id)
    .then((device) => {
      return device.discoverAllServicesAndCharacteristics();
    })
    .catch(console.error);

  if (_connectedDevice) {
    console.log(`connected to device:`, device.id);
    useBleStore.setState({ currentDevice: _connectedDevice });

    device.monitorCharacteristicForService(
      SERVICE_WEIGHT_UUID,
      CHARACTERISTIC_WEIGHT_VALUE_UUID,
      (error, chr) => {
        if (error || !chr?.value) {
          return console.error(error);
        } else {
          const newMeasurement = {
            ...decodeValues(chr.value),
          };

          const record = useBleStore.getState().isRecording
            ? [...useBleStore.getState().record, newMeasurement]
            : useBleStore.getState().record;

          useBleStore.setState({
            lastValue: newMeasurement,
            record: record,
          });

          return;
        }
      }
    );

    return;
  }

  console.log(`reset`);
  useBleStore.setState({ currentDevice: undefined });
}

function stopRecording() {
  useBleStore.setState({ isRecording: false });
}

function startRecording() {
  // clear all values
  useBleStore.setState({ record: [], isRecording: true });
}

export const useBleStore = create<BleState>()(
  devtools(
    persist(
      (set) => ({
        currentState: State.Unknown,
        deviceConnected: undefined,
        scannedDevices: [],
        connect: connect,
        lastValue: undefined,
        isRecording: false,
        brewStarted: undefined,
        record: [],
        startRecording: startRecording,
        stopRecording: stopRecording,
        start: start,
        stop: stop,
        tare: tare,
      }),
      {
        name: 'ble-storage',
      }
    )
  )
);

// helper method
function uniqueDevices(devices: Device[]) {
  const devicesUnique: Record<string, Device> = {};
  for (const device of devices) {
    devicesUnique[device.id] = device;
  }
  return Object.values(devicesUnique);
}

// subscribe
bleManager
  .state()
  .then((state) => useBleStore.setState({ currentState: state }));
bleManager.onStateChange((state) =>
  useBleStore.setState({ currentState: state })
);

DeviceEventEmitter.addListener('found', (device: Device) =>
  useBleStore.setState((state) => ({
    scannedDevices: uniqueDevices([...state.scannedDevices, device]),
  }))
);
