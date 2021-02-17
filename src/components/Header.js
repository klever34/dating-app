import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Platform, Modal} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../constants/index';
import {connect} from 'react-redux';
import {TextInput} from 'react-native-paper';

const Header = (props) => {
  const [showModal, setModal] = React.useState(false);
  useEffect(() => {}, []);

  const iconPressed = (icon) => {
    props.navigation.navigate(icon);
  }

  return (
    <View style={styles.headerContainer}>
      <Ionicons
        name={'ios-time-sharp'}
        color={colors.primary}
        style={{fontSize: 20, paddingHorizontal: 5, opacity: 0}}
        onPress={() =>
          // iconPressed('History')
          null
        }
      />
      <Text style={styles.headerTitle}>{props.title}</Text>
      <Ionicons
        name={'md-notifications'}
        color={colors.primary}
        style={{fontSize: 20, paddingHorizontal: 5}}
        onPress={() =>
          iconPressed('Notifications')
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    backgroundColor: colors.textColor,
    paddingTop: 40,

    elevation: 4,
    shadowColor: colors.primary,
    shadowOffset: {width: 1, height: 1.5},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    borderColor: colors.textColor,
    borderWidth: 1,

  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: colors.primary,
  },
  rightGroup: {
    flexDirection: 'row',
    paddingTop: 15,
  },
  tourMode: {
    borderWidth: 3,
    // padding: Platform.OS === 'ios' ? 0 : 10,
    borderRadius: 50,
    borderColor: 'transparent',
    elevation: 5,
    backgroundColor: colors.bgColor,
    shadowColor: 'grey',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 9,
    shadowRadius: 2,
    // marginVertical: 10,
  },
});

export default Header;

// const mapStateToProps = (state) => {
//   return {
//     modalVal: state.logOutReducer.logOutModal,
//     tourModalValue: state.tourReducer.tourModal,
//     counter: state.tourReducer.tourCounter,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     popModal: (val) => dispatch(showLogoutModal(val)),
//     popTourModal: (val) => dispatch(showTourModal(val)),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Header);
