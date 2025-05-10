import HEPlogo from "../../assets/HEPlogo.png";
import { Link } from "react-router-dom";
import App from "../Loader/Loader.jsx";

const Footer = () => {
  return (
    <>
    <footer  className="bg-yellow-400 text-black p-10 relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <img src={HEPlogo} alt="HealthEdPro Logo" className="w-24 mb-4 rounded-full" />
          <h3 className="font-bold">ACTIVITIES</h3>
          <ul>
            <li><a href="#" className="hover:underline">Welfares</a></li>
            <li><a href="#" className="hover:underline">Collaborations</a></li>
            <li><a href="#" className="hover:underline">Seminars</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold">HELPLINE NO</h3>
          <ul>
            <li><a href="tel:18005990019" className="hover:underline">1800-599-0019</a></li>
            <li><a href="tel:18008914416" className="hover:underline">1-8008914416</a></li>
            <li><a href="tel:8376804102" className="hover:underline">8376804102</a></li>
            <li><a href="tel:9630899002" className="hover:underline">9630899002</a></li>
            <li><a href="tel:8322252525" className="hover:underline">8322252525</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold">QUICK LINKS</h3>
          <ul>
            <li><Link to="/Community" className="hover:underline">Community</Link></li>
            <li><Link to="/Test" className="hover:underline">Assess Yourself</Link></li>
            <li><Link to="/Library" className="hover:underline">Library</Link></li>
            <li><Link to="/Blog" className="hover:underline">Blog</Link></li>
            <li><Link to="/Emergency" className="hover:underline">Emergency</Link></li>
            <li><Link to="/Reviews" className="hover:underline">Reviews</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold">LET'S CHAT</h3>
          <p>Have a support question?</p>
          <button className="bg-orange-500 text-black px-4 py-2 rounded mt-2 hover:bg-orange-600">
            <a href="#/AboutUs">GET IN TOUCH</a>
          </button>
          <h3 className="font-bold mt-4">YOU CALL US</h3>
          <p><a href="tel:012464XXXX" className="hover:underline">0124-64XXXX</a></p>
        </div>
      </div>

      
    </footer>

    <section className="relative bg-yellow-400 h-40">
      <div className="absolute bottom-0 w-full overflow-hidden leading-[0]">
        <svg
          className="relative block w-[calc(100%+1.3px)] h-40"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#fff017" 
            fillOpacity="1"
            d="
              M0,128
              L80,160
              C160,192,320,256,480,266.7
              C640,277,800,235,960,224
              C1120,213,1280,235,1360,245.3
              L1440,256
              L1440,320
              L0,320
              Z
            "
          />
        </svg>
      </div>
      <div className="flex items-center justify-center h-full">
        <h1 className="text-2xl font-light text-black">© 2025. | Designed By: Team Glitch Hunters | All rights reserved.</h1>
      </div>
    </section>
  
  </>
  );

};

export default Footer;
