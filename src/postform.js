// src/PostForm.js

import { useState } from 'react';
import { db, storage } from './firebase';

const PostForm = () => {
  const [media, setMedia] = useState(null);
  const [text, setText] = useState('');

  const handleFileChange = (e) => {
    setMedia(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (media) {
      const storageRef = storage.ref();
      const postRef = storageRef.child('posts/' + new Date().getTime());

      await postRef.put(media[0]);
      const mediaUrl = await postRef.getDownloadURL();

      await db.collection('posts').add({
        text: text,
        mediaUrl: mediaUrl,
        timestamp: new Date(),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        placeholder="Write something..." 
      />
      <input type="file" onChange={handleFileChange} multiple />
      <button type="submit">Post</button>
    </form>
  );
};

export default PostForm;
