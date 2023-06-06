import Nav from '../components/nav';
import bgImage from '../../public/bgImage.png';
import { FaCalendarAlt, FaComments, FaMapMarkerAlt } from 'react-icons/fa';
import Slideshow from '../components/slideShow';
import Footer from '../components/footer';
import { Router, useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';


export default function Home() {

  let router = useRouter();
  const reduxState = useSelector((state:any) => state.user);

  useEffect(() => {
    if (reduxState.user) {
      const redirectRoute = '/jobs';
      router.push(redirectRoute);
      // console.log('router: ', router)
    }
  }, [reduxState.user, router])

  let login = () => {
    const redirectRoute = '/login';
    router.push(redirectRoute);
  }

  let signup = () => {
    const redirectRoute = '/signup';
    router.push(redirectRoute);
  }


  return (
    <div>
      <Nav />
      <div className="bg-cover bg-center h-90 flex flex-col items-start text-white"
        style={{ backgroundImage: `url('/bgImage.png')` }}>
        <div className="md:w-1/2 mt-20 ml-20 mr-20">
          <h1 className="text-5xl font-bold">Welcome to The HeartBeat</h1>
          <p className="text-2xl font-bold mt-20">The ultimate web platform connecting nurses with employers, offering real-time chat, mapping functionality, and seamless authentication experiences.</p>
        </div>
        <div className="w-2/3 text-lg mt-10  mb-10 flex flex-col md:flex-row items-center justify-start">
          <button className="bg-white hover:bg-accent hover:text-white text-black font-bold py-2 px-10 w-40 rounded-full ml-20 my-5" onClick={login}>
            Log in
          </button>
          <button className="bg-white hover:bg-accent hover:text-white text-black font-bold py-2 px-10 w-40 rounded-full ml-20 my-5" onClick={signup}>
            Sign up
          </button>
        </div>
      </div>


      <div className="bg-white grid grid-cols-1 md:grid-cols-3 gap-8 py-10 lg:px-20 px-4 text-black">
        <div className="bg-white rounded-lg p-8 shadow-md mx-10">
          <div className="flex items-center justify-center mb-4">
            <FaCalendarAlt className="w-6 h-6 mr-2" />
          </div>
          <div className="flex items-center justify-center mb-4">
            <h2 className="text-2xl font-bold">Job Booking</h2>
          </div>
          <p className="text-lg">
            Find and book nursing job opportunities conveniently through our platform.
          </p>
        </div>
        <div className="bg-white rounded-lg p-8 shadow-md mx-10">
          <div className="flex items-center justify-center mb-4">
            <FaComments className="w-6 h-6 mr-2" />
          </div>
          <div className="flex items-center justify-center mb-4">
            <h2 className="text-2xl font-bold">Real-time Chat</h2>
          </div>
          <p className="text-lg">
            Communicate and collaborate with employers and colleagues in real-time chat.
          </p>
        </div>
        <div className="bg-white rounded-lg p-8 shadow-md mx-10">
          <div className="flex items-center justify-center mb-4">
            <FaMapMarkerAlt className="w-6 h-6 mr-2" />
          </div>
          <div className="flex items-center justify-center mb-4">
            <h2 className="text-2xl font-bold">Mapping</h2>
          </div>
          <p className="text-lg">
            Utilize our mapping feature to locate job opportunities and plan your work schedule.
          </p>
        </div>
      </div>

      <Slideshow />
      <Footer />
    </div>
  )
}
