import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
const Footer = () => {
  return (
    <div>
      <h3>Private message up by Sycatle</h3>
      <section>
        <ul>
          <li>USEFUL LINKS</li>
          <li>About</li>
          <li>Services</li>
          <li>Contact</li>
          <li>Blog</li>
        </ul>
        <ul>
          <li>Contacts</li>
          <li>
            <address>1234, Code avenue, France</address>
          </li>
          <FontAwesomeIcon icon={faFacebook} />{" "}
          <FontAwesomeIcon icon={faTwitter} />{" "}
          <FontAwesomeIcon icon={faInstagram} />{" "}
          <FontAwesomeIcon icon={faGithub} />{" "}
        </ul>
        <div>
          <label htmlFor="sub">NEWS LETTER</label>
          <input type="text" id="sub" placeholder="Your Email Adress" />
          <button>SUBSCRIBE NOW</button>
        </div>
      </section>
    </div>
  );
};

export default Footer;
