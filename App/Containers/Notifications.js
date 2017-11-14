import React from 'react'
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'
import Header from '../Components/Header'
import { mapp } from '../Services/Firebase'
import Icon from 'react-native-vector-icons/Ionicons'
import * as _ from 'lodash'
// More info here: https://facebook.github.io/react-native/docs/flatlist.html
// Styles
import styles from './Styles/NotificationsStyle'

const usr = mapp.auth();
const db = mapp.database();

class Notifications extends React.PureComponent {

  static navigationOptions = {
    header: null,
    gesturesEnabled: true,

  };


  state = {
    dataObjects: [
      {title: 'First Title', description: 'First Description'},
      {title: 'Second Title', description: 'Second Description'},
      {title: 'Third Title', description: 'Third Description'},
      {title: 'Fourth Title', description: 'Fourth Description'},
      {title: 'Fifth Title', description: 'Fifth Description'},
      {title: 'Sixth Title', description: 'Sixth Description'},
      {title: 'Seventh Title', description: 'Seventh Description'}
    ],
  };

  renderRow ({item}, nav) {
    return (
      <TouchableOpacity style={styles.row} onPress={() => nav.navigate('DirectChat',
        {receiver: item._id})}>
        <View style={{flex: 0.2, alignItems: 'flex-start'}}>
          <Image source={{uri: item.avatar}}
                 style={{borderRadius: 20, height: 40, width: 40, alignItems: 'center'}} resizeMode={'cover'}/>
        </View>
        <View style={{flex: 0.7, alignItems: 'flex-start'}}>
          <Text style={styles.label}>{item.displayName} has sent you a message
          </Text>
        </View>
        <View style={{flex: 0.1, alignItems: 'center'}}>
          <Icon name="ios-arrow-forward" size={32} color="rgba(116,100,78,1)"
          />
        </View>
      </TouchableOpacity>
    )
  }

  /* ***********************************************************
   * STEP 3
   * Consider the configurations we've set below.  Customize them
   * to your liking!  Each with some friendly advice.
   *************************************************************/
  // Render a header?

  // Render a footer?


  // Show this when data is empty
  renderEmpty = () =>
    <Text style={styles.label}> - There are no Notifications - </Text>

  renderSeparator = () =>
    <Text> </Text>

  // The default function if no Key is provided is index
  // an identifiable key is important if you plan on
  // item reordering.  Otherwise index is fine
  keyExtractor = (item, index) => index


  // How many items should be kept im memory as we scroll?
  oneScreensWorth = 20

  // extraData is for anything that is not indicated in data
  // for instance, if you kept "favorites" in `this.state.favs`
  // pass that in, so changes in favorites will cause a re-render
  // and your renderItem will have access to change depending on state
  // e.g. `extraData`={this.state.favs}

  // Optimize your list if the height of each item can be calculated
  // by supplying a constant height, there is no need to measure each
  // item after it renders.  This can save significant time for lists
  // of a size 100+
  // e.g. itemLayout={(data, index) => (
  //   {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
  // )}

  render () {
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <Header {...navigation}/>
        <View style={styles.conContainer}>
          <TouchableOpacity
            style={styles.topacity}>
            <Text style={{color: '#F4EAD3', fontSize: 14}}>
              Notifications
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          contentContainerStyle={styles.listContent}
          data={this.props.notifications}
          renderItem={item => this.renderRow(item, this.props.navigation)}
          keyExtractor={this.keyExtractor}
          initialNumToRender={this.oneScreensWorth}
          ListEmptyComponent={this.renderEmpty}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  let msgArray = [];
  if (state.notifications) {
    msgArray = state.notifications.payload ? Object.values(state.notifications.payload)
      .map((msg) =>
        ({displayName: msg.user.name, _id: msg.user._id, avatar: msg.user.avatar})) : [];
  }
  return {
    notifications: _.uniqWith(msgArray, _.isEqual)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(Notifications)
