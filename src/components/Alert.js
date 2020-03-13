import {AlertIOS, ToastAndroid, Platform} from 'react-native';

export default (msj, body) => {
  if (Platform.OS === 'ios') {
    AlertIOS.alert(msj, body);
    return;
  }
  ToastAndroid.show(msj, ToastAndroid.SHORT);
};
