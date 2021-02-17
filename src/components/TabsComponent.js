import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
const Tabs = createBottomTabNavigator();
import {connect} from 'react-redux';
import {SvgXml} from 'react-native-svg';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../constants/index';
import Home from '../screens/tabs/home/Home';
import Profile from '../screens/tabs/profile/Profile';
import Messages from '../screens/tabs/chat/Messages';

const HomeStack = createStackNavigator();
const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator headerMode="none">
      <HomeStack.Screen name="Home" component={Home} />
    </HomeStack.Navigator>
  );
};

const ProfileStack = createStackNavigator();
const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator headerMode="none">
      <ProfileStack.Screen name="Profile" component={Profile} />
    </ProfileStack.Navigator>
  );
};

const MessagesStack = createStackNavigator();
const MessagesStackScreen = () => {
  return (
    <MessagesStack.Navigator headerMode="none">
      <MessagesStack.Screen name="Messages" component={Messages} />
    </MessagesStack.Navigator>
  );
};

const TabsScreen = (props) => (
  <Tabs.Navigator
    screenOptions={({route}) => ({
      tabBarIcon: ({focused, color, size}) => {
        let iconName;
        if (route.name === 'Home') {
          return (iconName = focused ? (
            <View>
              <Ionicons size={28} color={'#00A7FF'} name={'home'} />
            </View>
          ) : (
            <Ionicons size={28} color={'#c4c4c4'} name={'home-outline'} />
          ));
        } else if (route.name === 'Chat') {
          return (iconName = focused ? (
            <Ionicons size={28} color={'#00A7FF'} name={'chatbubbles'} />
          ) : (
            <View>
              <Ionicons
                size={28}
                color={'#c4c4c4'}
                name={'chatbubbles-outline'}
              />
            </View>
          ));
        } else if (route.name === 'Profile') {
          return (iconName = focused ? (
            <Ionicons size={28} color={'#00A7FF'} name={'person'} />
          ) : (
            <View>
              <Ionicons size={28} color={'#c4c4c4'} name={'person-outline'} />
            </View>
          ));
        }
      },
    })}
    tabBarOptions={{
      activeTintColor: colors.primary,
      inactiveTintColor: '#4F4F4F',
      labelStyle: {
        fontSize: 9,
        fontFamily: 'Poppins-Medium',
      },
      style: {
        height: Platform.OS === 'ios' ? 90 : 70,
        backgroundColor: colors.bgColor,
      },
    }}>
    <Tabs.Screen name="Home" component={HomeStackScreen} />
    <Tabs.Screen name="Chat" component={MessagesStackScreen} />
    <Tabs.Screen name="Profile" component={ProfileStackScreen} />
  </Tabs.Navigator>
);
const styles = StyleSheet.create({
  tourMode: {
    borderWidth: 3,
    padding: 30,
    borderRadius: 50,
    borderColor: 'transparent',
    elevation: 5,
    backgroundColor: colors.bgColor,
    shadowColor: 'grey',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 9,
    shadowRadius: 2,
    marginVertical: 10,
  },
});

export default TabsScreen;

// const mapStateToProps = (state) => {
//   return {
//     counter: state.tourReducer.tourCounter,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     setCount: (val) => dispatch(tourCount(val)),
//     setVideoStat: (val) => dispatch(loadVideos(val)),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(TabsScreen);
