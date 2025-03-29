import React from 'react'

const CheckLogin = () => {
  const user_id = localStorage.getItem("user_id");
  return user_id && user_id !== 'null';
}

export default CheckLogin;
