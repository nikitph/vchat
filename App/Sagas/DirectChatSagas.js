import { call, put, take } from 'redux-saga/effects'
import DirectChatActions from '../Redux/DirectChatRedux'
import { mapp, dbService } from '../Services/Firebase'

const usr = mapp.auth();

export function* syncDirectMsgSaga () {
  const channel = yield call(dbService.database.channel, `users/${usr.currentUser.uid}/messages`);

  while (true) {
    const {value: messages} = yield take(channel);
    yield put(DirectChatActions.directChatSuccess(messages))
  }
}
