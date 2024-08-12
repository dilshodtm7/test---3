import React, { useEffect } from "react";
import CoinIcon from "../assets/coin-icon.jpg";
import { ToastContainer, toast } from "react-toastify";

const daily = ({ data, myId, fetchAccountData }) => {
  const updatelastDate = "http://localhost:9090/auth/bydate";

  const dailyBonuses = [
    { id: 1, day: 1, amount: 100 },
    { id: 2, day: 2, amount: 200 },
    { id: 3, day: 3, amount: 300 },
    { id: 4, day: 4, amount: 500 },
    { id: 5, day: 5, amount: 600 },
    { id: 6, day: 6, amount: 800 },
    { id: 7, day: 7, amount: 1000 },
    { id: 8, day: 8, amount: 2000 },
    { id: 9, day: 9, amount: 2200 },
    { id: 10, day: 10, amount: 2400 },
    { id: 11, day: 11, amount: 2600 },
    { id: 12, day: 12, amount: 5000 },
    { id: 13, day: 13, amount: 5200 },
    { id: 14, day: 14, amount: 5400 },
    { id: 15, day: 15, amount: 5600 },
    { id: 16, day: 16, amount: 6000 },
    { id: 17, day: 17, amount: 6200 },
    { id: 18, day: 18, amount: 6400 },
    { id: 19, day: 19, amount: 6600 },
    { id: 20, day: 20, amount: 10000 },
    { id: 21, day: 21, amount: 11000 },
    { id: 22, day: 22, amount: 12000 },
    { id: 23, day: 23, amount: 13000 },
    { id: 24, day: 24, amount: 20000 },
    { id: 25, day: 25, amount: 30000 },
    { id: 26, day: 26, amount: 40000 },
    { id: 27, day: 27, amount: 60000 },
    { id: 28, day: 28, amount: 80000 },
    { id: 29, day: 29, amount: 100000 },
    { id: 30, day: 30, amount: 200000 },
  ];




  


  const dailybonusClaim = () => {
    const lastDate = Number(data.lastdate);
    const currentDate = new Date().getUTCDate();
    const disableButton = () => {
      document.getElementById("daily-bonus-claim").disabled = true;
      document.getElementById("daily-bonus-claim").classList.remove("removes");
    };

    if (lastDate === currentDate - 1) {
      toast.success("Daily bonus claimed");
      updatelastDates();
      disableButton();
      document.getElementById(data.bonuses + 1).disabled = true;
      setTimeout(() => {
        fetchAccountData();
      }, 1000);
    } else if (lastDate === currentDate) {
      toast.error("You can claim daily bonus tomorrow");
      disableButton();
    } else if (lastDate > currentDate - 1) {
      toast.success("Daily bonus claimed");
      updatelastDates0bonus();
      disableButton();
      document.getElementById("1").disabled = true;
      setTimeout(() => {
        fetchAccountData();
      }, 1000);
    } else if (
      (lastDate === 30 && currentDate ===1) ||
      (lastDate === 31 && currentDate === 1)
    ) {
      toast.success("Daily bonus claimed");
      updatelastDates();
      disableButton();
      document.getElementById(data.bonuses + 1).disabled = true;
      setTimeout(() => {
        fetchAccountData();
      }, 1000);
    } else {
      toast.success("Daily bonus claimed");
      updatelastDates0bonus();
      disableButton();
      document.getElementById("1").disabled = true;
      setTimeout(() => {
        fetchAccountData();
      }, 1000);
    }
  };

  const updatelastDates = async () => {
    const currentDate = new Date().getUTCDate();
    const response = await fetch(updatelastDate, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_tg: myId.toString(),
        lastdate: currentDate,
        bonuses: data.bonuses + 1,
        balance_winnie:
          Number(data.balance_winnie) + dailyBonuses[data.bonuses].amount,
      }),
    });

    if (!response.ok) {
      console.error("Failed to update last date and bonus");
    }
  };

  const updatelastDates0bonus = async () => {
    const currentDate = new Date().getUTCDate();

    const response = await fetch(updatelastDate, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_tg: myId.toString(),
        lastdate: currentDate,
        bonuses: 1,
        balance_winnie: Number(data.balance_winnie) + 100,
      }),
    });

    if (!response.ok) {
      console.error("Failed to update last date and bonus");
    }
  };





  const toggleDisplay = (selector, displayStyle) => {
    document.querySelector(selector).style.display = displayStyle;
  };
  const closeDaily = () => toggleDisplay("#daily-bonuses", "none");







  return (
    <>
      <span className="daily-bonus-span">Daily Bonus</span>
      <button className="zen-close" id="content-close" onClick={closeDaily}>
        x
      </button>

      <button
        className="claims-button removes"
        id="daily-bonus-claim"
        onClick={dailybonusClaim}
      >
        Claim
      </button>
      <div className="daily-bonus">
        <div className="daily-bonus-description">
          Claim Winnie Coins every day to earn more coins!
        </div>
        <hr className="daily-bonus-hr" />
        <div className="daily-bonus-buttons">
          {dailyBonuses.map((bonus, index) => (
            <button
              className="claim-button"
              id={bonus.id}
              key={bonus.day}
              disabled={
                data.bonuses == null ||
                data.bonuses == 30 ||
                data.lastdate > new Date().getUTCDate() ||
                data.lastdate < new Date().getUTCDate() - 1
                  ? index < 0
                  : index < data.bonuses
              }
            >
              <span>Day {bonus.day}</span>
              <img src={CoinIcon} className="claim-button-icon" alt="" />
              <span>{bonus.amount.toString().replace(/000$/, " K")}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default daily;
