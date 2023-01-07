import { DeviceEventEmitter } from 'react-native';
import { BleManager, Device, ScanMode, State } from 'react-native-ble-plx';
import { SERVICE_WEIGHT_UUID } from '../const';

export const bleManager = new BleManager();

export type BleScanningEvents = 'found';

export function startScan() {
  console.info('start ble scanning');
  bleManager.startDeviceScan(
    [SERVICE_WEIGHT_UUID],
    { scanMode: ScanMode.LowPower, allowDuplicates: false },
    (err, device) => {
      if (device) {
        console.log(`found device ${device}`);
        DeviceEventEmitter.emit('found', device);
      }
    }
  );
}

export function stopScan() {
  console.info('stop ble scanning');
  bleManager.stopDeviceScan();
  disconnectAll();
}

export async function getConnectedDevices() {
  return bleManager.connectedDevices([SERVICE_WEIGHT_UUID]);
}

export async function disconnectAll() {
  const devices = await bleManager.connectedDevices([SERVICE_WEIGHT_UUID]);
  console.log('disconnect all devices', devices.map((d) => d.id).join(','));
  const _closedDevices = devices.map((d) =>
    bleManager.cancelDeviceConnection(d.id)
  );

  return Promise.all(_closedDevices);
}
