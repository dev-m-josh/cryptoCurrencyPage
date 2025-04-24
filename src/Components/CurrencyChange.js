import React from 'react';
import myData from '../data/MOCK_DATA.json';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import '../Styles/CurrencyChange.css';

export default function CurrencyChange() {
  myData.forEach((coin) => {

    const dailyChangePercent = coin.change_7d_percent / 7; 

    let price = coin.price_usd;
    const last_7_days = [price];  
    for (let i = 1; i < 7; i++) {
      price = price * (1 + dailyChangePercent / 100); 
      last_7_days.push(price.toFixed(2)); 
    }

    coin.last_7_days = last_7_days;
  });

  return (
    <div className="currency-change-wrapper">
      <table className="currency-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price (USD)</th>
            <th>24h %</th>
            <th>7d %</th>
            <th>30d %</th>
            <th>Market Cap</th>
            <th>Circulating supply</th>
            <th>Blockchain</th>
            <th>Last 7 Days</th>
          </tr>
        </thead>
        <tbody>
          {myData.map((coin, index) => {
            const isPriceIncreasing = coin.last_7_days[6] > coin.last_7_days[0];
            const lineColor = isPriceIncreasing ? "#00B386" : "#FF3B30";

            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{coin.crypto_currency}</td>
                <td>${coin.price_usd.toLocaleString()}</td>
                <td className={coin.change_24h_percent >= 0 ? 'green' : 'red'}>
                  <FontAwesomeIcon icon={coin.change_24h_percent >= 0 ? faCaretUp : faCaretDown} />
                  {coin.change_24h_percent.toFixed(2)}%
                </td>
                <td className={coin.change_7d_percent >= 0 ? 'green' : 'red'}>
                  <FontAwesomeIcon icon={coin.change_7d_percent >= 0 ? faCaretUp : faCaretDown} />
                  {coin.change_7d_percent.toFixed(2)}%
                </td>
                <td className={coin.change_30d_percent >= 0 ? 'green' : 'red'}>
                  <FontAwesomeIcon icon={coin.change_30d_percent >= 0 ? faCaretUp : faCaretDown} />
                  {coin.change_30d_percent.toFixed(2)}%
                </td>
                <td>${coin.market_cap_usd.toLocaleString()}</td>
                <td>${coin.circulating_supply.toLocaleString()}</td>
                <td>{coin.blockchain}</td>
                <td className="sparkline-cell">
                  <Sparklines data={coin.last_7_days} width={100} height={30}>
                    <SparklinesLine color={lineColor} />
                  </Sparklines>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
