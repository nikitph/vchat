// @flow
// I18n
import { Text, View, Image } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
// external libs
import * as Animatable from 'react-native-animatable'
// Styles
import styles from './Styles/WalkThroughScreenStyle'
import React, { Component } from 'react'
import RoundedButton from '../Components/RoundedButton'
import { Images, Metrics } from '../Themes'

class WalkThroughScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };

  render () {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image source={Images.lc} style={{flex: 1}}>
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'flex-end',
            backgroundColor: 'rgba(256,256,256,0.92)'
          }}>
          </View>
        </Image>
        <View
          style={{flexDirection: 'row', alignItems: 'flex-end', backgroundColor: '#F7EDD3'}}>
        </View>

      </View>
    );
  }

}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(WalkThroughScreen)
