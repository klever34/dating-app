import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors, baseUrl} from '../../../constants/index';
import {SamplePictures} from '../../../constants/Pics';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Header from '../../../components/Header';
import Swiper from 'react-native-deck-swiper';
import { Card } from '../../../components/Card'

const Home = (props) => {
  const iconSelected = (icon) => {
    props.navigation.push(icon);
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.bgColor}}>
      {/* <Header
        title={'Home'}
        selectedIcon={iconSelected}
        navigation={props.navigation}
      /> */}
      <View style={styles.container}>
        <Swiper
          cards={SamplePictures}
          renderCard={Card}
          infinite
          backgroundColor="white"
          cardHorizontalMargin={0}
          stackSize={2}
          onSwiped={() => console.log("swiped")}
          onSwipedLeft={() => console.log("swiped")}
          onSwipedRight={() => console.log("swiped")}
          onSwipedTop={() => console.log("swiped")}
          onSwipedBottom={() => console.log("swiped")}
          overlayLabels={{
            bottom: {
              title: 'BLEAH',
              style: {
                label: {
                  backgroundColor: 'black',
                  borderColor: 'black',
                  color: 'white',
                  borderWidth: 1
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }
              }
            },
            left: {
              title: 'NOPE',
              style: {
                label: {
                  backgroundColor: 'black',
                  borderColor: 'black',
                  color: 'white',
                  borderWidth: 1
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-start',
                  marginTop: 30,
                  marginLeft: -30
                }
              }
            },
            right: {
              title: 'LIKE',
              style: {
                label: {
                  backgroundColor: 'black',
                  borderColor: 'black',
                  color: 'white',
                  borderWidth: 1
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  marginTop: 30,
                  marginLeft: 30
                }
              }
            },
            top: {
              title: 'SUPER LIKE',
              style: {
                label: {
                  backgroundColor: 'black',
                  borderColor: 'black',
                  color: 'white',
                  borderWidth: 1
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }
              }
            }
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  bigLogin: {
    color: '#006499',
    fontFamily: 'Poppins-Bold',
    fontSize: 26,
  },
  smallLogin: {
    color: '#809EAC',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  buttonContainer: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 13,
    width: '100%',
    marginVertical: 20,
    flexDirection: 'row',
    borderRadius: 6,
  },
  forgotPwd: {
    fontFamily: 'Poppins-Regular',
    color: colors.txtInputBorderBtm,
    // marginTop: 30
    fontSize: 12,
  },
  createAct: {
    fontFamily: 'Poppins-Regular',
    color: colors.primary,
    paddingHorizontal: 3,
  },
  txtInput: {
    fontFamily: 'Poppins-Regular',
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
    // marginVertical: Platform.OS === 'ios' ? 15 : 2,
    // marginLeft: 10,
  },
  btmContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  borderStyle: {
    borderBottomWidth: 0.5,
    borderBottomColor: colors.secondary,
    // borderRadius: 6,
    marginVertical: 3,
  },
  textStyle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#7FB0CC',
  },
});

export default Home;
