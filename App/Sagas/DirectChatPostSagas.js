import { call, put } from 'redux-saga/effects'
import DirectChatPostActions from '../Redux/DirectChatPostRedux'
import { mapp } from '../Services/Firebase'

const db = mapp.database();
const usr = mapp.auth()

export function* directChatPost (action) {
  const {data} = action;
  const {text, receiver, _id} = data;
  const msgObj = Object.assign({text, _id, receiver},
    {createdAt: data.createdAt.toJSON()}, {user: data.user});
  console.log(db);
  console.log(msgObj);

  try {
    let senderMsgRef =
      db.ref(`users/${usr.currentUser.uid}/messages`)
        .push(msgObj);
    const senderMsgKey = senderMsgRef.key;
    console.log(msgObj);

    let receiverMsgRef =
      db.ref(`users/${receiver}/messages`)
        .push(msgObj);
    const receiverMsgKey = receiverMsgRef.key;
    console.log(msgObj);

    let notifRef =
      db.ref(`users/${receiver}/notifications`)
        .push(Object.assign({}, msgObj, {read: false}));
    const notifKey = notifRef.key;

    yield put(DirectChatPostActions.directChatPostSuccess({senderMsgKey, receiverMsgKey, notifKey}));
  }
  catch (error) {
    console.log(error);
    yield put(DirectChatPostActions.directChatPostFailure({error}));
  }
}
