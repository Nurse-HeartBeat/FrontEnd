import Nav from '../components/nav';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setEmployer } from '../redux/user';
import { useEffect } from 'react';
import {auth as Auth} from '../auth/firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import Footer from '../components/footer';
import Image from 'next/image';
import loginCartoon from '../../public/loginCartoon.png';
import RadioBut from '../components/radioBut';
import { Router, useRouter } from 'next/router';
import {QUERY_EMPLOYER, QUERY_NURSE, client} from '../utils/graphQL'
import { Dispatch } from 'redux';



export default function Login() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isEmployer, setIsEmployer] = useState(false);
  const [isForgot, setIsForgot] = useState(false);

  const dispatch : Dispatch <any> = useDispatch()

  const reduxState = useSelector((state:any) => state.user);

  const router = useRouter();
  useEffect(() => {
    if(reduxState.user) {
      const redirectRoute = '/jobs';
      router.push(redirectRoute);
    }
  }, [reduxState.user, router])

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const employerHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setIsEmployer(!isEmployer)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    signInWithEmailAndPassword(Auth, email, password)
      .then(async ({ user }) => {
        if (isEmployer) {
          //query the employer
          await client.query({
            query: QUERY_EMPLOYER,
            variables: {auth: user.uid},
            context: {
              credentials: 'include', // Add this line
            },
          })
          .then((data: any) => {
            let userProfile = data.data.employer
            console.log(userProfile, 'herree')
            dispatch(setUser(userProfile))
            dispatch(setEmployer(true))
          })
          .catch(err => console.log(err))

        } else {
          //query the nurse
          await client.query({
            query: QUERY_NURSE,
            variables: {auth: user.uid},
            context: {
              credentials: 'include', // Add this line
            },
          })
          .then((data: any) => {
            let userProfile = data.data.nurse
            dispatch(setUser(userProfile))
            dispatch(setEmployer(false))
          })
          .catch(err => console.log(err))
        }
      })
      .catch((err: any) => console.log(err));
  };
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Nav />
      <div className="flex lg:flex-row flex-col flex-grow items-center">
        <div className="flex w-1/2">
          <form onSubmit={handleSubmit} className="mx-auto lg:my-0 my-20" style={{ width: "300px" }}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleChangeEmail}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 text-black"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handleChangePassword}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 text-black"
              />
            </div>
            <h1 className="flex text-text flex-row">Are you an employer?
              <RadioBut checked={isEmployer} onChange={employerHandler} label={''}/>
            </h1>
            <button
              onClick={() => setIsForgot(true)}
              className="mt-5 text-blue-500 underline italic">
              Forgot Password?
            </button>
            <button type="submit" className="flex px-4 py-2 text-white rounded-md  bg-primary-light hover:bg-primary focus:outline-none focus:ring focus:ring-blue-500 mt-5">
              Submit
            </button>
          </form>
          {isForgot && (
            <ForgotModal close={setIsForgot}/>
          )}
        </div>
        <Image src={loginCartoon} alt={''} className='flex' style={{ width: "50%", marginRight: "5%" }} />
        {/* <Image src={loginCartoon} alt={''} className='flex' style={{ width: "600px", marginRight: "5%", height: "500px" }} /> */}
      </div>
      <Footer />
    </div>
  )
}
//  interface CloseProps {
//   setIsForgot: (value: boolean) => void;
//  }
const ForgotModal: React.FC<{close: (value: boolean) => void;}> =  ({close}) => {
  const [email, setEmail] = useState('');

  const closeModal = () => {
    close(false)
    setEmail('');
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Logic for handling the form submission, such as sending a password reset email
    console.log('Forgot email/password form submitted:', email);
    closeModal();
  };

  return (
    <div>
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white rounded p-4 max-w-sm mx-auto relative">
            <button
              className="absolute top-2 right-2 text-gray-600"
              onClick={closeModal}
            >
              &times;
            </button>
            <h2 className="text-lg font-bold mb-4 text-black">Input your email</h2>
            <form onSubmit={handleSubmit}>
              <label className="block mb-2">Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border border-gray-300 rounded px-2 py-1 mb-4 text-black"
              />
              <button
                type="submit"
                className="flex px-4 py-2 text-white rounded-md  bg-primary-light hover:bg-primary focus:outline-none focus:ring focus:ring-blue-500 mt-5"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
    </div>
  );
};