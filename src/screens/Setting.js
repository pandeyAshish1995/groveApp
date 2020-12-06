import React, {useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
// import {useDispatch} from 'react-redux';
// import {actionForOnLoginScreenFocus} from '../redux/actions/loginActions';
// import {actionForSignOut} from '../redux/actions/SignoutActions';
// import * as Storage from '../utils/AsyncStorage';
// import {CommonActions} from '@react-navigation/native';
// import NewCustomHeader from '../components/NewCustomHeader';
import ActiveLogout from '../static/images/ActiveLogout.svg';
import InactiveLogout from '../static/images/InactiveLogout.svg';
import ActiveAccount from '../static/images/ActiveAccount.svg';
import InactiveAccount from '../static/images/InactiveAccount.svg';
import ActiveChangePassword from '../static/images/ActiveChangePassword.svg';
import InactiveChangePassword from '../static/images/InaciveChangePassword.svg';
import ActivePrivacyPolicy from '../static/images/ActivePrivacyPolicy.svg';
import InactivePrivacyPolicy from '../static/images/InactivePrivacyPolicy.svg';
import ActiveGroovePartner from '../static/images/ActiveGroovePartner.svg';
import InactiveGroovePartner from '../static/images/InactiveGroovePartner.svg';

export default function ContactList({navigation}) {
  // const [selectedTab, setSelectedTab] = useState('');
  // const dispatch = useDispatch();

  // const signOut = async () => {
  //   // navigation.closeDrawer();
  //   await Storage.remove('user');
  //   dispatch(actionForSignOut());
  //   dispatch(actionForOnLoginScreenFocus());
  //   // console.log('User removed now signing out!');
  //   navigation.dispatch(
  //     CommonActions.reset({
  //       index: 1,
  //       routes: [{name: 'InitialStack'}],
  //     }),
  //   );
  // };
  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: '#efeff5',
          paddingLeft: 16,
          paddingRight: 16,
        }}>
       
       
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  selectedTab: {
    fontFamily: 'NunitoSans-SemiBold',
    fontSize: 16,
    fontWeight: '600',
    fontStyle: 'normal',
    paddingLeft: 16,
  },
  wrapper: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 16,
    flexDirection: 'row',
  },
});
