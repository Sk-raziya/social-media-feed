// src/Feed.js

import { useState, useEffect } from 'react';
import { db } from './firebase'; // Firebase Firestore initialization

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    let query = db.collection('posts').orderBy('timestamp').limit(20);
    if (lastDoc) {
      query = query.startAfter(lastDoc);
    }

    const snapshot = await query.get();
    const newPosts = snapshot.docs.map(doc => doc.data());
    setPosts(prevPosts => [...prevPosts, ...newPosts]);
    setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
  };

  const handleScroll = (e) => {
    if (e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight) {
      loadPosts();
    }
  };

  return (
    <div onScroll={handleScroll}>
      {posts.map(post => (
        <div key={post.id}>
          <p>{post.text}</p>
          {post.mediaUrl && <img src={post.mediaUrl} alt="Post media" />}
        </div>
      ))}
    </div>
  );
};

export default Feed;
