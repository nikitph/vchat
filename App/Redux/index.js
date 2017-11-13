import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  nav: require('./NavigationRedux').reducer,
  github: require('./GithubRedux').reducer,
  search: require('./SearchRedux').reducer,
  signup: require('./SignUpRedux').reducer,
  login: require('./LoginRedux').reducer,
  signupdetails: require('./SignUpRedux').reducer,
  reset: require('./ResetPasswordRedux').reducer,
  // sellitem: require('./SellItemRedux').reducer,
  groupchat: require('./GroupChatRedux').reducer,
  itemchatpost: require('./ItemChatPostRedux').reducer,
  userlist: require('./UserListRedux').reducer,
  // item: require('./ItemRedux').reducer,
  // notifications: require('./NotificationsRedux').reducer,
  // itemupdate: require('./ItemUpdateRedux').reducer,
  // itemdelete: require('./ItemDeleteRedux').reducer
})

export default () => {
  let { store, sagasManager, sagaMiddleware } = configureStore(reducers, rootSaga)

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./').reducers
      store.replaceReducer(nextRootReducer)

      const newYieldedSagas = require('../Sagas').default
      sagasManager.cancel()
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware.run(newYieldedSagas)
      })
    })
  }

  return store
}
