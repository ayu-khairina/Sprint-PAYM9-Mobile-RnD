import React, {Component, useState} from 'react';
import {RNCamera} from 'react-native-camera';
import {TouchableOpacity, Text, View, StyleSheet, Alert, Image} from 'react-native';
import ImagePicker from 'react-native-image-picker';
function Camera() {
  const [data, setData] = useState();
  
    const click = () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        {name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    /**
     * The first arg is the options object for customization (it can also be null or omitted for default options),
     * The second arg is the callback which sends object: response (more info in the API Reference)
     */
 
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        setData({
          filePath: response,
          fileData: response.data,
          fileUri: response.uri,
        });
      }
    });}
  
   const renderFileUri = () => {
      if (data) {
        return <Image
          source={{ uri: data.fileUri }}
          style={styles.images}
        />
      }
    }
  console.log(data, 'data');

  return (
    <>
      <View>
        <View style={styles.buttonAction}>
          <TouchableOpacity onPress={()=>click()}> 
            <Text>Choose File</Text>
          </TouchableOpacity>
        </View>
        <View>
          {renderFileUri()}
        </View>
        <View style={styles.buttonAction}>
          <TouchableOpacity>
            <Text>Launch Camera</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonAction}>
          <TouchableOpacity>
            <Text>Get Photo from Library</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
export default Camera;
const styles = StyleSheet.create({
  btnAlignment: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonAction: {
    borderColor: 'black',
    height: 30,
    width: 200,
    padding: 5,
    marginBottom: 10,
    backgroundColor: 'red',
  },
  images: {
    width: 150,
    height: 150,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 3
  }
});
