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
import CameraRollPicker from '@kebetoo/camera-roll-picker';

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
  const GetAlbumPhoto = AlBumName =>
    CameraRoll.getPhotos({
      assetType: 'Photos',
      groupTypes: 'All',
      groupName: AlBumName,
      first: 1,
    }).then(response => {
      return response.edges[0];
    });
  React.useEffect(() => {
    hasAndroidPermission().then(res => {
      if (res) {
        handleButtonPress();
      }
    });
  }, []);

  const handleButtonPress = () => {
    setPhoto([]);
    CameraRoll.getAlbums({
      assetType: 'Photos',
    }).then(r => {
      setAlbum(r);
      setPhoto([]);

      r.map(albumData => {
        const Datatoget = GetAlbumPhoto(albumData.title);
        setPhoto([]);

        Datatoget.then(data => {
          setPhoto(photo => [...photo, data.node.image.uri]);
        });
      });
    });
  };
  return (
    <View style={{backgroundColor: '#161616', flex: 1}}>
      {/* <CameraRollPicker selectSingleItem={true} groupName="boAt" /> */}
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
                source={{uri: photo[i]}}
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
