import Nav from '../components/nav';
import { useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setEmployer } from '../redux/user';
import { useEffect } from 'react';
import {auth as Auth} from '../auth/firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import Footer from '../components/footer';
import Image from 'next/image';
import signUpCartoon from '../../public/signUpCartoon.png';
import RadioBut from '../components/radioBut';
import ConNurse from '../components/continueNurse';
import ConEmployer from '../components/continueEmployer';
import { Router, useRouter } from 'next/router';
import {CREATE_EMPLOYER, CREATE_NURSE, client} from '../utils/graphQL'
// import { gql, from, useMutation, ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import {formatDate} from '../utils/formatDateYYMMDD'
// import { EDGE_UNSUPPORTED_NODE_APIS } from 'next/dist/shared/lib/constants';


export default function SignUp() {
  const [continueBut, setContinueBut] = useState(false);
  //shared properties
  const [password, setPassword] = useState('');
  const [passStatus, setPassStatus] = useState(false);
  const [emailStatus, setEmailStatus] = useState(false);
  const [repass, setRepass] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postal, setPostal] = useState<number | null>(null);
//nurse
  const [nurseFirst, setNurseFirst] = useState('');
  const [nurseLast, setNurseLast] = useState('');
  const [license, setLicense] = useState('');
  const [yoe, setyoe] = useState(0);
  const [expire, setExpire] = useState(new Date());
  const [gender, setGender] = useState('');
//employer-company
  const [isEmployer, setIsEmployer] = useState(false);
  const [facilityType, setFacilityType] = useState('');
  const [company, setCompany] = useState('');

  //to check whether redux is working
  // const dispatch = useDispatch();
  // const user = useSelector((state:any) => state.user);
  // useEffect(() => {
  //   console.log(user, 'from redux')
  // }, [user])
  const dispatch = useDispatch()

  let router = useRouter();
  const reduxState = useSelector((state:any) => state.user);
  useEffect(() => {
    if(reduxState.user) {
      const redirectRoute = '/jobs';
      router.push(redirectRoute);
    }
  }, [reduxState.user, router])

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

  // const [createEmployer, { data }] = useMutation(CREATE_EMPLOYER);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here

    createUserWithEmailAndPassword(Auth, email, password)
      .then(async (data1) => {
        let auth = (data1.user as any).uid
        if (isEmployer) {
          let companyProfileObj = {
            email, phone, address1, address2, city, state, postal, type: facilityType, companyName:company, auth
          }
          // createEmployer({variables: companyProfileObj});

        await client.mutate({
            mutation: CREATE_EMPLOYER,
            variables: companyProfileObj,
            context: {
              credentials: 'include', // Add this line
            },
          })
          .then((data: any) => {
            let userProfile = data.data['createEmployerModel']['employerModel']
            dispatch(setUser(userProfile))
            dispatch(setEmployer(true))
          })
          .catch(err => console.log(err))
          //send to the backend
        } else {
          let formatedExp = formatDate(String(expire))
          let nurseProfileObj = {
            firstName: nurseFirst, lastName: nurseLast, license, yearOfExperience: yoe, expiration: formatedExp, gender, email, phone,
            address1, address2, city, state, postal, auth
          }
          console.log(auth, 'this is the auth')
          // console.log(nurseProfileObj, 'nurse po')
          await client.mutate({
            mutation: CREATE_NURSE,
            variables: nurseProfileObj,
            context: {
              credentials: 'include', // Add this line
            },
          })
          .then((data: any) => {
            let userProfile = data.data['createNurseModel']['nurseModel']
            dispatch(setUser(userProfile))
            dispatch(setEmployer(false))
          })
          .catch(err => console.log(err))
          //send to the backend
        }
      })
      .catch((err) => {
        window.alert(err)
      })
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
                <button type="submit" className="flex px-4 py-2 text-white rounded-md bg-primary-light hover:bg-primary focus:outline-none focus:ring focus:ring-blue-500 mt-5">
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
        <Image src={signUpCartoon} alt={''} className='flex' style={{ width: "50%", marginRight: "5%" }} />
      </div>
      <Footer />
    </div>
  )
}