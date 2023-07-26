import React, { useRef, useState, useEffect } from 'react';
import { firestore, auth } from '../auth/firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase from 'firebase/app'; // Import the firebase namespace
import { collection, where, addDoc, query, orderBy, limit, serverTimestamp, doc, getDoc } from "firebase/firestore";
import { useSelector } from 'react-redux';
import store, { RootState } from '../redux/store'
import { Router, useRouter } from 'next/router';
import { NextPageContext, GetServerSideProps } from 'next';

// Create a custom type for the Firestore instance

interface Props {
  nurseId: string;
  employerId: string;
  employerState: { id: string; name: string; /* ...otherProperties */ };
}


export default function ChatRoom({nurseId, employerId, employerState}: Props) {


  const [formValue, setFormValue] = useState('');

  const dummy = useRef<HTMLSpanElement>(null);

  const messagesRef = collection(firestore, 'messages');
  nurseId='1'
  employerId='1'

  const nurseEmployerId = 'nurse'+nurseId+'employer'+employerId //theformat nurse('id')Employer('id')

  const docRef = doc(messagesRef, nurseEmployerId)

  const messagesDocRef = collection(docRef, 'chats')

const qT = query(messagesDocRef, orderBy("createdAt"),
// where("nurse", "==","nurse1")
);
const [ chats, loading ] = useCollectionData(qT);

console.log(chats, 'heeass')



  // getDoc(docRef)
  //   .then((doc) => {
  //     console.log(doc.data(), 'this is data')
  //   })


  // const q = query(messagesRef, orderBy("createdAt"), limit(25), where(user, "==", userObj.id));

  // const q = query(messagesRef, orderBy("createdAt"), limit(25),
  // // where("nurse", "==","nurse1")
  // );


  // const [messages, loadingMessages, error] = useCollectionData(q);




  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // const { uid, photoURL } = auth.currentUser;
    if (!employerState) {
      await addDoc(messagesDocRef, {
        createdAt: serverTimestamp(),
        nurse:formValue
        // uid,
        // photoURL,
      });
    } else {
      await addDoc(messagesDocRef, {
        createdAt: serverTimestamp(),
        employer:formValue
        // uid,
        // photoURL,
      });
    }

    setFormValue('');
    dummy.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className='bg-white text-black'>
      <main>
        {chats &&
          chats.map((msg) => <ChatMessage key={msg.id} message={msg} employerState={employerState}/>)}
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
  const employerState = props.employerState

  // const messageClass = nurse === 'nurse1' ? 'sent' : 'received';
  let messageClass:string;
  let name = 'placeholder'; //this is the recipient
  let text = props.message['nurse'] ? props.message['nurse'] : props.message['employer']
   if ((!employerState && props.message['nurse']) || employerState && props.message['employer']) {
    messageClass = 'sent'
   } else {
    messageClass = 'received'
   }

  return (<>
  {(messageClass === 'sent') ? (
    <h1>you</h1>
  ): <h1></h1>}
    <div className={`message ${messageClass}`}>
      <p>{text}</p>
    </div>
  </>)
}


export const getServerSideProps: GetServerSideProps = async (context) => {
  // replace the following line with a real call to your redux store
  const state: RootState = store.getState()
  const userState = state.user;

  // ======commented out during developmernt =========
  // if (userState.employer === null) {
  //   return {
  //     redirect: {
  //       destination: '/home',
  //       permanent: false,
  //     },
  //   }
  // }

  let nurseId;
  let employerId;
  if (!userState.employer) {
    employerId = context.query.id as string;
    nurseId = userState.user as {id:string};
  } else {
    employerId = userState.user as {id:string};
    nurseId = context.query.id as string;
  }

  return {
    props: {nurseId, employerId, employerState: userState.employer},
  }
}