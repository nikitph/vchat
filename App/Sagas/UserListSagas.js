/* ***********************************************************
* A short word on how to use this automagically generated file.
* We're often asked in the ignite gitter channel how to connect
* to a to a third party api, so we thought we'd demonstrate - but
* you should know you can use sagas for other flow control too.
*
* Other points:
*  - You'll need to add this saga to sagas/index.js
*  - This template uses the api declared in sagas/index.js, so
*    you'll need to define a constant in that file.
*************************************************************/

import UserListActions from '../Redux/UserListRedux'
import { call, put, take } from 'redux-saga/effects'
import { mapp, dbService } from '../Services/Firebase'

const usr = mapp.auth();

export function* syncUserSaga () {

  const channel = yield call(dbService.database.channel, `userlist`);

  while (true) {
    const {value} = yield take(channel);
    yield put(UserListActions.userListSuccess(value))
  }
}
