import React from 'react';
import TopBar from './TopBar';
import Navbar from './Navbar';


function Header() {
  return (
    <header className="w-full font-sans">
      <TopBar />
         
      <Navbar/>

     
    </header>
  );
}

export default Header;