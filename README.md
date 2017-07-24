# microBit.js
A javascript library to interact with BBC micro:bit using web bluetooth API.

## Usage

To use the library, download and upload [this firmware](https://drive.google.com/uc?id=0B2Ud_NaMFsQSdm1BMVMtN3F4a3c&export=download) on your BBC micro:bit board.

The firmware was produced by [bittysoftware](http://www.bittysoftware.com/downloads.html).

Keep in mind that web bluetooth API are still experimental and your OS and browser might not support the feature. Read more about this [here](https://developers.google.com/web/updates/2015/07/interact-with-ble-devices-on-the-web).

This Library allows you to read and write the values of all the BLEcharacteristic exposed by the microBit board using simplified API's.

For more info about all micro:bit ble services please refer to the [official documentation](https://lancaster-university.github.io/microbit-docs/ble/profile/).

The example folder provided contains several examples for interacting with the device.

## Constructor

- `microBit=new uBit()`

## Properties

- `microBit.connected`

## Functions


- `microBit.searchDevice()`

- `microBit.setButtonACallback(callbackFunction)`

- `microBit.setButtonBCallback(callbackFunction)`

- `microBit.onConnect(callbackFunction)`

- `microBit.onDisconnect(callbackFunction)`

- `microBit.onBleNotify(callbackFunction)`

- `microBit.writeMatrixIcon(icon)`

- `microBit.writeMatrixText(text)`

- `microBit.getAccelerometer()`

- `microBit.getTemperature()`

- `microBit.getBearing()`

- `writeMatrixTextSpeed(speed)`
