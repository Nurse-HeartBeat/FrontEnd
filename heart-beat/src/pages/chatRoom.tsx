import React, { useRef, useState, useEffect } from 'react';
import { firestore, auth } from '../auth/firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase from 'firebase/app'; // Import the firebase namespace
import { collection, where, addDoc, query, orderBy, limit, serverTimestamp } from "firebase/firestore";
import { useSelector } from 'react-redux';

// Create a custom type for the Firestore instance

export default function ChatRoom() {
  const reduxUser = useSelector((state: any) => state.user);
  const [formValue, setFormValue] = useState('');

  const dummy = useRef<HTMLSpanElement>(null);

  const messagesRef = collection(firestore, 'messages');

  let user;
  let userObj;

  if (reduxUser.employer) {
    user = 'employer';
    userObj = reduxUser.employer;
  } else {
    user = 'nurse';
    userObj = reduxUser.user
  }

  // const q = query(messagesRef, orderBy("createdAt"), limit(25), where(user, "==", userObj.id));

  const q = query(messagesRef, orderBy("createdAt"), limit(25), where("nurse", "==","nurse1"));


  const [messages, loadingMessages, error] = useCollectionData(q);

  console.log(q)


  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // const { uid, photoURL } = auth.currentUser;

    await addDoc(messagesRef, {
      text: formValue,
      createdAt: serverTimestamp(),
      nurse:'nurse1'
      // uid,
      // photoURL,
    });

    setFormValue('');
    dummy.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className='bg-white text-black'>
      <main>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
        <span ref={dummy}></span>
      </main>
      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="say something nice"
        />
        <button type="submit" disabled={!formValue}>
          🕊️
        </button>
      </form>
    </div>
  );
}

function ChatMessage(props: any) {
  const { text, nurse, photoURL } = props.message;

  const messageClass = nurse === 'nurse1' ? 'sent' : 'received';

  return (<>
    <div className={`message ${messageClass}`}>
      <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
      <p>{text}</p>
    </div>
  </>)
}

