import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux';
import store from '../redux/store';
import 'tailwindcss/tailwind.css';
import { onAuthStateChanged } from "firebase/auth";
import {auth as Auth} from '../auth/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setEmployer } from '../redux/user';
import {QUERY_EMPLOYER, QUERY_NURSE, client} from '../utils/graphQL'


export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
          <Component {...pageProps} />
          <UserStatusHandle />
    </Provider>
  )
}

function UserStatusHandle () {
  const dispatch = useDispatch();
  const userStatus = Auth.onAuthStateChanged(async (user) => {
    if (user) {
      console.log(user)
      await client.query({
        query: QUERY_EMPLOYER,
        variables: {auth: user.uid},
        context: {
          credentials: 'include', // Add this line
        },
      }).then((data: any) => {
        let userProfile = data.data.employer
        console.log(userProfile, 'herree')
        dispatch(setUser(userProfile))
        dispatch(setEmployer(true))
      }).catch(async() => {
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
      })
      console.log(user)
    }
  })
  return(<></>)
}
