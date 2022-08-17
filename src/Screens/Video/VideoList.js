import {FlatList, StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import CameraRoll from '@react-native-community/cameraroll';
import VideoPlayer from 'react-native-video-controls';

export const VideoList = ({route}) => {
  const [Videos, setVideos] = useState([]);
  const GetAlbumPhoto = () =>
    CameraRoll.getPhotos({
      assetType: 'Videos',
      groupTypes: 'All',
      groupName: route.params?.type,
      first: 100000,
    }).then(response => {
      console.log('====================================');
      console.log(response.edges);
      console.log('====================================');
      setVideos(response.edges);
    });

  useEffect(() => {
    GetAlbumPhoto();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#161616'}}>
      {Videos.length == 2 ? (
        <FlatList
          data={Videos}
          numColumns={3}
          key={'_'}
          keyExtractor={item => '_' + item.node.group_name}
          renderItem={({item, index, separators}) => {
            return (
              <Image
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 10,
                  backgroundColor: '#121212',
                }}
                source={{uri: item.node.image.uri}}
              />
            );
          }}
        />
      ) : (
        <FlatList
          data={Videos}
          numColumns={3}
          key={'#'}
          keyExtractor={item => '#' + item.node.group_name}
          renderItem={({item, index, separators}) => {
            return (
              <Image
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 10,
                  backgroundColor: '#121212',
                }}
                source={{uri: item.node.image.uri}}
              />
            );
          }}
        />
      )}

      {/* <VideoPlayer   /> */}
    </View>
  );
};

export default VideoList;

const styles = StyleSheet.create({});
