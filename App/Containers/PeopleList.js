import React from 'react'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import { mapp } from '../Services/Firebase'
// More info here: https://facebook.github.io/react-native/docs/flatlist.html
// Styles
import styles from './Styles/PeopleListStyle'
import Header from '../Components/Header'

const usr = mapp.auth();


class MyListItem extends React.PureComponent {
  _onPress = () => {
    this.props.nav.navigate('DirectChat', {receiver: this.props.uid})
  };

  render () {

    const props = this.props;
    return (
      <TouchableOpacity style={styles.row} onPress={this._onPress}>
        <Image
          source={{
            uri: props.url ? props.url : 'https://www.sparklabs.com/forum/styles/comboot/theme/images/default_avatar.jpg'
          }}
          style={{borderRadius: 20, height: 40, width: 40, alignItems: 'center'}} resizeMode={'cover'}/>
        <Text style={styles.boldLabel}>{props.displayName}</Text>
      </TouchableOpacity>
    )
  }
}


class PeopleList extends React.PureComponent {

  static navigationOptions = {
    header: null,
    gesturesEnabled: false,

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
    ]
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

    if (item.uid === usr.currentUser.uid)
      return;

    return <MyListItem
      url={item.url}
      displayName={item.displayName}
      uid={item.uid}
      location={item.location}
      nav={nav}
    />

  }

  /* ***********************************************************
  * STEP 3
  * Consider the configurations we've set below.  Customize them
  * to your liking!  Each with some friendly advice.
  *************************************************************/
  // Render a header?
  renderHeader = () =>
    <Text style={[styles.label, styles.sectionHeader]}> - Header - </Text>

  // Render a footer?
  renderFooter = () =>
    <Text style={[styles.label, styles.sectionHeader]}> - Footer - </Text>

  // Show this when data is empty
  renderEmpty = () =>
    <Text style={styles.label}> - Nothing to See Here - </Text>

  renderSeparator = () =>
    <Text style={styles.label}> - ~~~~~ - </Text>

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
    return (
      <View style={styles.container}>
        <Header {...this.props.navigation}/>
        <FlatList
          contentContainerStyle={styles.listContent}
          data={this.props.items}
          renderItem={item => this.renderRow(item, this.props.navigation)}
          numColumns={3}
          keyExtractor={this.keyExtractor}
          initialNumToRender={this.oneScreensWorth}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          ListEmptyComponent={this.renderEmpty}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    items: Object.values(state.userlist.payload),
    location: state.login.payload ? state.login.payload.location : state.signupdetails.payload.location
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(PeopleList)
