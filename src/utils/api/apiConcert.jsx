import axios from "axios";

const baseURL = "http://localhost:5000";

/**
 * Mostrar, crear, borrar y actualizar conciertos
 * ***********************************************************************************************************
 */
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

export const getConcert = (_id) =>
  new Promise((resolve, reject) => {
    axios
      .get(`${baseURL}/concert/${_id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const getRemainingTickets = (_id) =>
  new Promise((resolve, reject) => {
    axios
      .get(`${baseURL}/concert/remainingTickets/${_id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const createConcert = (concert) =>
  new Promise((resolve, reject) => {
    axios
      .post(`${baseURL}/concert`, { concert })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const deleteConcert = (_id) =>
  new Promise((resolve, reject) => {
    axios
      .delete(`${baseURL}/concert/${_id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const updateConcert = (concert) =>
  new Promise((resolve, reject) => {
    axios
      .put(`${baseURL}/concert/${concert._id}`, concert)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });

/**
 * Mostrar, crear, actualizar y borrar usuarios
 ************************************************************************************************************************
 */
export const createUser = (user) =>
  new Promise((resolve, reject) => {
    axios
      .post(`${baseURL}/user`, { user })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const registerUser = (user) =>
  new Promise((resolve, reject) => {
    axios
      .post(`${baseURL}/user/register`, { user })
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
  });

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

/**
 * mostrar roles
 * @returns
 */

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

/**
 * autologin de usuarios
 * @param {*} _id
 * @returns
 */

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

/**
 * login de usuario
 * @param {*} email
 * @param {*} password
 * @returns
 */

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

/**
 * crear una venta
 * @param {*} sale
 * @returns
 */
export const createSale = (sale) =>
  new Promise((resolve, reject) => {
    axios
      .post(`${baseURL}/sale`, { sale })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });

  export const getSales = () =>
  new Promise((resolve, reject) => {
    axios
      .get(`${baseURL}/sale`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });

  export const getFilterSale = (userId) => 
    new Promise((resolve, reject) => {
      axios
        .post(`${baseURL}/sale/filter`, {userId})
        .then((resp) => {
          resolve(resp.data)
        })
        .catch((err) => {
          reject(err);
        });
    })