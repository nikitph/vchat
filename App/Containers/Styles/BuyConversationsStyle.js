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
    backgroundColor: 'rgba(116,100,78,0.2)',
    margin: 2,
    marginLeft: 5,
    marginRight: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20
  },
  topacity: {flex: 1, alignItems: 'center', justifyContent: 'center', padding: 5, backgroundColor: '#665234'},

  boldLabel: {
    fontWeight: 'bold',
    alignSelf: 'center',
    color: Colors.snow,
    textAlign: 'center',
    marginBottom: Metrics.smallMargin
  },
  conContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#665234'
  },
  label: {
    textAlign: 'center',
    color: 'rgb(79, 18, 34)',
    fontSize: 16,
    fontFamily: 'Avenir'
  },
  listContent: {
    marginTop: 5
  }
})
