
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";
import Winnie from "../assets/maynings.gif";
import WinnieJpg from "../assets/winni.png";
import Calendar from "../assets/calendar.webp";
import Cup from "../assets/cup-icon.png";
import withIcon from "../assets/loader5.gif";
import Spin from "../assets/spin.png";
import { ToastContainer, toast } from "react-toastify";
import Tournament from "./tournament.jsx";
import Daily from "./daily.jsx";

const Home = ({ data,myId,userData, loading, fetchAccountData,tournament }) => {
  const updateStatusWithBanalce = "http://localhost:9090/auth/bybalance";
  const updateStatus = "http://localhost:9090/auth/updatestatus";

  const navigate = useNavigate();




  
  

  const currentDate = new Date();
  currentDate.setHours(currentDate.getHours() + 2);
  const newPostDate = currentDate.toISOString();

  if (loading) {
    const lastDate = data.lastdate;
    const currentDate = new Date().getUTCDate();
    if (lastDate === currentDate) {
      
      setTimeout(() => {
        const dailyBonusButton = document.getElementById("daily-bonus-claim");
        dailyBonusButton.disabled = true;
        dailyBonusButton.classList.remove("removes");
      }, 1000);
    } else {
      setTimeout(() => {
        const dailyBonusButton = document.getElementById("daily-bonus-claim");
        dailyBonusButton.disabled = false;
        dailyBonusButton.classList.add("removes");
      }, 1000);
    }
  }

  const notifyStart = () =>
    toast.success("Started mining", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const updateStatusWithBalance = async () => {
    const response = await fetch(updateStatusWithBanalce, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_tg: myId.toString(),
        balance_winnie: data.balance_winnie + 200,
        date: newPostDate,
      }),
    });
  };

  const updateStatuses = async () => {
    const response = await fetch(updateStatus, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_tg: myId.toString(),
        status: "active",
        date: newPostDate,
      }),
    });
  };
  
  const startMining = () => {
    const titleElement = document.getElementById("title-farming");
    const timeElement = document.getElementById("time");
    if (!titleElement || !timeElement) return;
         if(data.status === null){  
    updateStatuses();
    setTimeout(fetchAccountData, 1000);
    titleElement.innerText = "Started";
    timeElement.innerText = "Pending...";
    setTimeout(notifyStart, 2000);
     } else{
    titleElement.innerText = "Started";
    timeElement.innerText = "Pending...";
    updateStatusWithBalance();
    setTimeout(fetchAccountData, 1000);
    setTimeout(notifyStart, 2000);
     }
  };


  useEffect(() => {
   if(loading){
    let myname = false;
    const updateUI = () => {
      const currentDate = new Date();
      const storedDate = new Date(data.date);
      const status = data.status;
      const timeElement = document.getElementById("time");
      const btnElement = document.getElementById("btn");
      const titleElement = document.getElementById("title-farming");
      const imageElement = document.querySelector("#imageID");
      if (!timeElement || !btnElement || !titleElement || !imageElement) return;
      if (status === "active") {
        const diffMs = storedDate - currentDate;
        
        if (diffMs > 0) {
          timeElement.innerText = `${Math.floor(
            diffMs / (1000 * 60 * 60)
          )}h : ${Math.floor(
            (diffMs % (1000 * 60 * 60)) / (1000 * 60)
          )}m : ${Math.floor((diffMs % (1000 * 60)) / 1000)}s`;
          btnElement.disabled = true;
          titleElement.innerText = "Mining";
          btnElement.classList.add("disabled");
          imageElement.setAttribute("src", Winnie);
        } else {
          imageElement.setAttribute("src", WinnieJpg);
          btnElement.disabled = false;
          btnElement.classList.remove("disabled", "activated");
          if (!myname) {
            titleElement.innerText = "Claim";
            timeElement.innerText = "Claim 200 W";
            myname = true;
          }
        }
      } else {
        imageElement.setAttribute("src", WinnieJpg);
        timeElement.innerText = "Start";
        titleElement.innerText = "Farming";
        btnElement.disabled = false;
      }
    };

    const intervalId = setInterval(updateUI, 1000);
    const timeoutId = setTimeout(updateUI, 100);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
   }
  }, [data]);

  // open daily and tournament
  const toggleDisplay = (selector, displayStyle) => {
    document.querySelector(selector).style.display = displayStyle;
  };
  const openDaily = () => toggleDisplay("#daily-bonuses", "flex");
  const openTournament = () => {
    toggleDisplay("#tournament", "flex");
localStorage.setItem("tournament", true);
    
  }

  return (
    <>
      {loading === false ? (
        <>
          <div className="loading-container">
          <img src={withIcon} className="loader-img" alt="" />

          <div class="loader"></div>
          </div>
         
         
        </>
      ) : (
        <>
          <div className="open-daily" onClick={openDaily}>
            <img src={Calendar} className="daily-bonus-img" alt="" />
          </div>
          <div className="open-tournament" onClick={openTournament}>
            <img src={Cup} className="daily-bonus-img" alt="" />
          </div>

          <div className="open-spin" onClick={() => navigate("/bonus")}>
            <img src={Spin} className="daily-bonus-img" alt="" />
          </div>


          <div
            className="tournament"
            id="tournament"
            style={{ display: "none" }}
          >
            <div className="tournament-container">
              <Tournament data={tournament} loading={loading} />
            </div>
          </div>

          

          <div
            className="daily-bonuses"
            id="daily-bonuses"
            style={{ display: "none" }}
          >
            <div className="daily-bonus-container">
              <Daily myId={myId} data={data} fetchAccountData={fetchAccountData} />
            </div>
          </div>

          <div className="body-balance">
            <ToastContainer />
            <div className="ton-balance">
              <div className="account-name">
                <div className="name">
                  <div className="name-title">Welcome</div>
                  <div className="name-subtitle">{userData?.first_name || userData?.username || "User" }</div>
                </div>
              </div>
            </div>
            <div className="my-balance">
              <img src={WinnieJpg} alt="Coin Icon" className="home-img" />
              <span className="balance">
                {data?.balance_winnie.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") || 0}
              </span>
            </div>

            <div className="mining-container">
              <img
                src={WinnieJpg}
                id="imageID"
                alt="Mining Animation"
                className="minion-img"
              />
            </div>
            <button id="btn" className="mayning" onClick={startMining}>
              <span className="title" id="title-farming">
                Farming
              </span>
              <span id="time" className="time">
                Start
              </span>
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
