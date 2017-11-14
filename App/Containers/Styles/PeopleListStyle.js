import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  row: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    paddingVertical: 10,
    borderColor: '#EEF1F3',
    borderWidth: 1,
  },
  conContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  topacity: {flex: 1, alignItems: 'center', justifyContent: 'center', padding: 5, backgroundColor: '#665234'},

  boldLabel: {
    fontFamily: 'PingFangTC-Thin',
    alignSelf: 'center',
    color: 'black',
    textAlign: 'center',
    marginTop: Metrics.smallMargin
  },
  label: {
    textAlign: 'center',
    color: 'black'
  },
  listContent: {}
})
