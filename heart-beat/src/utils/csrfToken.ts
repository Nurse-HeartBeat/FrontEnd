import Cookies from "universal-cookie";
import { setCsrf } from '../redux/user';
import store from '../redux/store';


export async function getCsrfToken() {
  const cookies = new Cookies();
  let csrfToken = store.getState().user.csrf

  if (csrfToken) {
    console.log('have csrfToken: ', csrfToken)
    cookies.set('csrftoken', csrfToken);
    return csrfToken;
  }


  const url = process.env.NEXT_PUBLIC_GRAPHQL_CSRF;

  if (!url) {
    // Handle the case when the URL is undefined or not available
    throw new Error("GraphQL CSRF URL is undefined or not available");
  }

  const response = await fetch(url);
  const data = await response.json();
  const newCsrfToken = data.csrfToken;

  store.dispatch(setCsrf(newCsrfToken));
  cookies.set('csrftoken', newCsrfToken);

  return newCsrfToken;
}