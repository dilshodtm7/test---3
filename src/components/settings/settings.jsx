import React, { useEffect, useState } from "react";
import "./settings.css";
import { Wheel } from "react-custom-roulette";
import withIcon from "../../assets/loader5.gif";

const Settings = ({ data, loading, myId, fetchAccountData }) => {
  const [result, setResult] = useState(null);
  const [spinning, setSpinning] = useState(false);

  const newspin = "http://localhost:9090/auth/newspin";

  // Define the roulette wheel numbers and styles
  const bonus = [
    {
      option: "500",
      style: { backgroundColor: "#1E2C3A", textColor: "white" },
    },
    {
      option: "1000",
      style: { backgroundColor: "rgb(211, 182, 17)", textColor: "black" },
    },
    {
      option: "2000",
      style: { backgroundColor: "#1E2C3A", textColor: "white" },
    },
    {
      option: "3000",
      style: { backgroundColor: "rgb(211, 182, 17)", textColor: "black" },
    },
    {
      option: "4000",
      style: { backgroundColor: "#1E2C3A", textColor: "white" },
    },
    {
      option: "5000",
      style: { backgroundColor: "rgb(211, 182, 17)", textColor: "black" },
    },
    {
      option: "6000",
      style: { backgroundColor: "#1E2C3A", textColor: "white" },
    },
    {
      option: "7000",
      style: { backgroundColor: "rgb(211, 182, 17)", textColor: "black" },
    },
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
        balance_winnie: Number(data.balance_winnie) + Number(result),
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
  };

  useEffect(() => {
    if (loading) {
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
            if (!myname) {
              myname = true;
              spinBtn.innerText = "Free Spin";
              spinBtn.disabled = false;
              console.log("1");
            }
          }
        } else {
          if (for2 === false) {
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

    console.log("flex box");

    setTimeout(() => {
      fetchAccountData();
    }, 2000);
  };









  const correctAnswer = 'DILSHOD';
  const [inputs, setInputs] = useState(Array(7).fill(''));
  const [status, setStatus] = useState(Array(7).fill('')); // Status of each input ('default', 'written', 'correct', 'incorrect')
  const [message, setMessage] = useState(''); // Message for incomplete answers
  const [activeButton, setActiveButton] = useState(null); // Track the active button

  const handleClick = (letter) => {
    setActiveButton(letter); // Set active button for styling
    const firstEmptyIndex = inputs.findIndex(input => input === '');
    if (firstEmptyIndex !== -1) {
      const newInputs = [...inputs];
      newInputs[firstEmptyIndex] = letter;
      setInputs(newInputs);

      const newStatus = [...status];
      newStatus[firstEmptyIndex] = 'written'; // Mark as written (yellow)
      setStatus(newStatus);
    }
    setTimeout(() => setActiveButton(null), 100); // Reset active button style after a short delay
  };

  const handleBackspace = () => {
    setActiveButton('backspace'); // Set active button for styling
    const lastFilledIndex = inputs.slice().reverse().findIndex(input => input !== '');
    if (lastFilledIndex !== -1) {
      const actualIndex = inputs.length - 1 - lastFilledIndex;
      const newInputs = [...inputs];
      const newStatus = [...status];
      newInputs[actualIndex] = '';
      newStatus[actualIndex] = 'default'; // Reset to white if backspace is pressed
      setInputs(newInputs);
      setStatus(newStatus);
    }
    setTimeout(() => setActiveButton(null), 100); // Reset active button style after a short delay
  };

  const checkAnswer = () => {
    // Check if all fields are filled
    if (inputs.includes('')) {
      setMessage('Please fill all fields.');
      return;
    }

    // Check if the answer is correct
    const newStatus = inputs.map((input, index) => {
      if (input === '') return 'default'; // No input, keep white
      return input === correctAnswer[index] ? 'correct' : 'incorrect'; // Check if correct or incorrect
    });

    // Set the message based on the result
    if (newStatus.every(status => status === 'correct')) {
      setMessage('All letters are correct!');
    } else {
      setMessage('Some letters are incorrect.');
    }

    setStatus(newStatus);
  };

  return (
    <>
      <div
        className="overs-roulete"
        id="overs-roulete"
        style={{ display: "none" }}
      >
        <div className="claim-roulete">
          <span className="claim-got">You got</span>
          <span className="claim-span">
            {result?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} Winnie
            Coin
          </span>
          <button className="claim-btn" onClick={posted}>
            Claim Bonus
          </button>
        </div>
      </div>









      <div className="daily-question">
      <div className="question-text">
        <span>Question: What is the name of the most famous British author?</span>
      </div>
      
      <div className="crossword">
        {inputs.map((input, index) => (
          <input 
            type="text" 
            key={index} 
            className={`crossword-input ${status[index]}`} 
            value={input} 
            readOnly 
          />
        ))}
      </div>

      <div className="crossword-buttons">
        {['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'].map((letter, index) => (
          <button 
            key={index} 
            className={`crossword-btn ${activeButton === letter ? 'active' : ''}`} 
            onClick={() => handleClick(letter.toUpperCase())}
          >
            {letter}
          </button>
        ))}
      </div>

      <div className="crossword-buttons">
        {['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'].map((letter, index) => (
          <button 
            key={index} 
            className={`crossword-btn ${activeButton === letter ? 'active' : ''}`} 
            onClick={() => handleClick(letter.toUpperCase())}
          >
            {letter}
          </button>
        ))}
        <button 
          className={`crossword-btn ${activeButton === 'backspace' ? 'active' : ''}`} 
          onClick={handleBackspace}
        >
          ◀
        </button>
      </div>

      <div className="crossword-buttons">
        {['z', 'x', 'c', 'v', 'b', 'n', 'm'].map((letter, index) => (
          <button 
            key={index} 
            className={`crossword-btn ${activeButton === letter ? 'active' : ''}`} 
            onClick={() => handleClick(letter.toUpperCase())}
          >
            {letter}
          </button>
        ))}
        <button className="crossword-btn-enter" onClick={checkAnswer}>Enter</button>
      </div>

      {message && <div className="message">{message}</div>}
    </div>










     <hr className="line" />
      <div className="setting-container">
        <div className="account-info">
          <div className="name">
            <span className="name-span">
              Spin to win guaranteed prizes. You have a free spin every 8
              hours.
            </span>
          </div>
        </div>

        {loading === false ? (
          <>
            <>
              <>
                <img src={withIcon} className="loader-img" alt="" />
                <div class="loader"></div>
              </>
            </>
          </>
        ) : (
          <>
            <div className="roulete-container">
              <Wheel
                mustStartSpinning={mustSpin}
                prizeNumber={prizeNumber}
                data={bonus}
                onStopSpinning={() => {
                  setMustSpin(false);
                  document.getElementById("overs-roulete").style.display =
                    "flex";
                }}
              />
            </div>

            <button
              className="spin-btn"
              id="spin-btn"
              onClick={handleSpinClick}
            >
              {" "}
              Free spin
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default Settings;
