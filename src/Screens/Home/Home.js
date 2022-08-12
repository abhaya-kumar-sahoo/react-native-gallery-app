import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  ScrollView,
  PermissionsAndroid,
} from 'react-native';
import React from 'react';

import CameraRoll from '@react-native-community/cameraroll';
import {useNavigation} from '@react-navigation/native';
export const Home = () => {
  async function hasAndroidPermission() {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  }
  const [photo, setPhoto] = React.useState([]);
  const [album, setAlbum] = React.useState([]);

  const nav = useNavigation();

  React.useEffect(() => {
    hasAndroidPermission().then(res => {
      if (res) {
        handleButtonPress();
      }
    });
    console.log(photo);
  }, []);

  const handleButtonPress = () => {
    CameraRoll.getAlbums().then(r => {
      // console.log(r);
      setAlbum(r);
    });

    CameraRoll.getPhotos({
      first: 20,
      assetType: 'Photos',
      groupName: 'boAt',
      // groupTypes: 'boAt',
    })
      .then(r => {
        // r.edges.map(i => {
        //   console.log(i.node);
        // });
        setPhoto(r.edges);
      })
      .catch(err => {
        //Error Loading Images
        console.log(err);
      });
  };

  return (
    <View style={{backgroundColor: '#161616', flex: 1}}>
      {/* <Button title="Load Images" onPress={handleButtonPress} /> */}
      <ScrollView>
        {album.map((p, i) => {
          return (
            <TouchableOpacity
              onPress={() => nav.navigate('Album', {type: p.title})}
              key={i}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={{
                  width: 80,
                  height: 80,
                  backgroundColor: '#191919',
                  margin: 10,
                  borderRadius: 10,
                }}
              />
              <View style={{flexDirection: 'column'}}>
                <Text
                  style={{color: '#dddddd', fontWeight: 'bold', fontSize: 18}}>
                  {p.title}
                </Text>
                <Text
                  style={{color: '#dddddd', fontWeight: 'bold', fontSize: 18}}>
                  {p.count}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({});
