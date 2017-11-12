import React from 'react'
import PropTypes from 'prop-types';

import { ScrollView, Text, KeyboardAvoidingView, View } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)

import ItemChatPostTypes from '../Redux/ItemChatPostRedux'

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
          messages={this.props.messages}
          onSend={(messages) => this.onSend(messages)}
          user={{_id: usr.currentUser.uid, name: usr.currentUser.displayName, avatar: usr.currentUser.photoURL}}
        />
      </View>

    )
  }

}

ItemChat.propTypes = {

  postMessage: PropTypes.func

};

const mapStateToProps = (state) => {
  let msgArray = state.itemchat ? state.itemchat.payload ? Object.values(state.itemchat.payload) : [] : [];
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
