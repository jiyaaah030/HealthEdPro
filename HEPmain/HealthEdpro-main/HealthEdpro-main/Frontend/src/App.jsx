import React from 'react'
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Link } from "react";
const AboutUs = lazy(() => import('./pages/AboutUs.jsx'));
const Admin = lazy(()=> import('./pages/Admin.jsx'))
const Blog = lazy(() => import('./pages/Blog.jsx'));
const Chatbot = lazy(() => import('./pages/Chatbot.jsx'));
const Community = lazy(() => import('./pages/Community.jsx'));
const CreateBlog = lazy(() => import('./pages/CreateBlog.jsx'));
const Emergency = lazy(() => import('./pages/Emergency.jsx') )
const Home = lazy(() => import('./pages/Home.jsx'));
const Library = lazy(() => import('./pages/Library.jsx'));
const TestRouter = lazy(() => import('./TestRouter.jsx'));
const Login_Signup = lazy(()=> import('./pages/Login_Signup.jsx'));
const Reviews = lazy(()=> import('./pages/Reviews.jsx'))
const Test = lazy(()=> import('./pages/Test.jsx'))
const Welfare = lazy(()=> import('./pages/Welfare.jsx'))
const Calculation = lazy(()=> import('./pages/Calculation.jsx'))
const Loader = lazy(()=> import('./components/Loader/Loader.jsx'))
import { useState, useEffect } from "react";
import Layout from "./components/Navbar/Layout.jsx";

const App = () => {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay (or use your actual loading logic)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route element={<Layout/>}>
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/Blog" element={<Blog />} />
          <Route path="/Chatbot" element={<Chatbot />} />
          <Route path="/Community" element={<Community />} />
          <Route path="/CreateBlog" element={<CreateBlog />} />
          <Route path="/Emergency" element={<Emergency />} />
          <Route path="/" element={<Home />} />
          <Route path="/Library" element={<Library />} />
          <Route path="/Login_Signup" element={<Login_Signup />} />
          <Route path="/Reviews" element={<Reviews />} />
          <Route path="/Test" element={<Test />} />
          <Route path="/Welfare" element={<Welfare />} />
          <Route path="/Calculation" element={<Calculation />} />
          <Route path='/Test/*' element={<TestRouter />} />
          </Route>
        </Routes>
      </Router>
      <>
      <div>
      {loading ? (
        <Loader onComplete={() => setLoading(false)} />
      ) : (<></>)}
      </div>
    </>
    </>
  )
}

export default App



