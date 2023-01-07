import { Skia } from '@shopify/react-native-skia';
import { curveLines } from './math';

export function buildSpline(
  canvasWidth: number,
  canvasHeight: number,
  data: [number, number][],
  options?: { padding?: number }
) {
  // calc padding
  const drawAreaWidth = canvasWidth - (options?.padding ?? 0) * 2;
  const drawAreaHeight = canvasHeight - (options?.padding ?? 0) * 2;

  // optimize
  const xValues = data.map((value) => value[0]);
  const yValues = data.map((value) => value[1]);

  // find borders
  const minX = Math.min(...xValues);
  const maxX = Math.max(...xValues);
  const minY = Math.min(...yValues);
  const maxY = Math.max(...yValues);

  const deltaX = maxX - minX;
  const deltaY = maxY - minY;

  // scaling points
  const points = data.map(([xRaw, yRaw]): { x: number; y: number } => {
    const x = ((xRaw - minX) / deltaX) * drawAreaWidth;
    const y = drawAreaHeight - ((yRaw - minY) / deltaY) * drawAreaHeight; // we have to invert the y value here
    return { x, y };
  });

  if (data.length === 0) {
    return { path: Skia.Path.Make() };
  }

  // smoth curve
  return { path: curveLines(points, 0.1, 'complex') };
}
