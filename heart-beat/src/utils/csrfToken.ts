import Cookies from "universal-cookie";
import { setCsrf } from '../redux/user';
import store from '../redux/store';


export async function getCsrfToken() {
  const cookies = new Cookies();
  let csrfToken = store.getState().user.csrf

  if (csrfToken) {
    cookies.set('csrftoken', csrfToken);
    return csrfToken;
  }

  const response = await fetch('http://localhost:8000/csrf/');
  const data = await response.json();
  const newCsrfToken = data.csrfToken;

  store.dispatch(setCsrf(newCsrfToken));
  cookies.set('csrftoken', newCsrfToken);

  return newCsrfToken;
}