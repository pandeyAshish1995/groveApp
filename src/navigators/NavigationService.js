import {CommonActions} from '@react-navigation/native';

let navigator;

function setTopLevelNavigator(navigatorRef) {
  navigator = navigatorRef;
}

function navigate(routeName, params) {
  navigator.dispatch(
    CommonActions.navigate({
      routeName,
      params,
    }),
  );
}

function reset(routeName, params = {}) {
  // console.log('navigator', routeName, navigator);
  navigator.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{name: routeName, params}],
    }),
  );
}

export default {
  navigate,
  setTopLevelNavigator,
  reset,
};
