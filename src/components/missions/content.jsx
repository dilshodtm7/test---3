import React, { useState } from "react";
import Tiktok from "../../assets/tok.webp";
import Youtube from "../../assets/youtube.png";
import Insta from "../../assets/insta.png";
import Coin from "../../assets/coin-icon.jpg";
import Ton from "../../assets/ton.png";

const content = () => {
  const [selected, setSelected] = useState(null);

  const checkboxes = [
    "5K - 9.9K views = 500",
    "10K - 49.9K views = 1000",
    "50K - 99.9K views = 2000",
    "100K - 499.9K views = 5000",
    "500K - 999.9K views =20000",
    "1M + views = 1000000 ",
  ];
  const handleChange = (index) => {
    setSelected(index);
  };

  const closeContent = () => {
    document.getElementById("zen-bcg").style.display = "none";
  };

  const openContent = () => {
    document.getElementById("zen-bcg").style.display = "flex";
  };

  return (
    <>
      <div className="zen-bcg" id="zen-bcg" style={{ display: "none" }}>
        <div className="zen-container">
          <span className="zen-span">Content</span>
          <button
            className="zen-close"
            id="content-close"
            onClick={closeContent}
          >
            x
          </button>
          <div className="d-overlay-container">
            <p className="d-overlay-p">Add a link to verify </p>
            <span className="d-overlay-span">Link to your content</span>
            <input
              type="text"
              className="d-overlay-input"
              placeholder="Enter content link"
            />
            <hr className="d-overlay-hr" />
            <div className="contents-info">
              <span className="contents-span">Number of views </span>
              <div className="checks">
                <input
                  type="checkbox"
                  className="checks-input"
                  checked={selected === 0}
                  onChange={() => handleChange(0)}
                />
                <span className="checks-span">
                  5K - 9.9K views = <img src={Ton} className="coins" alt="" />{" "}
                  0.2 - 0.5 TON
                </span>
              </div>
              <div className="checks">
                <input
                  type="checkbox"
                  className="checks-input"
                  checked={selected === 1}
                  onChange={() => handleChange(1)}
                />
                <span className="checks-span">
                  10K - 49.9K views = <img src={Ton} className="coins" alt="" />{" "}
                  0.5 - 1 TON
                </span>
              </div>
              <div className="checks">
                <input
                  type="checkbox"
                  className="checks-input"
                  checked={selected === 2}
                  onChange={() => handleChange(2)}
                />
                <span className="checks-span">
                  50K - 99.9K views = <img src={Ton} className="coins" alt="" />{" "}
                  1 - 3 TON
                </span>
              </div>
              <div className="checks">
                <input
                  type="checkbox"
                  className="checks-input"
                  checked={selected === 3}
                  onChange={() => handleChange(3)}
                />
                <span className="checks-span">
                  100K - 499.9K views ={" "}
                  <img src={Ton} className="coins" alt="" /> 3-5 TON
                </span>
              </div>
              <div className="checks">
                <input
                  type="checkbox"
                  className="checks-input"
                  checked={selected === 4}
                  onChange={() => handleChange(4)}
                />
                <span className="checks-span">
                  500K - 999.9K views ={" "}
                  <img src={Ton} className="coins" alt="" /> 5 - 10 TON
                </span>
              </div>
              <div className="checks">
                <input
                  type="checkbox"
                  className="checks-input"
                  checked={selected === 5}
                  onChange={() => handleChange(5)}
                />
                <span className="checks-span">
                  1M + views = <img src={Ton} className="coins" alt="" /> 20 TON
                </span>
              </div>
            </div>
            <button className="d-overlay-check">Submit</button>
          </div>
        </div>
      </div>

      <div className="content-container">
        <div className="content">
          <div className="content-title">Tell others about Winnie Coin</div>
          <div className="content-images">
            <img src={Insta} className="content-img" alt="" />
            <img src={Youtube} className="youtube-icon" alt="" />
            <img src={Tiktok} className="content-img" alt="" />
          </div>
          <hr className="content-hr" />
          <div className="content-text">
            <span className="content-span">And get up to</span>
            <span className="content-span">20 -  <img src={Ton} className="coins" alt="" /> TON</span>
            <span className="content-span">for every video</span>
          </div>
          <hr className="content-hr" />
          <div className="uploads">
            <button className="upload-btn" onClick={openContent}>
              {" "}
              Add Content and Earn
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default content;
