import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import CameraRoll from '@react-native-community/cameraroll';
import ImageView from 'react-native-image-viewing';

export const Video = () => {
  const [album, setAlbum] = useState([]);
  const nav = useNavigation();
  const [photo, setPhoto] = React.useState([]);

  const GetAlbumPhoto = AlBumName =>
    CameraRoll.getPhotos({
      assetType: 'Videos',
      groupTypes: 'All',
      groupName: AlBumName,
      first: 1,
    }).then(response => {
      console.log('====================================');
      console.log(response.edges);
      console.log('====================================');
      return response.edges[0];
    });
  const getImageAlbum = async () => {
    CameraRoll.getAlbums({
      assetType: 'Videos',
    })
      .then(async r => {
        setAlbum(r);
        r.map(albumData => {
          const Datatoget = GetAlbumPhoto(albumData.title);
          setPhoto([]);

          Datatoget.then(data => {
            setPhoto(photo => [...photo, data.node.image.uri]);
          });
        });
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
    <View style={{flex: 1}}>
      <ScrollView contentContainerStyle={{paddingBottom: 200}}>
        {album.map((p, i) => {
          return (
            <TouchableOpacity
              onPress={() => nav.navigate('VideoList', {type: p.title})}
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
