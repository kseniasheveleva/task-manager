import { initializeApp } from "firebase/app";

export class Firebase {
  constructor() {
    this._app = initializeApp({
      apiKey: import.meta.env.VITE_API_KEY,
      authDomain: "task-manager-e1e36.firebaseapp.com",
      projectId: "task-manager-e1e36",
      storageBucket: "task-manager-e1e36.appspot.com",
      messagingSenderId: "380761358676",
      appId: "1:380761358676:web:2e6585b4c11cb36e5f08c1",
    });
  }

  get app() {
    return this._app;
  }
}

export const firebaseService = new Firebase();
