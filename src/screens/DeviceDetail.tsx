import { Button, StyleSheet, Text, View } from 'react-native';
import { Device } from 'react-native-ble-plx';
import { useBleStore } from '../stores/bleStore';

interface DeviceDetailsProps {
  device: Device;
}

export function DeviceDetail(props: DeviceDetailsProps) {
  const { device } = props;
  const { stop, tare } = useBleStore();

  return (
    <View>
      <Text>Details</Text>
      <Text style={{ fontWeight: 'bold', fontSize: 24 }}>{device.name}</Text>
      <Text style={{ fontStyle: 'italic' }}>{device.id}</Text>

      <Text>Calibration</Text>
      <Button title='Tare' onPress={tare}></Button>
      <Button
        title='Set Calibration'
        onPress={() => alert('not implemented yet, sorry')}
      ></Button>
      <Button title='Disconnect' onPress={stop}></Button>
    </View>
  );
}
