import React, { Component } from 'react'
import { ScrollView, KeyboardAvoidingView, Image, View, Text, TextInput, PropTypes } from 'react-native'
import { connect } from 'react-redux'
import { Images, Metrics } from '../Themes'
import Icon from 'react-native-vector-icons/Ionicons'
import * as Animatable from 'react-native-animatable'
import DropdownAlert from 'react-native-dropdownalert'
import Button from 'react-native-micro-animated-button';

// Add Actions - replace 'Your' with whatever your reducer is called :)
import ResetPasswordActions from '../Redux/ResetPasswordRedux'
// Styles
import styles from './Styles/ResetPasswordScreenStyle'

const colors = {
  blue: '#4285f4',
  gray: '#d8d8d8',
  grayDark: '#444',
  green: '#0f9d58',
  red: '#A01829',
  white: 'white'
};

class ResetPasswordScreen extends Component {

  static navigationOptions = {
    header: null,
  };

  props: ResetPasswordScreenProps;

  constructor (props: ResetPasswordScreenProps) {
    super(props);
    this.showAlert = this.showAlert.bind(this);

    this.state = {
      email: '',
      buttonstate: props.fetching ? "fetching" : "ready",
    }
  }

  handlePressResetPassword = (state) => {
    const {email} = state;
    this.props.attemptResetPassword(email, this.showAlert);
  };

  showAlert (type, title, message) {
    this.dropdown.alertWithType(type, title, message);
  };

  render () {
    return (
      <KeyboardAvoidingView behavior='padding'
                            style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
        <Image source={Images.lc} style={{flex: 1}}>
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'flex-end',
            backgroundColor: 'rgba(256,256,256,0.97)'
          }}>
            <Animatable.Image animation='fadeIn' source={Images.vpchat} style={[styles.topLogo]}/>
          </View>
        </Image>
        <View
          style={{flex: 0.4, backgroundColor: 'rgba(0,0,0,0.0)', margin: 20, borderRadius: 10, flexDirection: 'row'}}>
          <View style={{flexDirection: 'column', flex: 1}}>
            <View style={{flex: 0.1}}>
              <Text style={[styles.header]}></Text>
            </View>
            <View style={{flex: 0.7, flexDirection: 'row'}}>
              <View style={{flex: 0.1, justifyContent: 'center', alignItems: 'center'}}>
                <Icon name="ios-arrow-back" size={50} color="#900"
                      onPress={() => props.navigation.navigate('LoginScreen')}
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
                          placeholder={'Enter Reset Email Address'}
                          onChangeText={(email) => this.setState({email})}
                        />
                      </View>

                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>


        <View
          style={{flexDirection: 'row', alignItems: 'flex-start', backgroundColor: 'transparent'}}>

          <View style={{marginTop: 15, backgroundColor: 'transparent'}}>
            <Button
              bounce
              foregroundColor={colors.white}
              backgroundColor={colors.red}
              label="Submit"
              onPress={() => {
                this.handlePressResetPassword(this.state);
                fetch ? this.b1.load() : this.b1.success();
              }
              }
              ref={ref => (this.b1 = ref)}
              successIconName="check"
            /></View>


        </View>
        <DropdownAlert
          ref={(ref) => this.dropdown = ref}
          showCancel={true}
          translucent={true}
          errorColor={'rgba(250,50,50,1)'}
          closeInterval={6000}
          onClose={() => this.b1.reset()}
        />
      </KeyboardAvoidingView>

    )
  }
}

type ResetPasswordScreenProps = {
  dispatch: PropTypes.func,
  attemptResetPassword: PropTypes.func,
}

const mapStateToProps = (state) => {
  return {
    fetching: state.reset.fetching,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    attemptResetPassword: (email, alertfunc) => dispatch(ResetPasswordActions.resetPasswordRequest(email, alertfunc))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordScreen)
