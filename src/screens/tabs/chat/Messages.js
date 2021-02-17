import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {colors, baseUrl} from '../../../constants/index';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Header from '../../../components/Header';
import moment from 'moment';

const Messages = (props) => {
  const [chatMessages, setChatMessages] = useState([
    {
      name: 'Lara Jean Covey',
      updated_at: '2020-03-09 09:00:00',
      message: 'Holla Amigo',
      unreadCount: 20,
    },
  ]);
  const [showView, setView] = useState(false);

  const iconSelected = (icon) => {
    props.navigation.push(icon);
  };

  const dateToFromNowDaily = (myDate) => {
    var fromNow = moment(myDate).fromNow();
    return moment(myDate).calendar(null, {
      lastWeek: 'YYYY-MM-DD HH:mm:ss',
      lastDay: '[Yesterday]',
      sameDay: '[Today]',
      sameElse: function () {
        return 'YYYY-MM-DD HH:mm:ss';
      },
    });
  };

  const getStrippedText = (input) => {
    try {
      return input.replace(/(<([^>]+)>)/gi, '');
    } catch (error) {
      return '';
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.bgColor}}>
      <Header
        title={'Messages'}
        selectedIcon={iconSelected}
        navigation={props.navigation}
      />
      {chatMessages.map((item, index) => (
        <TouchableOpacity
          style={styles.card}
          key={index}
          onPress={() =>
            props.navigation.push('ChatScreen', {
              
            })
          }>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={[
                styles.bigText,
                {fontSize: 18, fontFamily: 'Poppins-Medium'},
              ]}>
              {item.name}
            </Text>
            <Text style={styles.smallText}>
              {dateToFromNowDaily(item.updated_at)}
            </Text>
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <Text style={styles.smallText}>
              {getStrippedText(item.message)}
            </Text>
            {item.unreadCount > 0 && (
              <View
                style={{
                  backgroundColor: '#2ba2d3',
                  height: 20,
                  width: 20,
                  borderRadius: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={[
                    styles.smallText,
                    {
                      color: '#ffffff',
                      fontSize: 10,
                      fontFamily: 'Poppins-Medium',
                      paddingBottom: Platform.OS == 'ios' ? 20 : 0,
                    },
                  ]}>
                  {item.unreadCount}
                </Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
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
  smallText: {
    color: '#7B9CAD',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    lineHeight: 21,
    marginVertical: 5,
  },
  card: {
    elevation: 1,
    backgroundColor: colors.bgColor,
    shadowColor: colors.primary,
    shadowOffset: {width: 0, height: 1.5},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    margin: 5,
    padding: 20,
    borderColor: colors.textColor,
    borderWidth: 0.3,
    borderRadius: 5,
    width: '100%',
  },
});

export default Messages;
