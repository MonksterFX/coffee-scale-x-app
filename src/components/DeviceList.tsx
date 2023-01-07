import React from 'react';
import { TouchableHighlight, View } from 'react-native';
import { useBleStore } from '../stores/bleStore';
import { DeviceListItem } from './DeviceListItem';

export function DeviceList() {
  const { scannedDevices } = useBleStore();

  return (
    <View
      style={{
        flexDirection: 'column',
      }}
    >
      {scannedDevices.map((d) => (
        <DeviceListItem key={d.id} device={d} />
      ))}
    </View>
  );
}
