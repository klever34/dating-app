import React, {useState, useCallback, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  Image,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors, baseUrl} from '../../../constants/index';
import {GiftedChat, Bubble, Send, Actions} from 'react-native-gifted-chat';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const ChatScreen = (props) => {
  const [messages, setMessages] = useState([]);

  const sendMessage = async (msg) => {};

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );
    sendMessage(messages[0].text);
  }, []);

  const renderLoading = () => {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#006194" />
      </View>
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#FFFFFF',
            borderRadius: 6,
          },
          right: {
            backgroundColor: '#1C6887',
            borderRadius: 6,
          },
        }}
        timeTextStyle={{
          left: {
            color: '#001B29',
            opacity: 0.5,
            fontFamily: 'Poppins-Regular',
          },
          right: {
            color: '#fff',
            opacity: 0.5,
            fontFamily: 'Poppins-Regular',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
            fontFamily: 'Poppins-Regular',
            fontSize: 10,
            fontSize: 14,
          },
          left: {
            color: '#1D054B',
            fontFamily: 'Poppins-Regular',
            fontSize: 10,
            fontSize: 14,
          },
        }}
      />
    );
  };

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View style={styles.sendingContainer}>
          <MaterialCommunityIcons
            name={'send-circle'}
            size={32}
            color={'#006194'}
            style={{paddingHorizontal: 10, paddingBottom: 7}}
          />
        </View>
      </Send>
    );
  };

  const renderActions = (props) => {
    return (
      <Actions
        {...props}
        containerStyle={{
          width: 44,
          height: 44,
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: 4,
          marginRight: 4,
          marginBottom: 4,
        }}
        icon={() => (
          <View
            style={{
              backgroundColor: '#EBF8FF',
              //   padding: 5,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 20,
              width: 40,
              height: 40,
            }}>
            <Ionicons
              name={'attach'}
              size={24}
              color={'#006194'}
              style={{paddingHorizontal: 10}}
            />
          </View>
        )}
      />
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#F5FBFF',
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: Platform.OS === 'ios' ? 50 : 30,
          backgroundColor: '#006194',
          paddingBottom: Platform.OS === 'ios' ? 10 : 10,
        }}>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 15,
          }}>
          <AntDesign
            name={'left'}
            color={colors.textColor}
            style={{fontSize: 16, paddingRight: 10}}
          />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {/* <Image
              source={require('../assets/images/icon.png')}
              style={{height: 35, width: 35, borderRadius: 35}}
            /> */}
            <View
              style={{
                height: 40,
                width: 40,
                borderRadius: 40,
                backgroundColor: '#000000',
              }}></View>
            <Text
              style={{
                fontFamily: 'Poppins-Bold',
                color: colors.textColor,
                paddingLeft: 15,
                fontSize: 16,
              }}>
              UserName
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{flex: 1}}>
        <GiftedChat
          messages={messages}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: 1,
          }}
          bottomOffset={78.5}
          renderActions={renderActions}
          renderBubble={renderBubble}
          placeholder="Send a message"
          alwaysShowSend
          renderSend={renderSend}
          scrollToBottom
          renderUsernameOnMessage={true}
          renderLoading={renderLoading}
          onPressActionButton={() => launchImgPicker()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    elevation: 1,
    backgroundColor: colors.bgColor,
    shadowColor: colors.bgColor,
    shadowOffset: {width: 0, height: 1.5},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    margin: 5,
    padding: 20,
    borderColor: colors.textColor,
    borderWidth: 0.3,
    borderRadius: 5,
    width: 280,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallText: {
    color: '#7B9CAD',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    lineHeight: 21,
    marginVertical: 5,
  },
  bigText: {
    color: '#233539',
    fontFamily: 'Poppins-Bold',
    fontSize: 26,
    lineHeight: 39,
    marginVertical: 7,
  },
  btn: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 6,
    marginVertical: 10,
    backgroundColor: '#EBF8FF',
  },
  inActiveTabText: {
    fontSize: 10,
    fontFamily: 'Poppins-Regular',
    color: colors.todoHeader,
  },
  inActiveTab: {
    paddingVertical: 10,
    flex: 1,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#00A7FF',
    borderRadius: 6,
    paddingVertical: 10,
    flex: 1,
    alignItems: 'center',
  },
  activeTabText: {
    fontSize: 10,
    fontFamily: 'Poppins-Bold',
    color: colors.textColor,
  },
});

export default ChatScreen;
