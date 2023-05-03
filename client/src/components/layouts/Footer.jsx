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
      <footer className="bg-white p-5">
        <section className="flex flex-col justify-center">
          <ul className="flex flex-col relative text-xl space-y-2 sm:space-y-5">
            <li>
              <h2 className="text-2xl">Contacts</h2>
            </li>
            <li>
              <address className="underline underline-offset-4">
                1234, Code avenue, France
              </address>
            </li>
            <div className="flex justify-center sm:justify-start space-x-10 my-5">
              <FontAwesomeIcon
                icon={faFacebook}
                className="h-9 sm:h-8 duration-200"
              />{" "}
              <FontAwesomeIcon
                icon={faTwitter}
                className="h-9 sm:h-8 duration-200"
              />{" "}
              <FontAwesomeIcon
                icon={faInstagram}
                className="h-9 sm:h-8 duration-200"
              />{" "}
              <FontAwesomeIcon
                icon={faGithub}
                className="h-9 sm:h-8 duration-200"
              />{" "}
            </div>
          </ul>
          <div className="mt-5 w-full">
            <label
              htmlFor="subscribe-newsletter"
              className="flex flex-col justify-center"
            >
              <input
                className="py-2 px-4 w-3/4 rounded-md border border-black valid:text-green outline-none"
                type="email"
                id="subscribe-newsletter"
                placeholder="Your Email Adress"
              />
              <button className="bg-primary text-white w-48 px-4 py-3 my-5 rounded-lg text-md">
                Subscribe newsletter
              </button>
            </label>
          </div>
        </section>
        <h3 className="text-center font-karla text-gray-900">
          Whispee up by Execan
        </h3>
      </footer>
    </>
  );
};

export default Footer;
