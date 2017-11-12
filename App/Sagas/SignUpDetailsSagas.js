import { call, put } from 'redux-saga/effects'
import SignUpDetailsActions from '../Redux/SignUpDetailsRedux'
import GroupChatActions from '../Redux/GroupChatRedux'
// import ItemActions from '../Redux/ItemRedux'
// import NotificationsActions from '../Redux/NotificationsRedux'
import { dbService, mapp } from '../Services/Firebase'
import { Platform } from 'react-native'
import { fileUpload } from '../Services/Uploader'
import { NavigationActions } from 'react-navigation'

const storage = mapp.storage();
const usr = mapp.auth();

export function* uploadSaga ({image, displayName, alertfunc, nav, uid}) {
  let storageRef = storage.ref(`user-images/${uid}`);
  const uploadUri = Platform.OS === 'ios' ? image.uri.replace('file://', '') : image.uri;

  try {
    const url = yield call(fileUpload, uploadUri, storageRef);
    usr.currentUser.updateProfile({displayName: displayName});
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({routeName: 'Dashboard', uid: uid, displayName: displayName, url: url})
      ]
    });
    const location = yield call(dbService.database.read, `users/${usr.currentUser.uid}/location`);
    yield put(SignUpDetailsActions.signUpDetailsSuccess({uid, displayName, url, location}));
    yield put(GroupChatActions.groupChatRequest());
    // yield put(ItemActions.itemRequest());
    // yield put(NotificationsActions.notificationsRequest());
    yield call(nav.dispatch, resetAction)

  }
  catch (error) {
    alertfunc('error', 'Error', error.message)
  }
}
