import React, { useEffect, useState } from 'react';
import './header.css';

function Header() {

    const [nav, setHeader] = useState("header");


    const listenScrollEvent = event => {
        if (window.scrollY < 73) {
          return setHeader("nav");
        } else if (window.scrollY > 70) {
          return setHeader("nav__black");
        }
      };

      useEffect(() => {
        window.addEventListener("scroll", listenScrollEvent);
    
        return () => window.removeEventListener("scroll", listenScrollEvent);
      }, []);


    return (
        <div className = {nav}>

            <img className = "nav__logo"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/170px-Netflix_2015_logo.svg.png"
                alt="Netflix Logo"
            />

            <img className = "nav__avtar"
                src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/366be133850498.56ba69ac36858.png"
                alt="Netflix Logo"
            />
            
        </div>
    )
}

export default Header;