import React, {Component} from 'react';
import {RNCamera} from 'react-native-camera';
export default class Camera extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <RNCamera
        ref={ref => {
          this.camera = ref;
        }}
        captureAudio={false}
        style={{
          flex: 1,
        }}
        type={RNCamera.Constants.Type.back}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
      />
    );
  }
}
