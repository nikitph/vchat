import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'
import { Metrics, Colors } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  topLogo: {
    alignSelf: 'center',
    resizeMode: 'contain',
    width: Metrics.screenWidth * 0.5,
  },
  cart: {
    alignSelf: 'center',
    resizeMode: 'contain',
    width: Metrics.screenWidth * 0.35,
    marginTop: -140
  },
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  header: {
    color: '#665234',
    alignSelf: 'center',
    fontFamily: 'PingFangTC-Thin',
    fontSize: 28,
    marginBottom: 20
  },
  errorText: {
    color: 'red'
  },
  signIn: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 40
  },
  signInLink: {
    marginLeft: 1,
    color: 'white'
  },
  form: {
    backgroundColor: Colors.clear,
    marginLeft: 10,
    marginRight: 10,
  },
  row: {
    paddingVertical: Metrics.smallMargin,
    margin: 10,
    backgroundColor: 'rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'

  },
  rowLabel: {
    color: Colors.charcoal
  },
  textInput: {
    height: 40,
    color: Colors.coal,
    fontFamily: 'Avenir',

  },
  textInputReadonly: {
    height: 40,
    color: Colors.steel
  },
  loginRow: {
    marginTop: Metrics.doubleBaseMargin,
    paddingBottom: Metrics.doubleBaseMargin,
    flexDirection: 'row'
  },
  loginButtonWrapper: {
    flex: 1
  },
  loginButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.bloodOrange,
    backgroundColor: Colors.transparent,
    padding: 6
  },
  loginText: {
    textAlign: 'center',
    color: Colors.ember,
  },
  uploadImageButton: {
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10
  },

  imagePickerTitle: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center'
  },

  closeImagePicker: {
    backgroundColor: 'maroon',
    padding: 10,
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5
  },

  chooseImage: {
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5
  }
});
