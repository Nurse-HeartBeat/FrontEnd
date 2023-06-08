import React, { useState, useRef, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '../../public/logo-transparent-background.png';
import ProfilePicHolder from '../../public/ProfilePicHolder.jpeg';
import { useSelector } from 'react-redux';
import Auth from '../auth/firebase';
import { signOut } from "firebase/auth";
import { useRouter } from 'next/router';

export default function Nav() {
  const [showLinks, setShowLinks] = useState(false);
  const linksContainerRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLUListElement>(null);
  const reduxState = useSelector((state: any) => state.user); //need for photo

  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };

  useEffect(() => {
    const linksHeight = linksRef.current.getBoundingClientRect().height;
    if (showLinks) {
      linksContainerRef.current.style.height = `${linksHeight}px`;
    } else {
      linksContainerRef.current.style.height = '0px';
    }
  }, [showLinks]);

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
              <li><ProfileDropdown /></li>
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

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  let router = useRouter();

  return (
    <div className="">
      <button className={`w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center hover:ring-2 ring-blue-500`}
        onClick={toggleDropdown}
      >
        <div
          className={`w-full h-full rounded-full ${isDropdownOpen ? 'ring-2 ring-blue-500' : ''
            }`}
        >
          <Image src={ProfilePicHolder} alt="Profile" className="w-full h-full rounded-full" />
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
