import React from "react";
import "./invite.css";
import { FaCopy } from "react-icons/fa";
import { FaUserGraduate } from "react-icons/fa";
import Tonup from "../../assets/winni.png";
import Ton from "../../assets/ton.png";

const invite = () => {
  const copyText = () => {
    var copyText = document.querySelector(".invite-link-input");
    copyText.select();
    document.execCommand("copy");
  };

  return (
    <>
      <div className="invite-container">
        <div className="invite">
          <div className="invite-text">
            <div className="invite-text-title">Invite Friends!</div>
            <div className="invite-text-subtitle">
              <span className="invite-text-span">
                You and your friends will receive bonuses
              </span>
            </div>
          </div>
          <div className="invite-link">
            <div className="invite-link-title">Referal link</div>
            <div class="copy-container">
              <input
                disabled
                type="text"
                className="invite-link-input"
                value="https://tonswap.io"
                readOnly
              />
              <button onClick={copyText} className="copy-btn">
                <FaCopy />
              </button>
            </div>
            <div className="invite-buttons">
              <button className="invite-btn" onClick={copyText}>
                Invite Friend
              </button>
            </div>
          </div>
        </div>
        <hr className="invite-hr" />
      </div>
      <div className="bonus-ref">
        <span className="claims-title">Your Referral Bonuses</span>
      </div>
      <div className="claims">
        <div className="referal-claims">
          <div className="referal-balance">
            <img src={Tonup} alt="" className="referal-balance-img" />
            <div className="referal-balance-text">5 000 000 W</div>
          </div>
          <hr className="claim-hr" />
          <div className="referal-balance">
            <img src={Ton} alt="" className="referal-balance-img" />
            <div className="referal-balance-text">100 T</div>
          </div>
        </div>
      </div>
      <div className="friends-list">
        <div className="friends-list-title">Friends</div>
        <div className="friends-list-container">
          <div className="friends-list-item">
            <div className="image">
              <FaUserGraduate className="referal-icon" />
              <div className="name">Kimdur</div>
            </div>
            <div className="DIV">
              <div className="referal-balance">
                <img src={Ton} alt="" className="referal-balance-img" />
                <div className="referal-balance-text">0.001 TON</div>
              </div>
            </div>
          </div>
          <hr className="friends-list-hr" />

          <div className="friends-list-item">
            <div className="image">
              <FaUserGraduate className="referal-icon" />
              <div className="name">Kimdur</div>
            </div>
            <div className="DIV">
              <div className="referal-balance">
                <img src={Ton} alt="" className="referal-balance-img" />
                <div className="referal-balance-text">0.001 TON</div>
              </div>
            </div>
          </div>
          <hr className="friends-list-hr" />

          <div className="friends-list-item">
            <div className="image">
              <FaUserGraduate className="referal-icon" />
              <div className="name">Kimdur</div>
            </div>
            <div className="DIV">
              <div className="referal-balance">
                <img src={Ton} alt="" className="referal-balance-img" />
                <div className="referal-balance-text">0.001 TON</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default invite;
