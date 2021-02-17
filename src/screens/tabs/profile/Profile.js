import React, {Component} from 'react';
import {View, StyleSheet, Image, ScrollView} from 'react-native';
import {colors, baseUrl} from '../../../constants/index';
import {AuthContext} from '../../../../context';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Header from '../../../components/Header';
import {Divider, Icon, Text} from 'react-native-elements';
import Layout from '../../../constants/Layout';
import {SamplePictures} from '../../../constants/Pics';
import {randomNumber} from '../../../constants/randomNumber';

const {pic, title} = SamplePictures[randomNumber(1, SamplePictures.length)];

const Social = ({name}) => (
  <Icon
    name={name}
    type="font-awesome"
    containerStyle={styles.iconContainer}
    size={32}
  />
);

const Profile = (props) => {
  const iconSelected = (icon) => {
    props.navigation.push(icon);
  };
  return (
    <ScrollView style={{flex: 1, backgroundColor: colors.bgColor}}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={pic} style={styles.image} />
        </View>
        <Text h4 style={styles.name}>
          {title}
        </Text>
        <Text style={styles.desc}>Fashion Designer at Amelia & Co.</Text>
        <Divider style={styles.divider} />
        <Text style={styles.desc}>
          I love to travel. I have a cat named pickles. If he likes you, I
          probably will too.
        </Text>
        <Divider style={styles.divider} />
        <Text style={styles.desc}>Find me on Social here</Text>
        <View style={styles.socialLinks}>
          <Social name="snapchat" />
          <Social name="instagram" />
          <Social name="facebook-square" />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 30,
  },
  imageContainer: {
    margin: 20,
  },
  image: {
    width: Layout.window.width - 60, // device width - some margin
    height: Layout.window.height / 2 - 60, // device height / 2 - some margin
    borderRadius: 20,
  },
  name: {
    color: '#5E5E5E',
    alignSelf: 'flex-start',
    marginLeft: 30,
    fontFamily: 'Poppins-Regular',
  },
  desc: {
    color: '#5E5E5E',
    alignSelf: 'flex-start',
    marginTop: 5,
    marginHorizontal: 30,
    fontSize: 14,
    fontFamily: 'Poppins-Light',
  },
  divider: {
    backgroundColor: '#C0C0C0',
    width: Layout.window.width - 60,
    margin: 20,
  },
  socialLinks: {
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'row',
    width: Layout.window.width,
    marginLeft: 40,
  },
  iconContainer: {
    paddingHorizontal: 8,
    paddingVertical: 15,
  },
});

export default Profile;
