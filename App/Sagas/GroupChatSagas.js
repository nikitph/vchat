import { call, put, take } from 'redux-saga/effects'
import GroupChatActions from '../Redux/GroupChatRedux'
import { mapp, dbService } from '../Services/Firebase'

const usr = mapp.auth();

export function* syncMsgSaga () {
  const channel = yield call(dbService.database.channel, `groupchat/messages`);

  while (true) {
    const {value: messages} = yield take(channel);
    yield put(GroupChatActions.groupChatSuccess(messages))
  }
}

export function* getGroupChat (api, action) {
  const {data} = action
  // make the call to the api
  const response = yield call(api.getgroupChat, data)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(GroupChatActions.groupChatSuccess(response.data))
  } else {
    yield put(GroupChatActions.groupChatFailure())
  }
}
