import React from 'react'
import Navbar from "../components/Navbar/Navbar.jsx";
import ComponentTest from "../components/Test/Componenttest.jsx";
import TestSection1 from "../components/Test/TestSection1.jsx";
import TestSection2 from "../components/Test/TestSection2.jsx";
import TestSection3 from "../components/Test/TestSection3.jsx";
import TestSection4 from "../components/Test/TestSection4.jsx";
import TestSection5 from "../components/Test/TestSection5.jsx";

import Footer from "../components/Footer/Footer.jsx";

const Test = () => {
  return (
    <>
      <Navbar/>
      <ComponentTest/>
      <TestSection1/>
      <TestSection2/>
      <TestSection3/>
      <TestSection4/>
      <TestSection5/>
      <Footer/>
    </>
  )
}

export default Test
