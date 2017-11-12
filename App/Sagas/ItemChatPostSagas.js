import { call, put } from 'redux-saga/effects'
import ItemChatPostActions from '../Redux/ItemChatPostRedux'
import { mapp } from '../Services/Firebase'

const db = mapp.database();

export function* itemChatPost (action) {

  const {data} = action;
  const {text, _id} = data;
  const msgObj = Object.assign({text, _id},
    {createdAt: data.createdAt.toJSON()}, {user: data.user});

  try {

    let gcMsgRef =
      db.ref(`groupchat/messages`)
        .push(msgObj);
    const sellerMsgKey = gcMsgRef.key;
    yield put(ItemChatPostActions.itemChatPostSuccess({sellerMsgKey}));

  }

  catch (error) {
    yield put(ItemChatPostActions.itemChatPostFailure({error}));
  }
}
