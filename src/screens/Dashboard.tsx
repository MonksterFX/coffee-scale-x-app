import dayjs from 'dayjs';
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button } from '../components/Button';
import { Chart } from '../components/Chart/Chart';
import { useBleStore } from '../stores/bleStore';

const styleSheet = StyleSheet.create({
  box: {
    padding: 20,
  },
  heading1: {
    fontSize: 36,
  },
  heading2: {
    fontSize: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export function Dashboard() {
  const { lastValue, currentDevice, tare, startRecording, stopRecording } =
    useBleStore();
  return (
    <>
      <View style={{ padding: 20 }}>
        <View>
          <View style={styleSheet.box}>
            <Text style={styleSheet.heading2}>{currentDevice?.name}</Text>
            <Text>Last value index: {lastValue?.index}</Text>
          </View>
          <View style={styleSheet.row}>
            <View style={styleSheet.box}>
              <Text style={styleSheet.heading1}>{lastValue?.total}g</Text>
            </View>
            <View style={styleSheet.box}>
              <Text style={styleSheet.heading1}>{lastValue?.flow}ml/s</Text>
            </View>
          </View>
        </View>
      </View>
      <Chart></Chart>
      <View style={{ paddingVertical: 10 }}>
        <Button title='Tare' onPress={tare}></Button>
        <Button title='Start' onPress={startRecording}></Button>
        <Button title='Finish' onPress={stopRecording}></Button>
      </View>
    </>
  );
}
