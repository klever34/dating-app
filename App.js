import React from 'react';
import {StyleSheet, StatusBar, Platform} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthContext} from './context';
import Login from './src/screens/auth/Login';
import Register from './src/screens/auth/Register';
import ForgotPassword from './src/screens/auth/ForgotPassword';
import PasswordReset from './src/screens/auth/PasswordReset';
import AnimatedSplash from 'react-native-animated-splash-screen';
import TabsComponent from './src/components/TabsComponent';
// import {fcmService} from './src/alerts/FCMService';
// import {localNotificationService} from './src/alerts/LocalNotificationService';

const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator headerMode="none">
    <AuthStack.Screen
      name="Login"
      component={Login}
      options={{title: 'Sign In'}}
    />
    <AuthStack.Screen name="Register" component={Register} />
    <AuthStack.Screen name="PasswordReset" component={PasswordReset} />
    <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />
  </AuthStack.Navigator>
);

const TabStack = createStackNavigator();
const TabStackScreen = () => (
  <TabStack.Navigator headerMode="none">
    <TabStack.Screen name="Tabs" component={TabsComponent} />
  </TabStack.Navigator>
);

const RootStack = createStackNavigator();
const RootStackScreen = ({userToken}) => (
  <RootStack.Navigator headerMode="none">
    {userToken !== null ? (
      <RootStack.Screen
        name="App"
        component={TabStackScreen}
        options={{
          animationEnabled: false,
        }}
      />
    ) : (
      <RootStack.Screen
        name="Auth"
        component={AuthStackScreen}
        options={{
          animationEnabled: false,
        }}
      />
    )}
  </RootStack.Navigator>
);

const App = () => {
  const [userToken, setUserToken] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [splash, setSplash] = React.useState(false);

  uuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      },
    );
  };

  React.useEffect(() => {
    // fcmService.registerAppWithFCM();
    // fcmService.register(onRegister, onNotification, onOpenNotification);
    // localNotificationService.configure(onOpenNotification);
    // async function onRegister(token) {
    //   console.log('[App] onRegister: ', token);
    //   await AsyncStorage.setItem(`@firebase_token`, token);
    // }
    // function onNotification(notify) {
    //   console.log('Notification here');
    //   console.log('[App] onNotification: ', notify);
    //   const options = {
    //     soundName: 'default',
    //     playSound: true,
    //   };
    //   localNotificationService.showNotification(
    //     new Date().getMilliseconds(),
    //     notify.title,
    //     notify.body,
    //     notify,
    //     options,
    //   );
    // }
    // function onOpenNotification(notify) {
    //   console.log('Notification from App Screen');
    //   // console.log('[App] onOpenNotification: ', notify.data.type ? notify.data.type : 'no type');
    //   // RootNavigation.navigate('Chat', {userName: 'Lucy'});
    // }
    // return () => {
    //   fcmService.unRegister();
    //   localNotificationService.unregister();
    // };
  }, []);

  const authContext = React.useMemo(() => {
    return {
      signIn: async () => {
        try {
          const value = await AsyncStorage.getItem('@user_token');
          if (value !== null) {
            setUserToken(value);
          } else {
            setUserToken(null);
          }
        } catch (e) {}
      },
      signUp: async () => {
        try {
          const value = await AsyncStorage.getItem('@user_token');
          if (value !== null) {
            setUserToken(value);
          } else {
            setUserToken(null);
          }
        } catch (e) {}
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem('@user_token');
          setUserToken(null);
        } catch (e) {}
      },
    };
  }, []);

  React.useEffect(() => {
    async function getToken() {
      setIsLoading(true);
      try {
        const value = await AsyncStorage.getItem('@user_token');
        if (value !== null) {
          setIsLoading(false);
          setUserToken(value);
        } else {
          setIsLoading(false);
          setUserToken(null);
        }
      } catch (e) {}
    }
    getToken();
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      setSplash(true);
    }, 3000);
  }, []);

  return (
    <AnimatedSplash
      translucent={true}
      isLoaded={splash}
      logoImage={require('./src/assets/images/logo.png')}
      backgroundColor={'#FFF7EF'}
      logoHeight={300}
      logoWidth={300}>
      <>
        <StatusBar barStyle="dark-content" />
        <AuthContext.Provider value={authContext}>
          <NavigationContainer>
            <RootStackScreen userToken={userToken} />
          </NavigationContainer>
        </AuthContext.Provider>
      </>
    </AnimatedSplash>
  );
};

const styles = StyleSheet.create({});

export default App;
