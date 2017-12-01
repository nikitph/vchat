import React, { Component } from 'react'
import {
  ScrollView, KeyboardAvoidingView, Image, View, Text, TextInput, PropTypes, Linking,
  TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import { Images, Metrics } from '../Themes'
import Icon from 'react-native-vector-icons/Ionicons'
import * as Animatable from 'react-native-animatable'
import DropdownAlert from 'react-native-dropdownalert'
import ActivityIndicator from 'react-native-activity-indicator'; // optional
import Button from 'react-native-micro-animated-button';
// Add Actions - replace 'Your' with whatever your reducer is called :)
import SignUpActions from '../Redux/SignUpRedux'
// Styles
import styles from './Styles/SignUpScreenStyle'

const colors = {
  blue: '#4285f4',
  gray: '#d8d8d8',
  grayDark: '#444',
  green: '#0f9d58',
  red: '#A01829',
  white: 'white'
};

class SignUpScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  props: SignUpScreenProps;

  constructor (props: SignUpScreenProps) {
    super(props);
    this.showAlert = this.showAlert.bind(this);

    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      passwordMismatch: false,
      invalidEmail: false,
      invalidPassword: false,
      incorrectPassword: false,
      noMatch: false,
      buttonstate: props.fetching ? "fetching" : "ready",
    }
  }

  handlePressSignUp = (state) => {
    const {email, password, confirmPassword} = state;
    if (password == confirmPassword) {
      this.setState({passwordMismatch: false});
      this.props.attemptSignUp(email, password, this.showAlert, this.props.navigation);
    }
    else {
      this.setState({passwordMismatch: true})
    }
  };

  showAlert (type, title, message) {
    this.dropdown.alertWithType(type, title, message);
  };

  render () {
    const props = this.props;
    let fetch = props.fetching;

    return (
      <KeyboardAvoidingView behavior='padding'
                            style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'flex-end',
            backgroundColor: 'rgba(256,256,256,0.97)'
          }}>
            <Animatable.Image animation='fadeIn' source={Images.vpchat} style={[styles.topLogo]}/>
          </View>
        <View
          style={{flex: 0.4, backgroundColor: 'rgba(0,0,0,0.0)', margin: 20, borderRadius: 10, flexDirection: 'row'}}>
          <View style={{flexDirection: 'column', flex: 1}}>
            <View style={{flex: 0.1}}>
              <Text style={[styles.header]}></Text>
            </View>
            <View style={{flex: 0.7, flexDirection: 'row'}}>
              <View style={{flex: 0.1, justifyContent: 'center', alignItems: 'center'}}>
                <Icon name="ios-arrow-back" size={50} color="#900"
                      onPress={() => props.navigation.navigate('WalkThroughScreen')}
                />
              </View>
              <View style={{flex: 0.9}}>
                <View style={styles.container}>
                  <View style={styles.form}>
                    <View style={styles.row}>
                      <View style={{flex: 0.1}}>
                        <Icon name="ios-mail" size={24} color="rgba(0,0,0,0.5)"
                        />
                      </View>
                      <View style={{flex: 0.9}}>

                        <TextInput
                          value={this.state.email}
                          keyboardType='default'
                          returnKeyType='next'
                          autoCapitalize='none'
                          autoCorrect={false}
                          underlineColorAndroid='transparent'
                          placeholder={'Email Address'}
                          onChangeText={(email) => this.setState({email})}
                          onSubmitEditing={() => this.refs.password.focus()}
                        />
                      </View>

                    </View>

                    <View style={styles.row}>
                      <View style={{flex: 0.1}}>
                        <Icon name="ios-key" size={24} color="rgba(0,0,0,0.5)"
                        />
                      </View>
                      <View style={{flex: 0.9}}>

                        <TextInput
                          ref='password'
                          value={this.state.password}
                          keyboardType='default'
                          returnKeyType='go'
                          autoCapitalize='none'
                          autoCorrect={false}
                          secureTextEntry
                          underlineColorAndroid='transparent'
                          placeholder={'Password'}
                          onChangeText={(password) => this.setState({password})}
                        />
                      </View>
                    </View>

                    <View style={styles.row}>
                      <View style={{flex: 0.1}}>
                        <Icon name="ios-key" size={24} color="rgba(0,0,0,0.5)"
                        />
                      </View>
                      <View style={{flex: 0.9}}>
                        <TextInput
                          ref='password'
                          value={this.state.confirmPassword}
                          keyboardType='default'
                          returnKeyType='go'
                          autoCapitalize='none'
                          autoCorrect={false}
                          secureTextEntry
                          underlineColorAndroid='transparent'
                          placeholder={'Confirm Password'}
                          onChangeText={(confirmPassword) => this.setState({confirmPassword})}
                        />
                      </View>
                    </View>
                  </View>

                  {this.state.passwordMismatch && this.showAlert('error', 'Error', 'The passwords do not match')}

                </View>
              </View>
            </View>
          </View>
        </View>


        <View
          style={{flexDirection: 'column', alignItems: 'center', backgroundColor: 'white', marginBottom:5}}>
          <Button
            bounce
            foregroundColor={colors.white}
            backgroundColor={colors.red}
            label="Sign Up"
            onPress={() => {
              this.handlePressSignUp(this.state);
              fetch ? this.b1.load() : this.b1.success();
            }
            }
            ref={ref => (this.b1 = ref)}
            successIconName="check"
          />
          <Text style={{fontSize:10, color:'rgba(0,0,0,0.5)'}}>By clicking Signup you agree to our</Text>
          <TouchableOpacity onPress={ ()=>{ Linking.openURL('https://github.com/nikitph/template-terms-of-service/blob/master/terms_template.md')}}><Text style={{fontSize:10, color:'rgba(0,0,0,1)'}}>terms of service</Text></TouchableOpacity>

        </View>
        <DropdownAlert
          ref={(ref) => this.dropdown = ref}
          showCancel={true}
          translucent={true}
          errorColor={'rgba(250,50,50,1)'}
          closeInterval={6000}
          onClose={() => this.b1.reset()}
          onCancel={() => this.b1.reset()}
        />
      </KeyboardAvoidingView>
    )
  }
}

type SignUpScreenProps = {
  dispatch: PropTypes.func,
  fetching: PropTypes.boolean,
  attemptSignUp: PropTypes.func,
  error: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    fetching: state.signup.fetching,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    attemptSignUp: (email, password, alertfunc, nav) => dispatch(SignUpActions.signUpRequest(email, password, alertfunc, nav))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen)
