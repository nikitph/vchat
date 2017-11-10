import { StackNavigator } from 'react-navigation'
import SignUpDetailsScreen from '../Containers/SignUpDetailsScreen'
import LoginScreen from '../Containers/LoginScreen'
import SignUpScreen from '../Containers/SignUpScreen'
import WalkThroughScreen from '../Containers/WalkThroughScreen'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  SignUpDetailsScreen: {screen: SignUpDetailsScreen},
  LoginScreen: {screen: LoginScreen},
  SignUpScreen: {screen: SignUpScreen},
  WalkThroughScreen: {screen: WalkThroughScreen},
  LaunchScreen: { screen: LaunchScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'WalkThroughScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
