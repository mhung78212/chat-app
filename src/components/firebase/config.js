import 'firebase/analytics'

const firebaseConfig = {
    apiKey: "AIzaSyDdYXXxmgQ4Dn6_msGOO1W-7RvIeTTVgug",
    authDomain: "chat-app-56a4c.firebaseapp.com",
    projectId: "chat-app-56a4c",
    storageBucket: "chat-app-56a4c.appspot.com",
    messagingSenderId: "994462250794",
    appId: "1:994462250794:web:5d855f23f61da64f161053",
    measurementId: "G-NCK36B21TK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
