import Nav from '../components/nav';
import { useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/user';
import { useEffect } from 'react';
import Auth from '../auth/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import Footer from '../components/footer';
import Image from 'next/image';
import linkedinCartoon from '../../public/linkedinCartoon.png';

export default function Login() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

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
      Login Placeholder
      <div className="flex flex-row flex-grow items-center">
        <div className="flex w-1/2">
          <form onSubmit={handleSubmit} className="mx-auto" style={{ marginLeft: "30%", width: "300px" }}>
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
            <button type="submit" className="px-4 py-2 text-white bg-primary rounded-md hover:bg-primary-light focus:outline-none focus:ring focus:ring-blue-500">
              Submit
            </button>
          </form>
        </div>
        <Image src={linkedinCartoon} alt={''} className='flex' style={{ width: "600px", marginRight: "10%", height: "500px" }} />
      </div>
      <Footer />
    </div>
  )
}