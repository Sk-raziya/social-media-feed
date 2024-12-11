// src/App.js

import React, { useEffect, useState } from 'react';
import { auth } from './firebase';
import Feed from './Feed';
import PostForm from './PostForm';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(setUser);
  }, []);

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <div>
      {!user ? (
        <button onClick={() => auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())}>
          Login with Google
        </button>
      ) : (
        <>
          <button onClick={handleLogout}>Logout</button>
          <PostForm />
          <Feed />
        </>
      )}
    </div>
  );
};

export default App;
