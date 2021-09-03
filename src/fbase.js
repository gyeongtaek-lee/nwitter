// firebase/app에 포함된 모든 모듈을 firebase 객체에 부여
// import firebase from "firebase/app";
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGEING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
  };

// firebase 설정 정보를 초기화 함수에 전달. firebase.intializeApp(firebaseConfig)는 다른 파일에서 참조할 필요가 없으니까 fbase.js 파일 안에서 실행하도록 코드를 수정했어.
firebase.initializeApp(firebaseConfig);

// firebase.auth()는 다른 파일에서 참조할 것이므로 authService에 담아 내보낸다.
export const firebaseInstance = firebase;
// authentication
export const authService = firebase.auth();
// database
export const dbService = firebase.firestore();
// storage
export const storageService = firebase.storage();