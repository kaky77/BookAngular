import { Component } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import * as firebase from '@firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(){
    const firebaseConfig = {
      apiKey: "AIzaSyDSvRKVX1xT2EfJVLWPoMXCAVSzSyT232Y",
      authDomain: "book-54f8d.firebaseapp.com",
      projectId: "book-54f8d",
      storageBucket: "book-54f8d.appspot.com",
      messagingSenderId: "153549278544",
      appId: "1:153549278544:web:67cd782a833b63d2d3f055",
      measurementId: "G-365GDBCPE8"
  };
  firebase.initializeApp(firebaseConfig);
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
 
  }
 
}
