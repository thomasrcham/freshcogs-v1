import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import * as tf from "@tensorflow/tfjs";
import { fetch } from "@tensorflow/tfjs-react-native";
import * as mobilenet from "@tensorflow-models/mobilenet";
import { Camera, CameraType } from "expo-camera";
import { useState, useEffect } from "react";
import { cameraWithTensors } from "@tensorflow/tfjs-react-native";
const TensorCamera = cameraWithTensors(Camera);

function toggleCameraType() {
  setType((current) =>
    current === CameraType.back ? CameraType.front : CameraType.back
  );
}

const handleCameraStream = (images, updatePreview, gl) => {
  const loop = async () => {
    const nextImageTensor = images.next().value;

    //       //
    //       // do something with tensor here
    //       //

    //       // if autorender is false you need the following two lines.
    //       // updatePreview();
    //       // gl.endFrameEXP();

    requestAnimationFrame(loop);
  };
  loop();
};

class TFTestComponent extends React.Component {
  state = {
    isTfReady: false,
    isModelReady: false,
  };

  async componentDidMount() {
    await tf.ready();
    this.setState({
      isTfReady: true,
    });
    this.model = await mobilenet.load();
    this.setState({ isModelReady: true });
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === "granted");
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <TensorCamera
            // Standard Camera props
            style={styles.camera}
            type={Camera.Constants.Type.front}
            // Tensor related props
            // cameraTextureHeight={textureDims.height}
            // cameraTextureWidth={textureDims.width}
            resizeHeight={200}
            resizeWidth={152}
            resizeDepth={3}
            onReady={handleCameraStream}
            autorender={true}
          />
        </View>
        <Text>TFJS ready? {this.state.isTfReady ? <Text>Yes</Text> : ""}</Text>
        <Text>
          Model ready?{" "}
          {this.state.isModelReady ? (
            <Text>Yes</Text>
          ) : (
            <Text>Loading Model...</Text>
          )}
        </Text>
        <Button title="camera" onPress={toggleCameraType} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default TFTestComponent;

// export default function CameraPage() {

//

//   // Currently expo does not support automatically determining the
//   // resolution of the camera texture used. So it must be determined
//   // empirically for the supported devices and preview size.

//   let textureDims;
//   if (Platform.OS === "ios") {
//     textureDims = {
//       height: 1920,
//       width: 1080,
//     };
//   } else {
//     textureDims = {
//       height: 1200,
//       width: 1600,
//     };
//   }

//   return (
//
//   );
// }
