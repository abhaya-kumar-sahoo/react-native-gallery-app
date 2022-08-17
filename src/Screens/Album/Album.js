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
import ImageLayout from 'react-native-image-layout';

import CameraRoll from '@react-native-community/cameraroll';
import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
let page = 50;
export const Album = ({route}) => {
  const [photo, setPhoto] = useState([]);
  const nav = useNavigation();
  const getImageAlbum = async (number = page) => {
    CameraRoll.getPhotos({
      first: number,
      assetType: 'Photos',
      groupName: route.params?.type,
      groupTypes: 'All',
    })
      .then(async r => {
        let newJson = await r.edges.map(i => {
          return {uri: i.node.image.uri};
        });

        setPhoto(newJson);
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
    <View style={{backgroundColor: '#161616', flex: 1}}>
      {photo.length > 0 && (
        <ImageLayout
          imageContainerStyle={{
            backgroundColor: 'black',
            flex: 1,
            borderRadius: 10,
          }}
          images={photo}
          spacing={5}
          columns={3}
          masonryFlatListColProps={styles.test}
        />
      )}

      {/* <FlatList
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
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  test: {
    backgroundColor: '#161616',
  },
});
