import React from 'react'
import Navbar from "../components/Navbar/Navbar.jsx";
import CommunityDisc from "../components/Community/Community.jsx";
import Cards from "../components/Community/Cards.jsx";
import RedirectButton from "../components/Community/Redirect_Button.jsx";
import Footer from "../components/Footer/Footer.jsx";

const Community = () => {
  return (
    <>
      <Navbar/>
      <CommunityDisc/>
      <Cards/>
      <RedirectButton/>
      <Footer/>
    </>
  )
}

export default Community
