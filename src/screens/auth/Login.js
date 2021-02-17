import React from 'react';
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

const Login = (props) => {
  const {signIn} = React.useContext(AuthContext);
  const [buttonStatus, setButtonStatus] = React.useState(false);
  const [showIndicator, setShowIndicator] = React.useState(false);
  const [userEmail, setEmail] = React.useState(null);
  const [userPassword, setPassword] = React.useState(null);
  const [pwdStatus, setPwdStatus] = React.useState(true);
  const [errorMsg, setErrorMsg] = React.useState(false);
  const [msg, setMsg] = React.useState(null);

  const authUser = async () => {
    await AsyncStorage.setItem('@user_token', 'result.data.tokenresult.data.tokenresult.data.token');
    signIn();
    return;
    if (!userEmail || !userPassword) return;
    setShowIndicator(true);
    setButtonStatus(true);

    var userData = {
      username: userEmail,
      password: userPassword,
    };

    try {
      axios.defaults.headers.post['Content-Type'] =
        'application/x-www-form-urlencoded';
      axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
      axios.defaults.headers.post['Accept'] = 'application/json';
      const result = await axios.post(`${baseUrl}oauth/login`, userData);
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${result.data.token}`;
      const me = await axios.get(`${baseUrl}me`);
      await AsyncStorage.setItem('@user_token', result.data.token);
      await AsyncStorage.setItem('@user_name', me.data.user.name);
      await AsyncStorage.setItem('@user_email', me.data.user.email);
      await AsyncStorage.setItem('@user_id', `${me.data.user.id}`);
      await AsyncStorage.setItem('@user_phone', `${me.data.user.phone}`);
      await AsyncStorage.setItem('@user_gender', `${me.data.user.gender}`);
      signIn();
      setShowIndicator(false);
      setButtonStatus(false);
    } catch (error) {
      console.log(error.response.data.errors[0].message);
      setErrorMsg(true);
      setMsg(error.response.data.errors[0].message);
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
          <View style={{alignItems: 'center', marginBottom: 30}}>
            {/* <Image
              source={require('../../assets/images/icon.png')}
              style={{height: 100, resizeMode: 'contain'}}
            /> */}
          </View>
          <View style={{marginVertical: 20}}>
            <Text style={styles.bigLogin}>Welcome</Text>
            <Text style={styles.smallLogin}>To get started, Log In below</Text>
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
          <View style={{marginVertical: 5}}>
            <Text style={styles.textStyle}>Password</Text>
            <View style={styles.borderStyle}>
              <TextInput
                placeholder="Enter your password here"
                style={[styles.txtInput, {flex: 1}]}
                secureTextEntry={pwdStatus}
                onChangeText={(text) => setPassword(text)}
                placeholderTextColor={'#828282'}
              />
            </View>
          </View>
          <Text
            style={[styles.forgotPwd, {marginTop: 10}]}
            onPress={() => props.navigation.push('ForgotPassword')}>
            Forgot Password?
          </Text>

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
                Login
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
    marginTop: 50
  },
  borderStyle: {
    borderBottomWidth: 0.5,
    borderBottomColor: colors.secondary,
    // borderRadius: 6,
    marginVertical: 10,
  },
  textStyle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#7FB0CC',
  },
});

export default Login;
