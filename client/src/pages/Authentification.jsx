import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
const Authentification = () => {
  return (
    <div>
      <section>
        <div>
          <h2>Sign In</h2>
          <form action="" method="post">
            <label htmlFor="identifier">
              {" "}
              <FontAwesomeIcon icon={faUser} />{" "}
            </label>
            <input type="text" id="identifier" placeholder="Identifiant" />

            <label htmlFor="">
              <FontAwesomeIcon icon={faLock} />
            </label>
            <input type="password" name="" id="" placeholder="Password" />
            <label htmlFor="username">
              {" "}
              <FontAwesomeIcon icon={faUser} />{" "}
            </label>
            <input type="text" id="username" placeholder="Username" />
            <label htmlFor="email">
              {" "}
              <FontAwesomeIcon icon={faEnvelope} />{" "}
            </label>
            <input type="email" id="email" placeholder="Email" />

            <button type="submit">Submit</button>
          </form>
        </div>
        <div>
          <h1>Private Message App</h1>
          <p>Coming soon , App under construction</p>
        </div>
      </section>
    </div>
  );
};

export default Authentification;
