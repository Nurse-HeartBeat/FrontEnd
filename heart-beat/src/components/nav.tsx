import Link from 'next/link';
import Head from 'next/head'
import Image from 'next/image';
import Logo from '../../public/logo-transparent-background.png';
import ProfilePicHolder from '../../public/ProfilePicHolder.jpeg';
import { useSelector } from 'react-redux';
import Auth from '../auth/firebase';
import { signOut } from "firebase/auth";
import { useState } from 'react';
import { Router, useRouter } from 'next/router';

export default function Nav() {
  const reduxState = useSelector((state:any) => state.user); //need for photo
  return (
    <header className="p-5 bg-primary">
      <Head>
        <title>HeartBeat | One Heart Beat, Bridging Nursing's Gap</title>
      </Head>
      <nav className="flex md:flex-row flex-col md:justify-between items-center">
        <div>
          <Link href="/home" className="text-white text-lg font-bold">
            <Image src={Logo} alt="Logo" className="flex h-10 w-auto" />
          </Link>
        </div>
        <div className="flex md:space-x-4 md:flex-row flex-col md:justify-between items-start">
          <Link href="/jobs" className="text-white text-lg">Jobs</Link>
          {!reduxState.user ? (
            <>
              <Link href="/login" className="text-white text-lg">Login</Link>
              <Link href="/signup" className="text-white text-lg">Signup</Link>
            </>
          ) :
          (
            <ProfileDropdown />
          )}

        </div>
      </nav>
    </header>
  );
}

const ProfileDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  let router = useRouter();

  return (
    <div className="relative">
      <button
       className={`w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center hover:ring-2 ring-blue-500`}
      onClick={toggleDropdown}
      >
        <div
          className={`w-full h-full rounded-full ${
            isDropdownOpen ? 'ring-2 ring-blue-500' : ''
          }`}
        >
          <Image src={ProfilePicHolder} alt="Profile"
            className="w-full h-full rounded-full"
          />
        </div>
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-lg">
          <button
            className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
            onClick={() => {
              signOut(Auth)
                .then(() => {
                  const redirectRoute = '/home';
                  router.push(redirectRoute);
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
