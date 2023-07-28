import React, { useRef, useState, useEffect } from 'react';
import { firestore, auth } from '../auth/firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase from 'firebase/app'; // Import the firebase namespace
import { collection, where, addDoc, query, orderBy, limit, serverTimestamp, doc, getDoc, setDoc } from "firebase/firestore";
import { useSelector } from 'react-redux';
import store, { RootState } from '../redux/store'
import { Router, useRouter } from 'next/router';
import { NextPageContext, GetServerSideProps } from 'next';
import moment from 'moment';

// Create a custom type for the Firestore instance




export default function ChatRoom({ id }: { id: string | undefined }) {
  const userState = useSelector((state: any) => state.user);
  const employerState = userState.employer;

  const [formValue, setFormValue] = useState('');
  const dummy = useRef<HTMLSpanElement>(null);

  const messagesRef = collection(firestore, 'messages');
  let nurseId: any; // Replace with the actual nurse ID
  let employerId: any; // Replace with the actual employer ID

  if (!userState.employer) {
    employerId = id as string;
    nurseId = userState.user.id as {id:string};
  } else {
    employerId = userState.user.id as {id:string};
    nurseId = id as string;
  }

  const nurseEmployerId = `nurse${nurseId}employer${employerId}`;

  const docRef = doc(messagesRef, nurseEmployerId);
  const messagesDocRef = collection(docRef, 'chats');

  // Use useEffect to check if the document exists and create it if it doesn't
  useEffect(() => {
    const checkAndCreateDocument = async () => {
      try {
        // Check if the document exists in Firestore
        const docSnapshot = await getDoc(docRef);
        if (!docSnapshot.exists()) {
          // If the document does not exist, create a new document
          await setDoc(docRef, {
            nurse: nurseId,
            employer: employerId,
           });
          console.log('New document created successfully!');
        }
      } catch (error) {
        console.error('Error checking/creating document:', error);
      }
    };

    checkAndCreateDocument();
  }, [docRef]);

  const qT = query(messagesDocRef, orderBy('createdAt'));
  const [chats, loading] = useCollectionData(qT); // Use the useCollectionData hook here

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!employerState) {
      await addDoc(messagesDocRef, {
        createdAt: serverTimestamp(),
        nurse: formValue,
      });
    } else {
      await addDoc(messagesDocRef, {
        createdAt: serverTimestamp(),
        employer: formValue,
      });
    }

    setFormValue('');
    dummy.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
<div className="bg-white text-black p-4 rounded-lg">
      <div className="flex flex-col h-80 overflow-y-auto">
        {chats &&
          chats.map((msg) => (
            <ChatMessage key={msg.id} message={msg} employerState={employerState} />
          ))}
        <span ref={dummy}></span>
      </div>
      <form onSubmit={sendMessage} className="mt-4">
        <div className="flex">
          <input
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-2 py-1 rounded-l-md border"
          />
          <button
            type="submit"
            disabled={!formValue}
            className={`px-4 rounded-r-md ${
              formValue ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-500 cursor-not-allowed'
            }`}
          >
            Send
          </button>
        </div>
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

  return (<div className='border'>
  {(messageClass === 'sent') ? (
    <h1>you :</h1>
  ): <h1>{!employerState ? 'employer:': 'nurse :'}</h1>}
    <div className={`message ${messageClass}`}>
      <p>{text}</p>
      <p className='text-xs mt-2 italic'>{moment(props.createdAt).fromNow()}</p>
    </div>
  </div>)
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

  // let nurseId;
  // let employerId;
  // if (!userState.employer) {
  //   employerId = context.query.id as string;
  //   nurseId = userState.user as {id:string};
  // } else {
  //   employerId = userState.user as {id:string};
  //   nurseId = context.query.id as string;
  // }

  return {
    props: {}
  }
}