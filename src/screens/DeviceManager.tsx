import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { State } from 'react-native-ble-plx';
import { DeviceList } from '../components/DeviceList';
import { useBleStore } from '../stores/bleStore';
import { DeviceDetail } from './DeviceDetail';

export function DeviceManager() {
  const { start, stop, currentDevice, currentState } = useBleStore();

  if (currentDevice) {
    return <DeviceDetail device={currentDevice}></DeviceDetail>;
  }

  return (
    <View style={{ padding: 20 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View>
          <Text style={{ fontSize: 24 }}>Search Scale-X</Text>
          <Text>BLE State: {currentState}</Text>
        </View>
        <Button title='Start' onPress={start}></Button>
        <Button title='Stop' onPress={stop}></Button>
      </View>
      <View style={{ marginTop: 20 }}>
        <DeviceList></DeviceList>
      </View>
    </View>
  );
}
