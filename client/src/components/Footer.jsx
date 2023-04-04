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
    <>
      <div className="relative w-screen h-1 bg-gradient-to-b from-transparent to-neutral-300"></div>
      <div className="bg-neutral-300 p-5">
        <section className="flex justify-center space-x-24">
          <ul className="relative text-xl space-y-5">
            <li>Contacts</li>
            <li>
              <address className="underline underline-offset-4">1234, Code avenue, France</address>
            </li>
            <div className="flex space-x-10 mt-3">
              <FontAwesomeIcon icon={faFacebook} className="h-8" />{" "}
              <FontAwesomeIcon icon={faTwitter} className="h-8" />{" "}
              <FontAwesomeIcon icon={faInstagram} className="h-8" />{" "}
              <FontAwesomeIcon icon={faGithub} className="h-8" />{" "}
            </div>
          </ul>
          <div className="relative right-10">
            <label htmlFor="sub">
              <input className="py-2 px-4 rounded-md border border-black valid:text-green outline-none" type="email" id="sub" placeholder="Your Email Adress" />
              <button className="bg-blue-800 w-44 px-5 py-2 mt-5 rounded-lg ml-5 text-sm">SUBSCRIBE NOW</button>
            </label>
          </div>
        </section>
        <h3 className="font-karla text-gray-900">Private message up by Execan</h3>
      </div>
    </>
  );
};

export default Footer;
