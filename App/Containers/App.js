import '../Config'
import DebugConfig from '../Config/DebugConfig'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import RootContainer from './RootContainer'
import createStore from '../Redux'
import OneSignal from 'react-native-onesignal'; // Import package from node modules
import codePush from "react-native-code-push";

// create our store
const store = createStore();

let codePushOptions = {
    checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
    installMode: codePush.InstallMode.ON_NEXT_RESUME
};

/**
 * Provides an entry point into our application.  Both index.ios.js and index.android.js
 * call this component first.
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 * We separate like this to play nice with React Native's hot reloading.
 */
class App extends Component {

  componentWillMount() {
    OneSignal.addEventListener('received', this.onReceived);
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
  }

  componentDidMount(){
    codePush.sync();
  }

  onReceived(notification) {
    // console.log("Notification received: ", notification);
  }

  onOpened(openResult) {
    // console.log('Message: ', openResult.notification.payload.body);
    // console.log('Data: ', openResult.notification.payload.additionalData);
    // console.log('isActive: ', openResult.notification.isAppInFocus);
    // console.log('openResult: ', openResult);
  }

  onRegistered(notifData) {
    // console.log("Device had been registered for push notifications!", notifData);
  }

  onIds(device) {
    // console.log('Device info: ', device);
  }

  render () {
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    )
  }
}

App = codePush(codePushOptions)(App);

// allow reactotron overlay for fast design in dev mode
export default DebugConfig.useReactotron
  ? console.tron.overlay(App)
  : App
