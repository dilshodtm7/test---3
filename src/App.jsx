"use client";
import WebApp from "@twa-dev/sdk";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./body/home.jsx";
import Footer from "./footer/footer.jsx";
import Wallet from "./components/wallet/wallet.jsx";
import Setting from "./components/settings/settings.jsx";
import Task from "./components/missions/task.jsx";
import Invite from "./components/invite/invite.jsx";

import "./App.css";

function App() {
  const getMyAccount = "https://myname-6g8f.onrender.com/auth/login";
  const myId = WebApp.initDataUnsafe.user.id
  const [userData, setUserData] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [getalltasks, setGetalltasks] = useState(null);
  const [tournament, setTournament] = useState(null);

  

  useEffect(() => {
    if (WebApp.initDataUnsafe.user) {
      setUserData(WebApp.initDataUnsafe.user);
   }
  }, []);


  



  const fetchAccountData = async () => {
    try {
      const response = await fetch(getMyAccount, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_tg: myId.toString(),
        }),
      });

      if (response.ok) {
        console.log("Account data fetched successfully");
        const data = await response.json();
        console.log(data);
      
        setTournament(data.tournament);
        setData(data.retrieve);
        setGetalltasks(data);
        setLoading(true);
      } else {
        console.error("Failed to fetch account data");
      }
    } catch (error) {
      console.error("Error fetching account data:", error);
    }
  };

  useEffect(() => {
    fetchAccountData();
  }, []);
   console.log(myId);
  


  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Body
             myId={myId}
              data={data}
              loading={loading}
              userData={userData}
              fetchAccountData={fetchAccountData}
              tournament={tournament}
            />
          }
        />
        <Route path="/airdrop" element={<Wallet data={data}  loading={loading} />} />
        <Route path="/bonus" element={<Setting data={data} loading={loading} myId={myId} fetchAccountData={fetchAccountData} />} />
        <Route
          path="/task"
          element={
            <Task
              data={getalltasks}
              myId={myId}
              fetchTasks={fetchAccountData}
              loading={loading}
            />
          }
        />
        <Route path="/invite" element={<Invite />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

