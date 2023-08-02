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
import {sendAlert} from '../utils/alert';

// Create a custom type for the Firestore instance




export default function ChatRoom({ id }: { id: string | undefined }) {
  const userState = useSelector((state: any) => state.user);
  const employerState = userState.employer;

  const encodeMessage = (message: string) => {
    // Replace newlines with a special character (e.g., '|') to avoid Firestore issues
    return message.replace(/\n/g, '|');
  };


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

  useEffect(() => {
    if (dummy.current) {
      dummy.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chats]);

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!employerState) {

      await addDoc(messagesDocRef, {
        createdAt: serverTimestamp(),
        nurse: encodeMessage(formValue),
      });

      sendAlert(false, employerId, userState.user.firstName + ' ' + userState.user.lastName +' sent you a message', serverTimestamp())

    } else {
      await addDoc(messagesDocRef, {
        createdAt: serverTimestamp(),
        employer: encodeMessage(formValue),
      });
      sendAlert(true, nurseId, userState.user.companyName+' sent you a message', serverTimestamp())
    }


    setFormValue('');
    dummy.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
<div className="flex flex-col bg-white text-black p-4 w-screen h-[100%]">
      <div className="flex flex-col flex-grow h-80 overflow-y-auto">
        {chats &&
          chats.map((msg) => (
            <ChatMessage key={msg.id} message={msg} employerState={employerState} />
          ))}
        <span ref={dummy}></span>
      </div>
      <form onSubmit={sendMessage} className="">
      <div className="flex w-full bottom-0 z-10 border-t-[1px solid lightgray] ml-[-5px] pb-[30px] bg-#fafafa">
          <textarea
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.shiftKey) {
                e.preventDefault();
                console.log(formValue)
                setFormValue((prevValue) => prevValue + '\n');
              }
            }}
            placeholder="Type your message..."
            className="flex-1 px-2 py-1 rounded-l-md border resize-y overflow-y-auto"
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
  const employerState = props.employerState;
  const messageClass = (props.message.employer && employerState) || (props.message.nurse && !employerState) ? 'sent' : 'received'; // Use the message data to determine if the message is sent or received
  const name = messageClass === 'sent' ? 'me' : !employerState ? 'employer' : 'nurse'; // Determine the name based on the sender

  const decodeMessage = (message: string) => {
    // Decode the special character back to newlines when displaying the message
    return message.replace(/\|/g, '\n');
  };

  let text = props.message.employer || props.message.nurse;
  text = decodeMessage(text)
  let timestamp: any = new Date();


  if (props.message.createdAt) {
    timestamp = props.message.createdAt.seconds * 1000 + props.message.createdAt.nanoseconds / 1000000;
  }

  return (
  <div className={``}>
    <div className="flex-grow flex items-center">
      <h1 className='float-left items-center'>{name}</h1>
    </div>
    <div className={`message ${messageClass} flex p-2 border m-2 rounded-md shadow-md items-center ${messageClass === 'sent' ? 'bg-lightP-light ml-10' : 'mr-10 bg-background'}`}>
      <pre style={{ wordBreak: 'break-word' }}>{text}</pre>
      <p className="text-xs mt-2 italic">{moment(timestamp).fromNow()}</p>
    </div>
  </div>

  );
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