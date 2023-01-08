import { StyleSheet, Text, View } from 'react-native';
import { Device } from 'react-native-ble-plx';
import { Button } from '../components/Button';
import { useBleStore } from '../stores/bleStore';

interface DeviceDetailsProps {
  device: Device;
}

export function DeviceDetail(props: DeviceDetailsProps) {
  const { device } = props;
  const { stop, tare } = useBleStore();

  return (
    <View style={{ padding: 20 }}>
      <Text>Details</Text>
      <Text style={{ fontWeight: 'bold', fontSize: 24 }}>{device.name}</Text>
      <Text style={{ fontStyle: 'italic' }}>{device.id}</Text>

      <View style={{ marginVertical: 24 }}>
        <Button title='Tare' onPress={tare}></Button>
        <Button
          title='Set Calibration'
          onPress={() => alert('not implemented yet, sorry')}
        ></Button>
        <Button title='Disconnect' onPress={stop}></Button>
      </View>
    </View>
  );
}
