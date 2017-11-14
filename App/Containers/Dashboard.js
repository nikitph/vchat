import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import Header from '../Components/Header'
import { mapp } from '../Services/Firebase'
import { Images } from '../Themes'
import * as Animatable from 'react-native-animatable'
import Icon from 'react-native-vector-icons/Ionicons'
import * as _ from 'lodash'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
// Styles
import styles from './Styles/DashboardStyle'
import { NavigationActions } from 'react-navigation'
import Badge from '../Components/Badge'

const usr = mapp.auth();

class Dashboard extends Component {

  static navigationOptions = {
    header: null,
    gesturesEnabled: false,

  };

  constructor (props) {
    super(props);
  }

  componentWillMount () {
    this.setState({output: ""});
  }

  resetAction (path) {
    this.props.navigation.dispatch(NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({routeName: path})
      ]
    }));
  }

  render () {

    let length = this.props.items ? Object.values(this.props.items).filter(val => val.sellerId == usr.currentUser.uid && !val.sold).length : 0;
    let convos = this.props.conversations && this.props.conversations.filter(msg =>
      msg.buyerId == usr.currentUser.uid || msg.sellerId == usr.currentUser.uid).length;
    return (

      <View style={{flex: 1, backgroundColor: 'white'}}>
        <Header {...this.props.navigation}/>

        <View style={styles.container}>
          <View style={{flex: 0.5, flexDirection: 'column'}}>
            <TouchableOpacity style={{
              borderColor: '#EEF1F3',
              borderWidth: 1,
              flex: 0.5,
              justifyContent: 'center',
              alignItems: 'center'
            }} onPress={() => {
              this.props.navigation.navigate('ItemChat');
            }}>
              <Icon name="ios-people-outline" size={50} color="#665234" />
              <Text style={{ fontSize: 18, fontFamily: 'PingFangTC-Thin'}}>
                Group Chat</Text>

            </TouchableOpacity>
            <TouchableOpacity style={{
              borderColor: '#EEF1F3',
              borderWidth: 1,
              flex: 0.5,
              justifyContent: 'center',
              alignItems: 'center'
            }} onPress={() => {
              this.props.navigation.navigate('BuyConversations');
            }}>
              <Icon name="ios-chatbubbles-outline" size={45} color="#665234"/>
              <Text style={{ fontSize: 18, fontFamily: 'PingFangTC-Thin'}}>
                Conversations</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 0.5, flexDirection: 'column'}}>
            <TouchableOpacity style={{
              borderColor: '#EEF1F3',
              borderWidth: 1,
              flex: 0.5,
              justifyContent: 'center',
              alignItems: 'center'
            }} onPress={() => {
              this.props.navigation.navigate('PeopleList');
            }}>
              <Icon name="ios-git-network-outline" size={50} color="#665234" />
              <Text style={{ fontSize: 18, fontFamily: 'PingFangTC-Thin'}}>
                People</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
              borderColor: '#EEF1F3',
              borderWidth: 1,
              flex: 0.5,
              justifyContent: 'center',
              alignItems: 'center'
            }} onPress={() => {
              this.props.navigation.navigate('Notifications');
            }}>
              <Icon name="ios-notifications-outline" size={50} color="#665234" />
              <Text style={{ fontSize: 18, fontFamily: 'PingFangTC-Thin'}}>
                Notifications</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  let msgArray = [];
  if (state.directchat) {
    msgArray = state.directchat.payload ? Object.values(state.directchat.payload)
      .map((msg) =>
        ({displayName: msg.user.name, _id: msg.user._id, avatar: msg.user.avatar})) : [];
  }
  return {
    items: [],
    conversations: _.uniqWith(msgArray, _.isEqual)
  }
};

const mapDispatchToProps = (dispatch) => {
  return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
