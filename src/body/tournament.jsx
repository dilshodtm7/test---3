import React, { useEffect, useState } from "react";
import Cup from "../assets/cup-icon.png";
import WinnieJpg from "../assets/winni.png";
import Ton from "../assets/ton.png";

const tournament = ( {data,loading}) => {

  const participants = [
    { rank: 1, name: "I'm first", points: 5000, bonus: 15 },
    { rank: 2, name: "I'm second", points: 4000, bonus: 10 },
    { rank: 3, name: "I'm third", points: 3500, bonus: 5 },
    { rank: 4, name: "I'm fourth", points: 3000 },
    { rank: 5, name: "I'm fifth", points: 2800 },
    { rank: 6, name: "I'm sixth", points: 2500 },
    { rank: 7, name: "I'm seventh", points: 2400 },
    { rank: 8, name: "I'm eighth", points: 2000 },
    { rank: 9, name: "I'm ninth", points: 1500 },
  ];

  const toggleDisplay = (selector, displayStyle) => {
    document.querySelector(selector).style.display = displayStyle;
  };
  const closeTournament = () => toggleDisplay("#tournament", "none");

  const singleParticipant = participants.find((p) => p.rank === 1);

  return (
    <>
      {loading === false ? (
        <>
          <div className="loading">
            <div className="tournament-info">
              <span className="tournament-title">Tournament</span>
              <button
                className="zen-close"
                id="content-close"
                onClick={closeTournament}
              >
                x
              </button>
              <div className="my-account"></div>
              <div className="tournament-prize-pool">
                <div className="prize-pool-description">
                  The total prize pool for the weekly tournament is 30 TON.
                </div>
                <hr className="tournament-hr" />
                <div className="tournament-rules">
                  <div className="loading">
                    <div className="loaders"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="tournament-info">
            <span className="tournament-title">Tournament</span>
            <button
              className="zen-close"
              id="content-close"
              onClick={closeTournament}
            >
              x
            </button>
            <div className="my-account">
              {singleParticipant && (
                <div className="list-tournament" key={singleParticipant.rank}>
                  <div className="li-info">
                    <div className="images">
                      <img src={Cup} className="daily-bonus-img" alt="" />
                    </div>
                    <div className="li-names">
                      <div>
                        <span>{singleParticipant.name}</span>
                      </div>
                      <div className="li-points">
                        <img src={WinnieJpg} className="weekly-bonus" alt="" />
                        <span>
                          {singleParticipant.points
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                        </span>
                      </div>
                    </div>
                    {singleParticipant.bonus && (
                      <div className="list-bonus-weeks">
                        <img src={Ton} className="weekly-bonus" alt="" />
                        <span>
                          {singleParticipant.bonus
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="tops">
                    <span>{singleParticipant.rank}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="tournament-prize-pool">
            <div className="prize-pool-description">
              The total prize pool for the weekly tournament is 30 TON.
            </div>
          </div>
          <hr className="tournament-hr" />
          <div className="tournament-rules">
            {participants.map((participant) => (
              <div className="list-tournament" key={participant.rank}>
                <div className="li-info">
                  <div className="images">
                    <img src={Cup} className="daily-bonus-img" alt="" />
                  </div>
                  <div className="li-names">
                    <div>
                      <span>{participant.name}</span>
                    </div>
                    <div className="li-points">
                      <img src={WinnieJpg} className="weekly-bonus" alt="" />
                      <span>
                        {participant.points
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                      </span>
                    </div>
                  </div>
                  {participant.bonus && (
                    <div className="list-bonus-weeks">
                      <img src={Ton} className="weekly-bonus" alt="" />
                      <span>
                        {participant.bonus
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                      </span>
                    </div>
                  )}
                </div>
                <div className="tops">
                  <span>{participant.rank}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default tournament;
