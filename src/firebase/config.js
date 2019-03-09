import firebase from 'firebase/app';
import 'firebase/storage';

var config = {
    apiKey: "AIzaSyDca1UfScbhZSUHZjUxtrYp9HH_1YGf_h0",
    authDomain: "bookyardfootball.firebaseapp.com",
    databaseURL: "https://react-drawer.firebaseio.com",
    projectId: "bookyardfootball",
    storageBucket: "bookyardfootball.appspot.com",
    messagingSenderId: "805723398020"
  };
  
  firebase.initializeApp(config);
  
  const storage = firebase.storage();
  
  export {
      storage, firebase as default
  }
  