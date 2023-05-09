var firebaseConfig = {
    apiKey: "AIzaSyAhlmqu-WzId4OVGtj4Tp9-xhY-uTnEB4o",
    authDomain: "to-do-live-e8384.firebaseapp.com",
    projectId: "to-do-live-e8384",
    storageBucket: "to-do-live-e8384.appspot.com",
    messagingSenderId: "746459267480",
    appId: "1:746459267480:web:2ad8898831e03605ab2bed",
    measurementId: "G-FXN1HDZGRD"
  };

 

firebase.initializeApp(firebaseConfig);
firebase.analytics();
var db = firebase.firestore();