import React from 'react'
import { View, Text, FlatList, TouchableOpacity, Image, Switch } from 'react-native'
import { connect } from 'react-redux'
import Header from '../Components/Header'
import { dbService, mapp } from '../Services/Firebase'
import Icon from 'react-native-vector-icons/Ionicons'

const usr = mapp.auth();

// More info here: https://facebook.github.io/react-native/docs/flatlist.html

// Styles
import styles from './Styles/BuyConversationsStyle'
import * as _ from 'lodash'

class BuyConversations extends React.PureComponent {
  static navigationOptions = {
    header: null,
    gesturesEnabled: true,

  };
  /* ***********************************************************
  * STEP 1
  * This is an array of objects with the properties you desire
  * Usually this should come from Redux mapStateToProps
  *************************************************************/
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
    onlyBuyerMessages: true
  }

  /* ***********************************************************
  * STEP 2
  * `renderRow` function. How each cell/row should be rendered
  * It's our best practice to place a single component here:
  *
  * e.g.
    return <MyCustomCell title={item.title} description={item.description} />
  *************************************************************/
  renderRow ({item}, nav) {
    return (
      <TouchableOpacity style={styles.row} onPress={() => nav.navigate('DirectChat',
        {receiver: item._id})}>
        <View style={{flex: 0.2, alignItems: 'flex-start'}}>
          <Image source={{uri: item.avatar}}
                 style={{borderRadius: 20, height: 40, width: 40, alignItems: 'center'}} resizeMode={'cover'}/>
        </View>
        <View style={{flex: 0.7, alignItems: 'flex-start'}}>
          <Text style={styles.label}>{item.displayName}</Text>
        </View>
        <View style={{flex: 0.1, alignItems: 'center'}}>
          <Icon name="ios-arrow-forward" size={25} color="rgba(116,100,78,0.5)"
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
  renderHeader = () =>
    <SearchBar
      onSearch={() => {}}
      onCancel={() => {}}
      searchTerm='HELLO!!'
    />

  // Render a footer?
  renderFooter = () =>
    <Text style={[styles.label, styles.sectionHeader]}> - Footer - </Text>

  // Show this when data is empty
  renderEmpty = () =>
    <Text style={styles.label}> - There are no relevant conversations - </Text>

  renderSeparator = () =>
    <Text style={styles.label}> - ~~~~~ - </Text>

  // The default function if no Key is provided is index
  // an identifiable key is important if you plan on
  // item reordering.  Otherwise index is fine
  keyExtractor = (item, index) => index

  handleFieldChange (value, fieldName) {
    let inputObj = {};
    inputObj[fieldName] = value == "Conversations with buyers";
    this.setState(inputObj);
  }

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
          <View
            style={styles.topacity}>
            <Text style={{color: '#F4EAD3', fontSize: 18, fontFamily: 'PingFangTC-Thin'}}>
              Conversations
            </Text>
          </View>
        </View>
        <FlatList
          contentContainerStyle={styles.listContent}
          data={this.props.conversations.filter(msg => {
            return msg._id !== usr.currentUser.uid
          })}
          renderItem={item => this.renderRow(item, this.props.navigation)}
          keyExtractor={this.keyExtractor}
          initialNumToRender={this.oneScreensWorth}
          ListEmptyComponent={this.renderEmpty}
        />
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
    conversations: _.uniqWith(msgArray, _.isEqual)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(BuyConversations)
