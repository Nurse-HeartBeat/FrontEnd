import Nav from '../components/nav';
import { useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/user';
import {useEffect} from 'react';

export default function Login () {
  const dispatch = useDispatch();
  const user = useSelector((state:any) => state.user);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  //to check whether redux is working
  useEffect(() => {
    console.log(user, 'from redux')
  }, [user])

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    dispatch(setUser({email, password})) //have to integrate with firebase
  };
  return (
    <div>
      <Nav />
      Login Placeholder
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
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
      <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500">
        Submit
      </button>
    </form>
    </div>
  )
}