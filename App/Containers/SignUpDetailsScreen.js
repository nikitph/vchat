import React, { Component } from 'react'
import { ScrollView, KeyboardAvoidingView, Image, View, Text, TextInput, PropTypes } from 'react-native'
import { connect } from 'react-redux'
import { Images, Metrics } from '../Themes'
import Icon from 'react-native-vector-icons/Ionicons'
import * as Animatable from 'react-native-animatable'
import DropdownAlert from 'react-native-dropdownalert'
import Button from 'react-native-micro-animated-button';
// Add Actions - replace 'Your' with whatever your reducer is called :)
import SignUpDetailsActions from '../Redux/SignUpDetailsRedux'
// Styles
import styles from './Styles/SignUpDetailsScreenStyle'
import PhotoUpload from '../Components/PhotoUpload'
import { mapp } from '../Services/Firebase'
import OneSignal from 'react-native-onesignal'; // Import package from node modules

const db = mapp.database();
const usr = mapp.auth();

const colors = {
  blue: '#4285f4',
  gray: '#d8d8d8',
  grayDark: '#444',
  green: '#0f9d58',
  red: '#A01829',
  white: 'white'
};

class SignUpDetailsScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  props: SignUpDetailsScreenProps;

  constructor (props: SignUpDetailsScreenProps) {
    super(props);
    this.showAlert = this.showAlert.bind(this);

    this.state = {
      displayName: '',
      buttonstate: props.fetching ? "fetching" : "ready",
      modal: false,
      profileImage: '',
    }
  }

  handlePressSignUpDetails = (state) => {
    const {profileImage, displayName} = state;
    if (profileImage) {
      this.props.attemptSignUpDetails(profileImage, displayName, this.showAlert, this.props.navigation, this.props.uid);
    }
  };

  showAlert (type, title, message) {
    this.dropdown.alertWithType(type, title, message);
  };

  componentWillMount() {
    OneSignal.addEventListener('ids', this.onIds);
    OneSignal.configure();
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onIds(device) {
    db.ref(`users/${usr.currentUser.uid}/device`)
      .set({pushToken: device.pushToken || '', userId: device.userId});
  }

  componentDidMount () {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        db.ref(`users/${usr.currentUser.uid}/location`)
          .set({latitude: position.coords.latitude, longitude: position.coords.longitude});
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

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
                  <View style={{flex: 1}}>
                    <View style={styles.container}>
                      <View style={styles.form}>
                        <PhotoUpload
                          onPhotoSelect={avatar => {
                            if (avatar) {
                              this.setState({profileImage: avatar});
                              console.tron.log(this.state);
                            }
                          }}>
                          <Image
                            style={{
                              paddingVertical: 10,
                              width: 100,
                              height: 100,
                              borderRadius: 50
                            }}
                            resizeMode='cover'
                            source={{
                              uri: 'https://www.sparklabs.com/forum/styles/comboot/theme/images/default_avatar.jpg'
                            }}/>
                        </PhotoUpload>
                        <Text style={{alignSelf: 'center'}}>upload profile image</Text>
                        <View style={styles.row}>
                          <TextInput
                            value={this.state.displayName}
                            keyboardType='default'
                            returnKeyType='next'
                            autoCapitalize='none'
                            autoCorrect={false}
                            underlineColorAndroid='transparent'
                            placeholder={'Set Display Name'}
                            onChangeText={(displayName) => this.setState({displayName})}
                          />

                        </View>
                      </View>

                      {this.state.passwordMismatch && this.showAlert('error', 'Error', 'The passwords do not match')}

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
                this.handlePressSignUpDetails(this.state);
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

type SignUpDetailsScreenProps = {
  dispatch: PropTypes.func,
  fetching: PropTypes.boolean,
  attemptSignUpDetails: PropTypes.func,
  error: PropTypes.object,
  uid: PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    fetching: state.signupdetails.fetching,
    uid: state.signup.payload.uid
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    attemptSignUpDetails: (image, displayName, alertfunc, nav, uid) =>
      dispatch(SignUpDetailsActions.signUpDetailsRequest(image, displayName, alertfunc, nav, uid))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpDetailsScreen)
