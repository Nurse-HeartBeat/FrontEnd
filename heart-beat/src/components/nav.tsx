import React, { useState, useRef, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '../../public/logo-transparent-background.png';
import { useSelector, useDispatch } from 'react-redux';
import {auth as Auth} from '../auth/firebase';
import { signOut } from "firebase/auth";
import { useRouter } from 'next/router';
import { setUser, setEmployer } from '../redux/user';
import { FaBell} from 'react-icons/fa';
import { firestore, auth } from '../auth/firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, where, addDoc, query, orderBy, limit, serverTimestamp, doc, getDoc, setDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { info } from 'console';
import moment from 'moment';
import {InfoType} from '../utils/types';

export default function Nav() {
  const [showLinks, setShowLinks] = useState(false);
  const [alertModal, setAlertModal] = useState(false)
  const linksContainerRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLUListElement>(null);
  const reduxState = useSelector((state: any) => state.user); //need for photo

  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };

  useEffect(() => {
    const linksHeight = linksRef.current?.getBoundingClientRect().height;
    if (showLinks && linksHeight !== undefined) {
      if (linksContainerRef.current) {
        linksContainerRef.current.style.height = `${linksHeight + 15}px`;
      }
    } else {
      if (linksContainerRef.current) {
        linksContainerRef.current.style.height = '0px';
      }
    }
  }, [showLinks]);

  let userId: any = 'nurseID' //placeholder
  if (reduxState.employer === null) {
    // userId = null
  } else {
    userId = (reduxState.employer === false ? 'nurse'+reduxState.user['id'] : 'employer'+reduxState.user['id'])
  }
  const alertRef = collection(firestore, 'alert')
  const docRef = doc(alertRef, userId)
  // let readStatus = collection(docRef, 'status')
  let infoField = collection(docRef, 'info')

  const qInfo = query(infoField, orderBy('createdAt'))
  // const qRStatus = query(readStatus)

  const [info] = useCollectionData(qInfo);
  // const [status] = useCollectionData(qRStatus);
  const [status, setStatus] = useState(true)

  onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists()) {
      setStatus(docSnap.data().status) ; // access the status field
      console.log(status);
    } else {
      console.log("No such document!");
    }
  }, (error) => {
    console.error("Error fetching document: ", error);
  });


  useEffect(() => {
    const checkAndCreateDocument = async () => {
      try {
        // Check if the document exists in Firestore
        const docSnapshot = await getDoc(docRef);
        if (!docSnapshot.exists()) {
          // If the document does not exist, create a new document
          await setDoc(docRef, {
            status:true
           });
          console.log('New document created successfully!');
        }
      } catch (error) {
        console.error('Error checking/creating document:', error);
      }
    };
    if (reduxState.employer !== null) {
      checkAndCreateDocument();
    }

  }, [docRef])



  return (
    <nav>
      <div className='nav-center'>
        <div className='nav-header'>
          <Link href="/home" className="text-white text-lg font-bold">
            <Image src={Logo} alt="Logo" className="flex h-10 w-auto" />
          </Link>
          <button className='nav-toggle' onClick={toggleLinks}>
            <FaBars />
          </button>
        </div>
        <div className='links-container' ref={linksContainerRef}>
          <ul className='links' ref={linksRef}>
            <li><Link href="/jobs" className="text-white text-lg mb-2">Jobs</Link></li>
            {!reduxState.user ?
              <>
                <li><Link href="/login" className="text-white text-lg mb-2">Login</Link></li>
                <li><Link href="/signup" className="text-white text-lg mb-2">Signup</Link></li>
              </> :
              <>
                <li className='m-5'>
                  <div className="relative">
                    <FaBell className='scale-150 transition-colors duration-500 ease-in-out text-white hover:text-purple-500 cursor-pointer'
                    onClick={async() => {
                      updateDoc(docRef, {
                        status:true
                      })
                      setAlertModal(!alertModal)
                    }}/>
                    {!status && (
                    <div className="absolute top-[-5px] right-[-5px] h-3 w-3 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">!</div>
                    )
                    }
                    {alertModal && (
                      <AlertDropdown info={info as InfoType[]}/>
                    )
                    }
                  </div>
                </li>
                <li><ProfileDropdown /></li>
              </>
            }
          </ul>
        </div>
      </div>
    </nav>
  );
}

// Assuming the ProfileDropdown component is defined somewhere else.
const ProfileDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dispatch = useDispatch()
  const reduxEmployer = useSelector((state: any) => state.user.employer)

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    console.log(reduxEmployer)
  };

  let router = useRouter();

  return (
    <div className="mx-3 hover:mx-5 transition-all duration-300">
      <button className={`w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center hover:ring-2 ring-blue-500`}
        onClick={toggleDropdown}
      >
        <div
          className={`w-full h-full rounded-full ${isDropdownOpen ? 'ring-2 ring-blue-500' : ''
            }`}
        >
          <Image src='/profilePicHolder.jpeg' alt="Profile" width={200} height={200} className="w-full h-full rounded-full" />
        </div>
      </button>

      {isDropdownOpen && (
        <div className="absolute left-0 md:right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-lg md:ml-auto">
          <button
            className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
            onClick={() => {
              const redirectRoute = '/profile';
              router.push(redirectRoute);
            }}
          >Profile</button>
          {reduxEmployer && (
            <>
              <button
                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                onClick={() => {
                  const redirectRoute = '/employer/addJob';
                  router.push(redirectRoute);
                }}
              >Add Jobs</button>
              <button
                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                onClick={() => {
                  const redirectRoute = '/myJobs';
                  router.push(redirectRoute);
                }}
              >Manage Jobs</button>
            </>

          )}
          {!reduxEmployer && (
            <button
              className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
              onClick={() => {
                const redirectRoute = '/myJobs';
                router.push(redirectRoute);
              }}
            >My jobs</button>
          )}

          <button
            className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
            onClick={() => {
              signOut(Auth)
                .then(() => {
                  const redirectRoute = '/home';
                  router.push(redirectRoute);
                  dispatch(setUser(null))
                  dispatch(setEmployer(null))
                })
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

const AlertDropdown = ({info}:{info?: InfoType[]}) => {
  // console.log(props.info)
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const scrollToBottom = () => {
      if (listRef.current) {
        console.log('Scroll Height:', listRef.current.scrollHeight);
        listRef.current.scrollTop = listRef.current.scrollHeight;
      }
    };

    scrollToBottom();
  }, [info]);

  let timestamp = (time:any) => {
    return time.seconds * 1000 + time.nanoseconds / 1000000
  }
  return (
    <div className="fixed right-0 mt-2 w-48 bg-white rounded-md shadow-lg h-[500px] z-10 border border-gray-300 text-black">
      <h3 className="text-xl font-bold text-black mb-4 px-4">Alerts</h3>
      <ul className='flex flex-col h-[80%] overflow-y-auto' ref={listRef}>
        {/* Your list of alerts */}
        {info?.map((eachAlert,index) => {
          return (
            <li key={index} className='flex flex-col border border-gray-300'>
              <h1 className='flex mt-3 ml-3'>{eachAlert['info']}</h1>
              <p className="flex text-xs mt-2 italic mb-3 justify-center">{moment(timestamp(eachAlert['createdAt'])).fromNow()}</p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

