/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Alert
} from 'react-native';

import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import axios from 'axios'

const options = {
  title: 'Infokes Mobile Team',
  takePhotoButtonTitle: 'Take photo with your camera',
  chooseFromLibraryButtonTitle: 'Choose photo from library',
};

const App = () => {
  const [ avatarSource, setAvatarSource ] = useState(null)
  const [ pic, setPic ] = useState(null)

  const uploadPic = () => {
    // IP Adreess dan letak file up
    RNFetchBlob.fetch(
      'POST',
      'http://192.168.1.13:8000/api/v1/setting/uploadimage',
      {
        Authorization: 'Bearer access-token',
        otherHeader: 'foo',
        'Content-Type': 'multipart/form-data',
      },
      [
        // name: image adalah nama properti dari api kita
        // {name: 'image', filename: 'tempbody.jpg', data: pic},
        { name : 'info', data : JSON.stringify({
          mail : 'example@example.com',
          tel : '12345678'
        })
        }
      ],
    ).then((resp) => {
      console.log('Response Saya');
      console.log(resp);
      setAvatarSource(null)
    });
  };

  const uploadFormData = async () => {
    const baseUrl = 'http://192.168.1.13:8000/api/v1/setting/uploadimage'
    
    const body = {
      mail: 'odanicola@gmail.com'
    }

    const headers = { }

    var formData = new FormData()
    formData.append("name", "odanicola")
    formData.append("image", pic)

    axios.post(baseUrl, formData, headers).then(({data}) => {
      console.log('data: ', data)
    }).catch((err) => {
      console.log("error: ", err)
    })
  }
  
  const myfun = () => {
    //alert('clicked');
    ImagePicker.showImagePicker(options, (response) => {
      // console.log('Response = ', response);
  
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image Picker Error: ', response.error);
      } else {
        let source = {uri: response.uri};
  
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
  
        setAvatarSource(source)
        setPic(response.data)
      }
    });
  };

  return (
    <View style={styles.container}>
        <Text style={styles.welcome}>Facial ID with Vonage</Text>
        <Text style={{ fontSize: 12 }}>by Infokes Mobile Application Superb Team</Text>
        <Image
          source={avatarSource}
          style={{width: '100%', height: 300, margin: 10}}
        />

        <TouchableOpacity
          style={{backgroundColor: 'orange', margin: 10, padding: 10}}
          onPress={myfun}>
          <Text style={{color: '#fff'}}>Choose Image</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={uploadFormData}>
          <Text>Upload</Text>
        </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default App;
