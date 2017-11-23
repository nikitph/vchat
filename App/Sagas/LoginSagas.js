import { call, put, select } from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'
import GroupChatActions from '../Redux/GroupChatRedux'
// import ItemActions from '../Redux/ItemRedux'
import NotificationsActions from '../Redux/NotificationsRedux'
import UserListActions from '../Redux/UserListRedux'
import { NavigationActions } from 'react-navigation'
import DirectChatActions from '../Redux/DirectChatRedux'
import { mapp, dbService } from '../Services/Firebase'

const usr = mapp.auth();

// attempts to login
export function* login ({email, password, alertfunc, nav}) {
  try {

    if(usr.currentUser)
    {
      const {uid, displayName, photoURL} = usr.currentUser;
      const location = yield call(dbService.database.read, `users/${uid}/location`);
      const device = yield call(dbService.database.read, `users/${uid}/device`);
      yield put(LoginActions.loginSuccess({uid, displayName, photoURL, location, device}));
      yield put(GroupChatActions.groupChatRequest());
      yield put(DirectChatActions.directChatRequest());
      yield put(UserListActions.userListRequest());
      yield put(NotificationsActions.notificationsRequest());
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({routeName: 'Dashboard'}, {uid, displayName, photoURL})
        ]
      });
      yield call(nav.dispatch, resetAction)
    }

    else if( password !=="passthrough" ){

      const response = yield call(dbService.auth.signInWithEmailAndPassword, email.toString(), password.toString(), function () {});
      const {uid, displayName, photoURL} = response;
      const location = yield call(dbService.database.read, `users/${uid}/location`);
      const device = yield call(dbService.database.read, `users/${uid}/device`);
      yield put(LoginActions.loginSuccess({uid, displayName, photoURL, location, device}));
      yield put(GroupChatActions.groupChatRequest());
      yield put(DirectChatActions.directChatRequest());
      yield put(UserListActions.userListRequest());
      // yield put(ItemActions.itemRequest());
      yield put(NotificationsActions.notificationsRequest());
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({routeName: 'Dashboard'}, {uid, displayName, photoURL})
        ]
      });
      yield call(nav.dispatch, resetAction)
    }

    else {

      yield put(LoginActions.loginFailure({error:'error'}));

    }

  }
  catch (error) {
    yield put(LoginActions.loginFailure(error));
    alertfunc('error', 'Error', error.message)
  }
}
