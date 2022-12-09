import { Camera, CameraType } from "expo-camera";
import { useState, useEffect } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MyComponent from "./CameraComponent";
import { cameraWithTensors } from "@tensorflow/tfjs-react-native";

const TensorCamera = cameraWithTensors(Camera);

export default function CameraPage() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }
  //   const handleCameraStream = (images, updatePreview, gl) => {
  //     const loop = async () => {
  //       const nextImageTensor = images.next().value;

  //       //
  //       // do something with tensor here
  //       //

  //       // if autorender is false you need the following two lines.
  //       // updatePreview();
  //       // gl.endFrameEXP();

  //       requestAnimationFrame(loop);
  //     };
  //     loop();
  //   };

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
  //     <View>
  //       <TensorCamera
  //         // Standard Camera props
  //         style={styles.camera}
  //         type={Camera.Constants.Type.front}
  //         // Tensor related props
  //         cameraTextureHeight={textureDims.height}
  //         cameraTextureWidth={textureDims.width}
  //         resizeHeight={200}
  //         resizeWidth={152}
  //         resizeDepth={3}
  //         onReady={handleCameraStream}
  //         autorender={true}
  //       />
  //     </View>
  //   );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
});
