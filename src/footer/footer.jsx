import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BiTachometer } from "react-icons/bi";
import { FaWallet } from "react-icons/fa";
import { ImUsers } from "react-icons/im";
import { BiTask } from "react-icons/bi";
import { FaGift } from "react-icons/fa6";

import "./style.css";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <footer>
        <div className="footer-container">
          <div className="d-flex-footer">
          <button
              className={`footer ${location.pathname === "/" ? "active" : ""}`}
              onClick={() => navigate("/")}
            >
              <BiTachometer className="icon" />
              <span className="footer-text">Home</span>
            </button>
            <button
              className={`footer ${
                location.pathname === "/bonus" ? "active" : ""
              }`}
              onClick={() => navigate("/bonus")}
            >
              <FaGift  className="icon" />
              <span className="footer-text">Bonus</span>
            </button>
            <button
              className={`footer ${
                location.pathname === "/task" ? "active" : ""
              }`}
              onClick={() => navigate("/task")}
            >
              <BiTask className="icon" />
              <span className="footer-text">Tasks</span>
            </button>
            <button
              className={`footer ${
                location.pathname === "/invite" ? "active" : ""
              }`}
              onClick={() => navigate("/invite")}
            >
              <ImUsers className="icon" />
              <span className="footer-text">Friends</span>
            </button>
            <button
              className={`footer ${
                location.pathname === "/airdrop" ? "active" : ""
              }`}
              onClick={() => navigate("/airdrop")}
            >
              <FaWallet className="icon" />
              <span className="footer-text">Airdrop</span>
            </button>
            
            
           
            
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
