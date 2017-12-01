import React from 'react'
import PropTypes from 'prop-types';

import { ScrollView, Text, KeyboardAvoidingView, View } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)

import DirectChatPostTypes from '../Redux/DirectChatPostRedux'

import { Metrics } from '../Themes'
// external libs
import Animatable from 'react-native-animatable'
import ReactNativeTooltipMenu from 'react-native-tooltip-menu';
import { sendEmail } from '../Services/Email'
import { DateTime } from 'luxon';

// external libs
import Icon from 'react-native-vector-icons/Ionicons'
import DropdownAlert from 'react-native-dropdownalert'

// Styles
import styles from './Styles/ItemChatStyle'
import { dbService, mapp } from '../Services/Firebase'
import OneSignal from 'react-native-onesignal'; // Import package from node modules

// I18n
import { GiftedChat } from 'react-native-gifted-chat';
import Header from '../Components/Header'

const usr = mapp.auth();

class DirectChat extends React.Component {

  static navigationOptions = {
    header: null,
    gesturesEnabled: false,

  };

  constructor (props: Object) {
    super(props);
    const {navigation, messages} = props;
    let initState = Object.assign({}, messages);
    this.state = initState;
    this.onSend = this.onSend.bind(this);
  }

  componentWillMount () {

    this.setState({
      messages: this.props.messages
    });
  }

  onSend (messages = []) {

    let msgObj = (messages[0]);
    const { receiver, pushId } = this.props.navigation.state.params;
    this.props.postMessage(Object.assign({}, msgObj, {receiver: receiver, messageSenderPushId: this.props.userPushId }));
    OneSignal.postNotification({en: msgObj.user.name + ' says : ' + msgObj.text}, {}, pushId);
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });
  }

  render () {
    const receiver = this.props.navigation.state.params.receiver;

    return (

      <View style={{flex: 1, backgroundColor: 'white'}}>
        <Header {...this.props.navigation}/>
        <GiftedChat
          messages={this.props.messages.filter(msg => ((msg.sender === receiver && msg.receiver === usr.currentUser.uid) ||
            ( msg.receiver === receiver && msg.sender === usr.currentUser.uid))).sort(function compare (a, b) {
            let dateA = new Date(a.createdAt);
            let dateB = new Date(b.createdAt);
            return dateB - dateA;
          })}
          onSend={(messages) => this.onSend(messages)}
          user={{_id: usr.currentUser.uid, name: usr.currentUser.displayName, avatar: usr.currentUser.photoURL}}
          renderChatFooter={()=> {return (<ReactNativeTooltipMenu
            buttonComponent={
              <View
                style={{
                  backgroundColor: 'rgba(0,0,0,0)',
                  padding: 10,
                  borderRadius: 25
                }}
              >
                <Icon name="ios-alert-outline" size={25} color="red" />
              </View>
            }
            items={[
              {
                label: 'Report Abuse',
                onPress: () => {
                  sendEmail("nikitph@gmail.com", "Abuse report", "Timestamp: " + DateTime.local().
                  toLocaleString(DateTime.DATETIME_MED) + " in direct chat by " + usr.currentUser.displayName + " with " + receiver)
                    .then((response) => {
                      if (response.ok) {
                        this.dropdown.alertWithType('success', 'Success', 'Abuse reported successfully!');
                      }
                      else {
                        this.dropdown.alertWithType('error', 'Error', 'Uh oh! Something went wrong. Please try again');
                      }
                    });
                }
              }
            ]}
          />)}}
        />
        <DropdownAlert
          ref={(ref) => this.dropdown = ref}
          showCancel={true}
          translucent={true}
          errorColor={'rgba(250,50,50,1)'}
          closeInterval={6000}
        />
      </View>

    )
  }

}

DirectChat.propTypes = {

  postMessage: PropTypes.func,
  userPushId: PropTypes.string

};

const mapStateToProps = (state) => {
  let msgArray = state.directchat ? state.directchat.payload ? Object.values(state.directchat.payload) : [] : [];
  let userPushId = state.login.payload ? state.login.payload.device.userId : state.signupdetails.payload.device.userId;
  return {
    messages: msgArray,
    userPushId: userPushId
  }
};

const mapDispatchToProps = (dispatch) => {
  return {

    postMessage: (data) =>
      dispatch(DirectChatPostTypes.directChatPostRequest(data))

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DirectChat)
