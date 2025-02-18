import React from 'react'
import { useLocation } from 'react-router-dom';
function Customerhome() {
  const location=useLocation();
  const username=location.state?.username;
  return (
    <>
    <h1>welcome {username}</h1>
    </>
  )
}

export default Customerhome;