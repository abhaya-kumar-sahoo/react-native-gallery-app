import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import ImageZoom from 'react-native-image-pan-zoom';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import ImageViewer from 'react-native-image-zoom-viewer';

export const ImageView = ({route}) => {
  const {imageList, index} = route.params;
  console.log(index);
  const [ImageList, setImageList] = useState([]);
  const [Count, setCount] = useState(0);
  const ref = useRef();
  useEffect(() => {
    let newJson = imageList.map(i => {
      return {
        url: i.node.image.uri,
      };
    });
    // console.log(newJson);
    // imageList.map(i => {
    //   setImageList(ImageList => [...ImageList, i.node.image.uri]);
    // });
    setImageList(newJson);
    setCount(index);
    console.log(imageList[0]);
  }, []);
  // source={{uri: imageList[Count].node.image.uri}}

  return (
    <View style={{backgroundColor: '#161616', flex: 1}}>
      {/* <ImageZoom
        cropWidth={width}
        swipeDownThreshold
        enableSwipeDown
        enableCenterFocus
        enableDoubleClickZoom
        cropHeight={height}
        imageWidth={width}
        imageHeight={height}
        onDragLeft={() => alert('hii')}>
        {imageList[index] == 'undefined' ? null : (
          <ImageViewer
            style={{
              width: width,
              height: height,
              backgroundColor: '#000000',
            }}
            renderIndicator={() => null}
            index={0}
            backgroundColor="#000000"
            imageUrls={ImageList}
          />
        )}
      </ImageZoom> */}
      <ImageViewer
        ref={ref}
        style={{
          width: width,
          height: height,
          backgroundColor: '#787877',
        }}
        renderIndicator={() => null}
        index={0}
        backgroundColor="#000000"
        imageUrls={imageList.length == 0 ? [{url: ''}] : [{url: ''}]}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
