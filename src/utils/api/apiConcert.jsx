import axios from "axios";

const baseURL = "http://localhost:5000";

export const getConcerts = () =>
  new Promise((resolve, reject) => {
    axios
      .get(`${baseURL}/concert`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });  

export const getRoles = () =>
  new Promise((resolve, reject) => {
    axios
      .get(`${baseURL}/role`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const createUser = (user) =>
  new Promise((resolve, reject) => {
    axios
      .post(`${baseURL}/user`, {user})
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const getUser = (_id) =>
  new Promise((resolve, reject) => {
    axios
      .get(`${baseURL}/user/${_id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const updateUser = (user) =>
  new Promise((resolve, reject) => {
    axios
      .put(`${baseURL}/user/${user._id}`, user)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  })

export const deleteUser = (_id) =>
  new Promise((resolve, reject) => {
    axios
      .delete(`${baseURL}/user/${_id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const getUsers = () =>
  new Promise((resolve, reject) => {
    axios
      .get(`${baseURL}/user`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const getUserAutologin = (_id) =>
  new Promise((resolve, reject) => {
    axios
      .get(`${baseURL}/user/autoLogin`, { _id })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const getUserLogin = (email, password) =>
  new Promise((resolve, reject) => {
    axios
      .post(`${baseURL}/user/login`, { email, password })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
