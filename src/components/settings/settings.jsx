import React, { useEffect, useState } from "react";
import "./settings.css";
import { Wheel } from 'react-custom-roulette'
import withIcon from "../../assets/loader5.gif";


const Settings = ({data,loading,myId,fetchAccountData}) => {
  const [result, setResult] = useState(null);
  const [spinning, setSpinning] = useState(false);

  const newspin = "https://myname-6g8f.onrender.com/auth/newspin";

  // Define the roulette wheel numbers and styles
  const bonus = [
    { option: '500', style: { backgroundColor: '#1E2C3A', textColor: 'white' } },
    { option: '1000', style: { backgroundColor: 'rgb(211, 182, 17)', textColor: 'black' } },
    { option: '2000', style: { backgroundColor: '#1E2C3A', textColor: 'white' } },
    { option: '3000', style: { backgroundColor: 'rgb(211, 182, 17)', textColor: 'black' } },
    { option: '4000', style: { backgroundColor: '#1E2C3A', textColor: 'white' } },
    { option: '5000', style: { backgroundColor: 'rgb(211, 182, 17)', textColor: 'black' } },
    { option: '6000', style: { backgroundColor: '#1E2C3A', textColor: 'white' } },
    { option: '7000', style: { backgroundColor: 'rgb(211, 182, 17)', textColor: 'black' } },
  ];

  // Simulate a spin
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  
 



  
   
    
   
  const currentDate = new Date();
   currentDate.setHours(currentDate.getHours() + 8);
  const newPostDate = currentDate.toISOString();



  const updateSpin = async () => {
    const response = await fetch(newspin, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_tg: myId.toString(),
        balance_winnie:Number(data.balance_winnie) + Number(result),
        spin_date: newPostDate,
      }),
    });
  };



  const handleSpinClick = () => {
    if (!mustSpin) {
      document.getElementById("spin-btn").disabled = true;
      document.getElementById("spin-btn").innerText = "Wait";
      const newPrizeNumber = Math.floor(Math.random() * bonus.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
      setResult(bonus[newPrizeNumber].option);
    } else {
      
     document.getElementById("overs-roulete").style.display = "flex";
  
  
    }
  }









  useEffect(() => {
    if(loading){
      let for2 = false;
     let myname = false;
     const updateUI = () => {
       const currentDate = new Date();
       const storedDate = new Date(data.spin_date);
       const spinBtn = document.getElementById("spin-btn");
       if (data.spin_date) {
         const diffMs = storedDate - currentDate;       
         if (diffMs > 0) {
          spinBtn.innerText = `${Math.floor(
             diffMs / (1000 * 60 * 60)
           )}h : ${Math.floor(
             (diffMs % (1000 * 60 * 60)) / (1000 * 60)
           )}m : ${Math.floor((diffMs % (1000 * 60)) / 1000)}s`;
           spinBtn.disabled = true;
  
         } else {
          if(!myname){
             myname = true;
             spinBtn.innerText = "Free Spin";
             spinBtn.disabled = false;
             console.log('1');
             
   
          }
           
         }
       } else {

        if(for2 === false) {
          for2 = true;
          spinBtn.innerText = "Free Spin";
          spinBtn.disabled = false;
        }
  
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
  












 const posted = () => {
  
  document.getElementById("spin-btn").disabled = true;
  document.getElementById("overs-roulete").style.display = "none";
  updateSpin(); 

  console.log('flex box');
   
  setTimeout(() => {
    fetchAccountData();
  }, 2000);
  

}








  

  return (
    <>
   <div className="overs-roulete" id="overs-roulete" style={{display: 'none'}}>
   <div className="claim-roulete">
   <span className="claim-got">You got</span>
      <span className="claim-span">{result?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} Winnie Coin</span>
      <button className="claim-btn" onClick={posted}>Claim Bonus</button>
    </div>
   </div>
    




      <div className="setting-container">
        <div className="account-info">
          <div className="name">
           <span className="name-span">Spin to win guaranteed prizes. You have  a free spin every 12 hours.</span>
          </div>
        </div>

{loading === false ? (<>
  <>
  <>
          <img src={withIcon} className="loader-img" alt="" />
          <div class="loader"></div>
        </>

        </>
    </>
    
  ):(
    <>
    <div className="roulete-container">
    <Wheel
      mustStartSpinning={mustSpin}
      prizeNumber={prizeNumber}
      data={bonus}
      onStopSpinning={() => {
        setMustSpin(false);
        document.getElementById("overs-roulete").style.display = "flex";
      }}
    />
      </div> 
  
      <button className="spin-btn" id="spin-btn" onClick={handleSpinClick}> Free spin</button>
    </>
  )
}
     
      </div>
    </>
  );
};



export default Settings;
