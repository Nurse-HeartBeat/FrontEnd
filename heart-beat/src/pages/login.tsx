import Nav from '../components/nav';
import { useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/user';
import { useEffect } from 'react';
import Auth from '../auth/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import Footer from '../components/footer';
import Image from 'next/image';
import loginCartoon from '../../public/loginCartoon.png';
import RadioBut from '../components/radioBut';

export default function Login() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [employer, setEmployer] = useState(false);



  //to check whether redux is working
  // const dispatch = useDispatch();
  // const user = useSelector((state:any) => state.user);
  // useEffect(() => {
  //   console.log(user, 'from redux')
  // }, [user])

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const employerHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmployer(!employer)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    signInWithEmailAndPassword(Auth, email, password)
      .then(({ user }) => {
        // dispatch(setUser({ email, password })); //to check whether the redux is working
        console.log(user.uid) //obtaining the id
      })
      .catch((err: any) => console.log(err));
  };
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Nav />
      <div className="flex lg:flex-row flex-col flex-grow items-center">
        <div className="flex w-1/2">
          <form onSubmit={handleSubmit} className="mx-auto lg:my-0 my-20" style={{ }}>
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
              <label htmlFor="name" className="block text-gray-700">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handleChangePassword}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 text-black"
              />
            </div>
            <h1 className="flex text-text flex-row">Are you an employer?
              <RadioBut checked={employer} onChange={employerHandler} label={''}/>
            </h1>
            <button
              // onClick={handleForgotCredentials}
              className="mt-5 text-blue-500 underline italic">
              Forgot Email/Password?
            </button>
            <button type="submit" className="flex px-4 py-2 text-white bg-accent rounded-md hover:bg-primary focus:outline-none focus:ring focus:ring-blue-500 mt-5">
              Submit
            </button>
          </form>
        </div>
        <Image src={loginCartoon} alt={''} className='flex' style={{ width: "600px", marginRight: "5%", height: "500px" }} />
      </div>
      <Footer />
    </div>
  )
}