import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDzAgWNHl5m8he5Vr3ldkOGcZo3ly0LHP4",
  authDomain: "exotic-islands.firebaseapp.com",
  databaseURL: "https://exotic-islands.firebaseio.com",
  projectId: "exotic-islands",
  storageBucket: "exotic-islands.appspot.com",
  messagingSenderId: "424585400155"
};

const base = firebase.initializeApp(config)

export const auth = base.auth();
export default base;



