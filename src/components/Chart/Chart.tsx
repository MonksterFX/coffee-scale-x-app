import React, { useMemo, useState } from 'react';
import { Button, Text, useWindowDimensions } from 'react-native';
import {
  Canvas,
  Circle,
  Group,
  Path,
  Points,
  vec,
} from '@shopify/react-native-skia';
import { buildSpline } from './utils';
import { useBleStore } from '../../stores/bleStore';

let timer: NodeJS.Timer | undefined = undefined;

const exampleData: [number, number][] = [
  [0, 0],
  [100, 50],
  [200, 0],
  [300, 150],
  [400, 0],
  [500, -50],
  [600, 0],
  [700, -150],
  [800, 0],
];

export function Chart() {
  const { record } = useBleStore();

  const window = useWindowDimensions();
  const { width } = window;
  const padding = 20;

  const { path } = useMemo(
    () =>
      buildSpline(
        width,
        width / 2,
        record.map((item) => [item.index, item.total]),
        { padding }
      ),
    [record]
  );

  return (
    <>
      <Canvas style={{ flex: 1 }}>
        <Group transform={[{ translateY: padding }, { translateX: padding }]}>
          <Path
            style='stroke'
            path={path}
            strokeWidth={4}
            strokeJoin='round'
            strokeCap='round'
          ></Path>
        </Group>
      </Canvas>
    </>
  );
}
