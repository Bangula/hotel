// import store from '@state/store';

export function authRequest(config) {
  console.log(config);
  const token = localStorage.getItem("jwtToken");
  if (token) {
    config.headers.Authorization = "Bearer " + token;
  }
  return config;
}

export const authResponse = [
  function(response) {
    return response;
  },
  function(error) {
    if (401 === error.response.status) {
      //   store.dispatch({ type: 'DEAUTHENTICATE_USER' });
      //   localStorage.removeItem('access_token_name');
      //   localStorage.removeItem('user');
    }
    return Promise.reject(error);
  }
];
