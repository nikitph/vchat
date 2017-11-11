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
            <View style={{
              borderColor: '#EEF1F3',
              borderWidth: 1,
              flex: 0.5,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Icon name="ios-people-outline" size={50} color="#665234" onPress={() => {
                this.props.navigate('MyItems', {sold: false});
              }}/>
              <Text>Group Chat</Text>

            </View>
            <View style={{
              borderColor: '#EEF1F3',
              borderWidth: 1,
              flex: 0.5,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Icon name="ios-chatbubbles-outline" size={45} color="#665234" onPress={() => {
                this.props.navigate('MyItems', {sold: false});
              }}/>
              <Text>Conversations</Text>
            </View>
          </View>
          <View style={{flex: 0.5, flexDirection: 'column'}}>
            <View style={{
              borderColor: '#EEF1F3',
              borderWidth: 1,
              flex: 0.5,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Icon name="ios-git-network-outline" size={50} color="#665234" onPress={() => {
                this.props.navigate('MyItems', {sold: false});
              }}/>
              <Text>People</Text>
            </View>
            <View style={{
              borderColor: '#EEF1F3',
              borderWidth: 1,
              flex: 0.5,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Icon name="ios-notifications-outline" size={50} color="#665234" onPress={() => {
                this.props.navigate('MyItems', {sold: false});
              }}/>
              <Text>Notifications</Text>
            </View>
          </View>


        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  let msgArray = [];
  if (state.itemchat) {
    msgArray = state.itemchat.payload ? Object.values(state.itemchat.payload)
      .map(({sellerName, sellerId, sellerPic, itemKey, itemSummary, buyerName, buyerId, buyerPic}) =>
        ({sellerName, sellerId, sellerPic, itemKey, itemSummary, buyerName, buyerId, buyerPic})) : [];
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
