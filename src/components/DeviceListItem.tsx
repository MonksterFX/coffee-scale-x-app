import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';
import { Device } from 'react-native-ble-plx';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useBleStore } from '../stores/bleStore';

const styles = StyleSheet.create({
  baseText: {},
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

interface DeviceListItemProps {
  device: Device;
}

export function DeviceListItem(props: DeviceListItemProps) {
  const { device } = props;
  const { connect } = useBleStore();

  return (
    <View
      style={{
        padding: 15,
        borderColor: 'black',
        borderWidth: 3,
        borderRadius: 15,
        marginBottom: 10,
      }}
    >
      <TouchableOpacity onPress={() => connect(device)}>
        <View style={{ flexDirection: 'column' }}>
          <Text style={styles.titleText}>{device.name || 'Unkown'}</Text>
          <Text>{device.rssi} RSSI</Text>
        </View>
        <Text>{device.id}</Text>
      </TouchableOpacity>
    </View>
  );
}
