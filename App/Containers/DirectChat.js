import React from 'react'
import PropTypes from 'prop-types';

import { ScrollView, Text, KeyboardAvoidingView, View } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)

import DirectChatPostTypes from '../Redux/DirectChatPostRedux'

import { Metrics } from '../Themes'
// external libs
import Icon from 'react-native-vector-icons/FontAwesome'
import Animatable from 'react-native-animatable'

// Styles
import styles from './Styles/ItemChatStyle'
import { dbService, mapp } from '../Services/Firebase'

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
    this.props.postMessage(Object.assign({}, msgObj, {receiver: this.props.navigation.state.params.receiver}));
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });
  }

  render () {
    console.log(this.props.messages);
    const receiver = this.props.navigation.state.params.receiver;
    console.log(this.props.messages);
    console.log(receiver);

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
        />
      </View>

    )
  }

}

DirectChat.propTypes = {

  postMessage: PropTypes.func

};

const mapStateToProps = (state) => {
  console.log(state.directchat);
  let msgArray = state.directchat ? state.directchat.payload ? Object.values(state.directchat.payload) : [] : [];
  return {
    messages: msgArray
  }
};

const mapDispatchToProps = (dispatch) => {
  return {

    postMessage: (data) =>
      dispatch(DirectChatPostTypes.directChatPostRequest(data))

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DirectChat)
