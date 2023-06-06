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
import ConNurse from '../components/continueNurse';
import ConEmployer from '../components/continueEmployer';

export default function SignUp() {
  const [continueBut, setContinueBut] = useState(false);
  const [password, setPassword] = useState('');
  const [passStatus, setPassStatus] = useState(false);
  const [emailStatus, setEmailStatus] = useState(false);
  const [repass, setRepass] = useState('');
  const [email, setEmail] = useState('');
  const [isEmployer, setIsEmployer] = useState(false);
  const [nurseFirst, setNurseFirst] = useState('');
  const [nurseLast, setNurseLast] = useState('');
  const [license, setLicense] = useState('');
  const [yoe, setyoe] = useState(0);
  const [expire, setExpire] = useState(new Date());
  const [phone, setPhone] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postal, setPostal] = useState('');
  const [gender, setGender] = useState('');
  const [facilityType, setFacilityType] = useState('');
  const [company, setCompany] = useState('')

  //to check whether redux is working
  // const dispatch = useDispatch();
  // const user = useSelector((state:any) => state.user);
  // useEffect(() => {
  //   console.log(user, 'from redux')
  // }, [user])

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleChangeRePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setRepass(e.target.value);
    if (e.target.value === password) {
      setPassStatus(false)
    }
  };

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailStatus(false);
  };

  const employerHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setIsEmployer(!isEmployer)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
  };
  const handleContinue = (e: FormEvent) => {
    e.preventDefault();
    if (email === '') {
      setEmailStatus(true)
    }
    if (password === '') {
      setPassStatus(true)
    } else {
      if (email !== '' && (password === repass)) {
        setContinueBut(!continueBut)
        setPassStatus(false)
      }
    }
    if (password !== repass) {
      setPassStatus(true)
    }
  };

  let nurseObj = {
    nurseFirst, setNurseFirst,
    nurseLast, setNurseLast,
    license, setLicense,
    yoe, setyoe,
    expire, setExpire,
    phone, setPhone,
    address1, setAddress1,
    address2, setAddress2,
    postal, setPostal,
    gender, setGender,
    handleSubmit,
    continueBut, setContinueBut,
    state, setState,
    city, setCity
  }

  let employerObj = {
    company, setCompany,
    address1, setAddress1,
    address2, setAddress2,
    city, setCity,
    state, setState,
    postal, setPostal,
    phone, setPhone,
    handleSubmit,
    setFacilityType,
    continueBut, setContinueBut,
    facilityType
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Nav />
      <div className="flex lg:flex-row flex-col flex-grow items-center justify-items-center">
        <div className="flex lg:w-1/2">
          <form onSubmit={handleContinue} className="mx-auto lg:my-0 my-20" >
            {!continueBut && (
              <div style={{ width: "300px" }}>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700">Email:</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={handleChangeEmail}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 text-black" />
                </div>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700">Password:</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={handleChangePassword}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 text-black" />
                </div>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700">Re-enter Password:</label>
                  <input
                    type="password"
                    id="re-password"
                    value={repass}
                    onChange={handleChangeRePassword}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 text-black" />
                </div>
                <h1 className="flex text-text flex-row">Are you an employer?
                  <RadioBut checked={isEmployer} onChange={employerHandler} label={''} />
                </h1>
                {passStatus && (
                  <li className='' style={{ color: 'red' }}>The password and re-enter password is not the same</li>
                )}
                {emailStatus && (
                  <li className='' style={{ color: 'red' }}>Please input the email</li>
                )}
                <button type="submit" className="flex px-4 py-2 text-white bg-accent rounded-md hover:bg-primary focus:outline-none focus:ring focus:ring-blue-500 mt-5">
                  Continue
                </button>
              </div>
            )}
            {(continueBut && !isEmployer) && (
              <ConNurse obj={nurseObj} />
            )}
            {(continueBut && isEmployer) && (
              <ConEmployer obj={employerObj} />
            )}
          </form>
        </div>
        <Image src={loginCartoon} alt={''} className='flex' style={{ width: '600px', marginRight: '5%', height: '500px' }} />
      </div>
      <Footer />
    </div>
  )
}