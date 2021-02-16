export const sendRequest = (url, options) => {
  return fetch(url, options)
    .then((res) => {
      if (!res.ok) {
        throw new Error();
      }
      if (res.status < 400) {
        return res;
      } else {
        return Promise.reject(res);
      }
    })
    .then((res) => {
      if (res && res.status !== 204) {
        return res.json();
      } else {
        return res;
      }
    })
    .catch((err) => {
      console.log('err :>> ', err);
      return Promise.reject();
    });
};
