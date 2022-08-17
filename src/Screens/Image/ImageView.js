import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

import {useSwipe} from '../../Component';
import ImageLayout from 'react-native-image-layout';

export const ImageView = ({route}) => {
  const {imageList, index} = route.params;
  const [ImageList, setImageList] = useState([]);
  const [Count, setCount] = useState(0);
  const ref = useRef();
  useEffect(() => {
    let newJson = imageList.map(i => {
      return {
        uri: i.node.image.uri,
      };
    });
    // console.log('newJson', newJson);
    // imageList.map(i => {
    //   setImageList(ImageList => [...ImageList, i.node.image.uri]);
    // });
    setImageList(newJson);
    setCount(index);
  }, []);
  // source={{uri: imageList[Count].node.image.uri}}
  const {onTouchStart, onTouchEnd} = useSwipe(onSwipeLeft, onSwipeRight, 2);
  function onSwipeLeft() {
    console.log('SWIPE_LEFT');
    setCount(Count + 1);
  }

  function onSwipeRight() {
    console.log('SWIPE_RIGHT');
    setCount(Count - 1);
  }

  return (
    <View
      // onTouchStart={onTouchStart}
      // onTouchEnd={onTouchEnd}
      style={{backgroundColor: '#161616', flex: 1}}>
      {ImageList.length > 0 && (
        <ImageLayout
          imageContainerStyle={{backgroundColor: 'black', borderRadius: 10}}
          images={ImageList}
          columns={4}
          initialColToRender={4}
          initialNumInColsToRender={4}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({});
