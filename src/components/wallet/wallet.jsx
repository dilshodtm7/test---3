import React, { useEffect } from "react";
import { TonConnectButton } from "@tonconnect/ui-react";
import Coin from "../../assets/winni.png";
import Ton from "../../assets/ton.png";
import withIcon from "../../assets/loader5.gif";
import { MdOutlineTaskAlt } from "react-icons/md";
import { HiOutlineArrowPathRoundedSquare } from "react-icons/hi2";
import { TbSquareRounded } from "react-icons/tb";

import "./style.css";

const home = ({ data, loading }) => {
  return (
    <>
      <div className="body-balance">
        <div className="balance-text-title">Airdrop coming soon</div>

        {loading === false ? (
          <>
            <img src={withIcon} className="loader-img" alt="" />
            <div class="loader"></div>
          </>
        ) : (
          <>
            <div className="wallet-connects">
              <TonConnectButton />
            </div>
            <div className="balance-wallet-text">
              <span className="balance-wallet-span">Your balance</span>
            </div>
            <div className="balance-wallet">
              <div className="wallets-balances">
                <div className="usdt">
                  <span className="balance-wallet-span">Winnie Coin</span>
                  <span className="balance-wallet-span">
                    <img src={Coin} className="coin" alt="" />
                    {data.balance_winnie}
                  </span>
                </div>
                <div className="usdt">
                  <span className="balance-wallet-span">TON</span>
                  <span className="balance-wallet-span">
                    <img src={Ton} className="coin" alt="" />
                    {data.balance_ton}
                  </span>
                </div>
              </div>
              <div className="ton-airdop">
                <div className="">
                <MdOutlineTaskAlt className="airdrop" />
                <span>Airdrop will be available soon</span>
                </div>
                <div className="">
                <MdOutlineTaskAlt className="airdrop" />
                <span>Airdrop will be available soon</span>
                </div>
                <div className="">
                <HiOutlineArrowPathRoundedSquare className="airdrops" />
                <span>Airdrop will be available soon</span>
                </div>
                <div className="">
                <TbSquareRounded className="airdrops" />
                <span>Airdrop will be available soon</span>
                </div>

              </div>
            </div>  
          </>
        )}
      </div>
    </>
  );
};

export default home;
