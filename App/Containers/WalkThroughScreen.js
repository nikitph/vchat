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
import Button from 'react-native-micro-animated-button';

import { Images, Metrics } from '../Themes'

const colors = {
  blue: '#4285f4',
  gray: '#d8d8d8',
  grayDark: '#444',
  green: '#0f9d58',
  red: '#A01829',
  white: 'white'
};

class WalkThroughScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };

  render () {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
        <Image source={Images.lc} style={{flex: 1}}>
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'flex-end',
            backgroundColor: 'rgba(256,256,256,0.97)'
          }}>
            <Animatable.Image animation='fadeIn' source={Images.vpchat} style={[styles.topLogo]}/>
          </View>
        </Image>
        <View
          style={{flexDirection: 'row', alignItems: 'flex-end', backgroundColor: 'white'}}>
          <Button
            bounce
            foregroundColor={colors.white}
            backgroundColor={colors.red}
            label="Get Started"
            onPress={() => {
              this.b1.success();
              this.props.navigation.navigate('SignUpScreen')
            }
            }
            ref={ref => (this.b1 = ref)}
            successIconName="check"
          />
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
