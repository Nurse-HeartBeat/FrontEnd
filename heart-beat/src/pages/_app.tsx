import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux';
import store from '../redux/store';
import 'tailwindcss/tailwind.css';
import { onAuthStateChanged } from "firebase/auth";
import Auth from '../auth/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/user';


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
  const userStatus = Auth.onAuthStateChanged((user) => {
    if (user) {
      dispatch(setUser(user))
    } else {
      dispatch(setUser(null))
    }
  })
  return(<></>)
}
