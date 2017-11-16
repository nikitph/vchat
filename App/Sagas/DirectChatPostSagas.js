import { call, put } from 'redux-saga/effects'
import DirectChatPostActions from '../Redux/DirectChatPostRedux'
import { mapp } from '../Services/Firebase'

const db = mapp.database();
const usr = mapp.auth()

export function* directChatPost (action) {
  const {data} = action;
  const {text, receiver, _id, messageSenderPushId} = data;
  const msgObj = Object.assign({text, _id, receiver, messageSenderPushId},
    {createdAt: data.createdAt.toJSON()}, {user: data.user, sender: usr.currentUser.uid});


  try {
    let senderMsgRef =
      db.ref(`users/${usr.currentUser.uid}/messages`)
        .push(msgObj);
    const senderMsgKey = senderMsgRef.key;

    let receiverMsgRef =
      db.ref(`users/${receiver}/messages`)
        .push(msgObj);
    const receiverMsgKey = receiverMsgRef.key;

    let notifRef =
      db.ref(`users/${receiver}/notifications`)
        .push(Object.assign({}, msgObj, {read: false}));
    const notifKey = notifRef.key;

    yield put(DirectChatPostActions.directChatPostSuccess({senderMsgKey, receiverMsgKey, notifKey}));
  }
  catch (error) {
    yield put(DirectChatPostActions.directChatPostFailure({error}));
  }
}
