import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Image,
  Platform,
} from 'react-native';
import {colors, baseUrl} from '../../constants/index';
import {AuthContext} from '../../../context';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ForgotPassword = (props) => {
  const {signIn} = React.useContext(AuthContext);
  const [buttonStatus, setButtonStatus] = React.useState(false);
  const [showIndicator, setShowIndicator] = React.useState(false);
  const [userEmail, setEmail] = React.useState(null);
  const [userPassword, setPassword] = React.useState(null);
  const [pwdStatus, setPwdStatus] = React.useState(true);
  const [errorMsg, setErrorMsg] = React.useState(false);
  const [msg, setMsg] = React.useState(null);

  const authUser = async () => {
    if (!userEmail) return;
    setShowIndicator(true);
    setButtonStatus(true);

    var userData = {
      type: 'email',
      email: userEmail,
      phone: null,
    };

    try {
      axios.defaults.headers.post['Content-Type'] =
        'application/x-www-form-urlencoded';
      axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
      axios.defaults.headers.post['Accept'] = 'application/json';
      const result = await axios.post(
        `${baseUrl}password/send-reset-code`,
        userData,
      );
      console.log(result.status);
      if(result.status == 200) {
          props.navigation.push('PasswordReset')
      }
      setShowIndicator(false);
      setButtonStatus(false);
    } catch (error) {
      console.log(error.response.data.errors[0].message);
      setErrorMsg(true);
      setMsg("Validation error, please check your email and try again.");
      setShowIndicator(false);
      setButtonStatus(false);
    }
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: '#ffffff',
      }}>
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
        style={{backgroundColor: '#ffffff', flex: 1}}>
        <View
          style={{
            padding: 30,
            flex: 1,
            justifyContent: 'center',
            marginVertical: Platform.OS == 'ios' ? 100 : 30,
            backgroundColor: '#ffffff',
            marginHorizontal: 10,
            borderRadius: 6,
          }}>
          <View style={{marginVertical: 20}}>
            <Text style={styles.bigLogin}>Password Reset</Text>
            <Text style={styles.smallLogin}>Please enter your valid email</Text>
          </View>
          <View style={{marginVertical: 5}}>
            <Text style={styles.textStyle}>E-Mail</Text>
            <View style={styles.borderStyle}>
              <TextInput
                placeholder="Enter your e-mail here"
                style={styles.txtInput}
                onChangeText={(text) => setEmail(text)}
                keyboardType={'email-address'}
                placeholderTextColor={'#828282'}
              />
            </View>
          </View>

          {errorMsg && (
            <Text style={[styles.forgotPwd, {color: 'red'}]}>{msg}</Text>
          )}

          <View style={styles.btmContainer}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => authUser()}>
              <Text
                style={[
                  styles.smallLogin,
                  {color: colors.textColor, fontFamily: 'Poppins-Bold'},
                ]}>
                Send Reset Code
              </Text>
              {showIndicator && (
                <ActivityIndicator
                  size="small"
                  color="#ffffff"
                  style={{paddingHorizontal: 5, marginTop: -3}}
                />
              )}
            </TouchableOpacity>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View style={{flexDirection: 'row', marginVertical: 20}}>
                <Text style={[styles.forgotPwd, {fontSize: 14}]}>
                  Do not have an account?
                </Text>
                <Text
                  style={styles.createAct}
                  onPress={() => props.navigation.push('Register')}>
                  Sign Up?
                </Text>
                <Text
                  style={[styles.createAct, {color: colors.txtInputBorderBtm}]}>
                  Instead
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
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
});

export default ForgotPassword;
