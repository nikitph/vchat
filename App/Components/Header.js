import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity } from 'react-native'
import styles from './Styles/HeaderStyle'
import { Images } from '../Themes'
import { mapp } from '../Services/Firebase'
import Icon from 'react-native-vector-icons/Ionicons'
import { NavigationActions } from 'react-navigation'
import Badge from '../Components/Badge'
import * as Animatable from 'react-native-animatable'
import { connect } from 'react-redux'
import * as _ from 'lodash'

const usr = mapp.auth();

const dashboardAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({routeName: 'Dashboard'})
  ]
});

class Header extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  resetAction (path) {
    this.props.dispatch(NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({routeName: path})
      ]
    }));
  }

  render () {
    return (
      <View style={styles.row}>
        <TouchableOpacity style={styles.container} onPress={() => {
          this.props.dispatch(dashboardAction);
        }}>

          <Image
            source={Images.vpchat}
            style={{flex: 1, height: 80, alignItems: 'center',}}
            resizeMode={'contain'}/>
        </TouchableOpacity>
        <View style={styles.container2}>


          <View style={{flex: 0.3, alignItems: 'center'}}>
            <Image
              source={{
                uri: usr.currentUser.photoURL ? usr.currentUser.photoURL : this.props.state.url ?
                  this.props.state.url : 'https://www.sparklabs.com/forum/styles/comboot/theme/images/default_avatar.jpg'
              }}
              style={{borderRadius: 20, height: 40, width: 40, alignItems: 'center'}} resizeMode={'cover'}/>
          </View>

          <View style={{flex: 0.2, alignItems: 'center'}}>
            <Icon name="ios-chatbubbles" size={25} color="#665234" onPress={() => {
              this.resetAction('BuyConversations');
            }}/>
          </View>

          <Animatable.View animation='shake'
                           style={{flex: 0.2, alignItems: 'center', flexDirection: 'row', justifyContent: 'center'}}>
            <Icon name="ios-notifications-outline" size={25} color="#665234" onPress={() => {
              this.resetAction('Notifications');
            }}/>
            <Badge minWidth={12} minHeight={12} textStyle={{fontSize: 10, color: 'white'}}
                   style={{backgroundColor: 'green', marginBottom: 16, marginLeft: -5}}
            >
              {this.props.notifs.length}
            </Badge>
          </Animatable.View>

          <View style={{flex: 0.2, alignItems: 'center'}}>
            <Icon name="ios-log-out-outline" size={25} color="#665234" onPress={() => {
              usr.signOut();
              this.resetAction('LoginScreen');
            }}/>
          </View>

        </View>
        {/*<View style={styles.container}>*/}
        {/*<View style={{flex:0.3, alignItems:'center', marginTop:5}}>*/}
        {/*<Icon name="ios-pricetags-outline" size={25} color="#665234" onPress={()=>{*/}
        {/*this.props.navigate('MyItems', {sold:false});*/}
        {/*}}/>*/}
        {/*</View>*/}

        {/*<View style={{flex:0.4, alignItems:'center'}}>*/}
        {/*<Icon name="ios-chatbubbles" size={25} color="#665234" onPress={()=>{*/}
        {/*this.resetAction('BuyConversations');*/}
        {/*}}/>*/}
        {/*</View>*/}

        {/*<Animatable.View animation='shake' style={{flex:0.3, alignItems:'center',flexDirection:'row', justifyContent:'center'}}>*/}
        {/*<Icon name="ios-notifications-outline" size={25} color="#665234" onPress={()=>{*/}
        {/*this.resetAction('Notifications');*/}
        {/*}}/>*/}
        {/*<Badge minWidth={12} minHeight={12} textStyle={{fontSize: 10,  color: 'white'}} style={{backgroundColor:'green',marginBottom:16, marginLeft:-5}}*/}
        {/*>*/}
        {/*{this.props.notifs.length}*/}
        {/*</Badge>*/}
        {/*</Animatable.View>*/}

        {/*</View>*/}

      </View>
    )
  }
}

const mapStateToProps = (state) => {
  let notif = state.notifications ? state.notifications.payload : [];
  let notifArray = notif ? Object.values(notif)
    .map((msg) =>
      ({displayName: msg.user.name, _id: msg.user._id, avatar: msg.user.avatar})) : [];
  return {
    notifs: _.uniqWith(notifArray, _.isEqual)
  };
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
