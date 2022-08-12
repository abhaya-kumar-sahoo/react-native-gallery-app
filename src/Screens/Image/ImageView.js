import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

export const ImageView = ({route}) => {
  console.log(route);
  return (
    <View style={{backgroundColor: '#161616', flex: 1}}>
      <Image
        source={{uri: route.params.image}}
        style={{flex: 1}}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({});
