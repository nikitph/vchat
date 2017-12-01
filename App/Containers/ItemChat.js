import React from 'react'
import PropTypes from 'prop-types';

import { ScrollView, Text, KeyboardAvoidingView, View } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)

import ItemChatPostTypes from '../Redux/ItemChatPostRedux'
import ReactNativeTooltipMenu from 'react-native-tooltip-menu';
import { sendEmail } from '../Services/Email'
import { DateTime } from 'luxon';

import { Metrics } from '../Themes'
// external libs
import Icon from 'react-native-vector-icons/Ionicons'
import DropdownAlert from 'react-native-dropdownalert'
import Animatable from 'react-native-animatable'

// Styles
import styles from './Styles/ItemChatStyle'
import { dbService, mapp } from '../Services/Firebase'

// I18n
import { GiftedChat } from 'react-native-gifted-chat';
import Header from '../Components/Header'

const usr = mapp.auth();

class ItemChat extends React.Component {

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
    this.props.postMessage(msgObj);
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });
  }

  render () {

    return (

      <View style={{flex: 1, backgroundColor: 'white'}}>
        <Header {...this.props.navigation}/>
        <GiftedChat
          messages={this.props.messages.sort(function compare (a, b) {
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
                  toLocaleString(DateTime.DATETIME_MED) + " in Group chat by " + usr.currentUser.displayName)
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

ItemChat.propTypes = {

  postMessage: PropTypes.func

};

const mapStateToProps = (state) => {
  let msgArray = state.groupchat ? state.groupchat.payload ? Object.values(state.groupchat.payload) : [] : [];
  return {
    messages: msgArray
  }
};

const mapDispatchToProps = (dispatch) => {
  return {

    postMessage: (data) =>
      dispatch(ItemChatPostTypes.itemChatPostRequest(data))

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemChat)
