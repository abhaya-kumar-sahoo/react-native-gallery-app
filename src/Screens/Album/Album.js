import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  ScrollView,
  PermissionsAndroid,
  FlatList,
} from 'react-native';

import CameraRoll from '@react-native-community/cameraroll';
import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
let page = 50;
export const Album = ({route}) => {
  const [photo, setPhoto] = useState([]);
  const nav = useNavigation();
  const getImageAlbum = (number = page) => {
    CameraRoll.getPhotos({
      first: number,
      assetType: 'Photos',
      groupName: route.params?.type,
      groupTypes: 'boAt',
    })
      .then(r => {
        setPhoto(r.edges);
      })
      .catch(err => {
        //Error Loading Images
        console.log(err);
      });
  };
  useEffect(() => {
    getImageAlbum();
  }, []);

  return (
    <View
      style={{
        backgroundColor: '#161616',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <FlatList
        data={photo}
        numColumns={4}
        keyExtractor={(item, index) => index}
        onEndReached={() => getImageAlbum(page + 100)}
        renderItem={({item, index, separators}) => (
          <TouchableOpacity
            onPress={() =>
              nav.navigate('ImageView', {imageList: photo, index: index})
            }
            style={{
              borderRadius: 10,
              width: 85,
              height: 85,
              margin: 10,
              borderWidth: 1,
              borderColor: '#898989',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}>
            <Image
              key={index}
              style={{
                width: 80,
                height: 80,
                borderRadius: 10,
              }}
              source={{uri: item.node.image.uri}}
              resizeMode="cover"
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
