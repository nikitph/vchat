import { call, put } from 'redux-saga/effects'
import ResetPasswordActions from '../Redux/ResetPasswordRedux'
import { dbService } from '../Services/Firebase'

export function* resetPassword ({email, alertfunc}) {
  try {
    const response = yield call(dbService.auth.sendPasswordResetEmail, email.toString());
    yield put(ResetPasswordActions.resetPasswordSuccess({username: {username: "hi me"}}));
    alertfunc('success', 'Success', 'Please check your inbox for next steps')

  }
  catch (error) {
    yield put(ResetPasswordActions.resetPasswordFailure(error));
    alertfunc('error', 'Error', error.message)
  }
}
