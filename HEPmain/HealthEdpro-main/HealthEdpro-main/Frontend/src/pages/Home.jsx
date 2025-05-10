import React from 'react'
import { lazy } from "react";
const Navbar = lazy(() =>import  ("../components/Navbar/Navbar.jsx") )
const Hero = lazy(()=> import ("../components/Hero/Hero.jsx"))
const ContainerChatbot = lazy(()=>import ("../components/Container/ContainerChatbot.jsx")) 
const ContainerAboutUs = lazy(()=> import("../components/Container/ContainerAboutUs.jsx"))
const ContainerAboutChatbot = lazy (()=> import("../components/Container/ContainerChatbotDisc.jsx"))
const ContainerLibrary = lazy(()=> import("../components/Container/ContainerLibrary.jsx"))
const ContainerCommunity = lazy(()=> import("../components/Container/ContainerCommunity.jsx"))
const ContainerTest = lazy(()=> import("../components/Container/ContainerTest.jsx")) 
const ContainerAssess = lazy(()=> import("../components/Container/ContainerAssess.jsx")) 
const Footer = lazy(()=> import("../components/Footer/Footer.jsx"))



function Home() {
  return (
    <>
    <Navbar />
    <Hero/>
    <ContainerChatbot />
    <ContainerAboutUs />
    <ContainerAboutChatbot/>
    <ContainerLibrary />
    <ContainerCommunity />
    <ContainerTest />
    <ContainerAssess/>
    <Footer/>
    </>
  )
}

export default Home
