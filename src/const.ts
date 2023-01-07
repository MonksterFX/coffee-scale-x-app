// here you can find all commands and service UUID in use
export const SERVICE_WEIGHT_UUID = '4fafc201-1fb5-459e-8fcc-c5c9c331914b';
export const CHARACTERISTIC_WEIGHT_VALUE_UUID =
  'beb5483e-36e1-4688-b7f5-ea07361b26a8';
export const CHARACTERISTIC_COMMAND_UUID =
  '8553c338-cd98-45da-affd-37ea6f3d3d91';

/**
 * structure of commands: uint8 Command, uint8 Subcommand, float value
 * more commands can be found in the arduino repository
 */
export const COMMANDS = {
  // 0x0A00, ignoring 32bit of value
  tare: 'CgAA',

  // 0x0A01, ignoring 32bit of value
  tareTop: 'CgE=',

  // 0x0A02, ignoring 32bit of value
  tareBottom: 'CgI=',

  // TODO: add calibration
};
