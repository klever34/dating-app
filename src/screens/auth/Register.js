import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  ImageBackground,
  Image,
  Platform,
  Alert,
} from 'react-native';
import {colors, baseUrl} from '../../constants/index';
import {AuthContext} from '../../../context';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Register = (props) => {
  const {signIn} = React.useContext(AuthContext);
  const [buttonStatus, setButtonStatus] = React.useState(false);
  const [showIndicator, setShowIndicator] = React.useState(false);
  const [name, setName] = React.useState(null);
  const [userEmail, setEmail] = React.useState(null);
  const [userPassword, setPassword] = React.useState(null);
  const [userCPassword, setCPassword] = React.useState(null);
  const [pwdStatus, setPwdStatus] = React.useState(true);
  const [errorMsg, setErrorMsg] = React.useState(false);
  const [msg, setMsg] = React.useState(null);

  const authUser = async () => {
    if (!userEmail || !userPassword) return;
    setShowIndicator(true);
    setButtonStatus(true);
    var userData = {
      email: userEmail,
      password: userPassword,
    };

    try {
      axios.defaults.headers.common['Content-Type'] = 'application/json';
      const result = await axios.post(`${baseUrl}auth/learner/login`, userData);
      await AsyncStorage.setItem('@user_token', result.data.access_token);
      await AsyncStorage.setItem(
        '@user_name',
        `${result.data.user.first_name} ${result.data.user.last_name}`,
      );
      await AsyncStorage.setItem('@user_email', result.data.user.email);
      await AsyncStorage.setItem('@user_id', result.data.user.id);
      await AsyncStorage.setItem(
        '@user_phone',
        `${result.data.user.phone_number}`,
      );
      await AsyncStorage.setItem(
        '@user_verified',
        `${result.data.user.verified}`,
      );
      await AsyncStorage.setItem('@user_role', result.data.user.role);
      signIn();
      setShowIndicator(false);
      setButtonStatus(false);
    } catch (error) {
      console.log(error.response.data);
      setErrorMsg(true);
      setMsg(error.response.data.errors[0].title);
      setShowIndicator(false);
      setButtonStatus(false);
    }
  };

  const selectProfile = async () => {
    if (!userEmail) return;
    if (userCPassword !== userPassword || !userCPassword || !userPassword) {
      Alert.alert('Passwords do no match');
      return;
    }
    await AsyncStorage.setItem('reg-email', userEmail);
    await AsyncStorage.setItem('reg-password', userPassword);
    props.navigation.push('SelectProfile');
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
            marginVertical: Platform.OS == 'ios' ? 120 : 30,
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
            <Text style={styles.smallLogin}>To get started, Sign Up below</Text>
          </View>
          <View style={{marginVertical: 5}}>
            <Text style={styles.textStyle}>E-Mail</Text>
            <View style={styles.borderStyle}>
              <TextInput
                placeholder="Enter your e-mail address"
                style={styles.txtInput}
                onChangeText={(text) => setEmail(text)}
              />
            </View>
          </View>
          <View style={{marginVertical: 5}}>
            <Text style={styles.textStyle}>Password</Text>
            <View style={styles.borderStyle}>
              <TextInput
                placeholder="Enter Password"
                style={[styles.txtInput, {flex: 1}]}
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
              />
            </View>
          </View>
          <View style={{marginVertical: 5}}>
            <Text style={styles.textStyle}>Confirm Password</Text>
            <View style={styles.borderStyle}>
              <TextInput
                placeholder="Confirm Password"
                style={[styles.txtInput, {flex: 1}]}
                secureTextEntry={true}
                onChangeText={(text) => setCPassword(text)}
              />
            </View>
          </View>
          {errorMsg && (
            <Text style={[styles.forgotPwd, {color: 'red'}]}>{msg}</Text>
          )}
          <View style={styles.btmContainer}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => selectProfile()}>
              <Text
                style={[
                  styles.smallLogin,
                  {color: colors.textColor, fontFamily: 'Poppins-Bold'},
                ]}>
                Sign Up
              </Text>
            </TouchableOpacity>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View style={{flexDirection: 'row', marginVertical: 20}}>
                <Text style={[styles.forgotPwd, {fontSize: 14}]}>
                  Have an account?
                </Text>
                <Text
                  style={styles.createAct}
                  onPress={() => props.navigation.goBack()}>
                  Log In?
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
    marginTop: 30
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

export default Register;
