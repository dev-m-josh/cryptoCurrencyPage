import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faStar, faSearch, faQrcode, faBars, faUser, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import '../Styles/Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="header-top">
        <div className='header-links'>
            <div className="logo">
            <svg xmlns="http://www.w3.org/2000/svg" width="160" height="25" viewBox="0 0 320 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="white" strokeWidth="6" />
                <path d="M20,50 C30,30 45,30 55,50 C65,70 80,70 90,50" stroke="white" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                <text x="110" y="58" fontFamily="Arial, sans-serif" fontSize="50" fill="white">CoinMarketCap</text>
            </svg>
            </div>
            <nav className="nav-links">
                <button className="nav-trigger">Cryptocurrencies</button>
                <button className="nav-trigger">DexScan</button>
                <button className="nav-trigger">Exchanges</button>
                <button className="nav-trigger">Community</button>
                <button className="nav-trigger">Products</button>
            </nav>
        </div>

        <div className="header-profile">
          <div id='portfolio' className="profile-item">
            <FontAwesomeIcon className='icon' icon={faChartLine} size="lg" />
            <p>Portfolio</p>
          </div>
          <div className="profile-item">
            <FontAwesomeIcon className='icon' icon={faStar} size="lg" />
            <p>Watchlist</p>
          </div>
          <div className="search-input">
            <FontAwesomeIcon className='icon' icon={faSearch} size="lg" />
            <input type="search" placeholder="Search..." />
            <p>/</p>
          </div>
          <FontAwesomeIcon className='qr-icon' icon={faQrcode} size="lg" />
          <button className="login-btn">Log In</button>
          <div className="menu-icons">
            <FontAwesomeIcon icon={faBars} size="lg" />
            <FontAwesomeIcon icon={faUser} size="lg" />
          </div>
        </div>
      </div>
      <hr />
      <div className="header-bottom">
        <div>
          <div>Cryptos: <strong>11.15M</strong></div>
          <div>Exchanges: <strong>811</strong></div>
          <div>Market Cap: <strong>$2.94T</strong><h4><FontAwesomeIcon icon={faCaretUp}/> 6.04%</h4></div>
          <div>24h Vol: <strong>$131.21B</strong><h4><FontAwesomeIcon icon={faCaretUp}/> 57.29%</h4></div>
          <div>Dominance: <strong>BTC: 63.3% ETH: 7.4%</strong></div>
          <div>ETH Gas: <strong>1.01 Gwei</strong></div>
          <div>Fear & Greed: <strong>52/100</strong></div>
        </div>
        <div>
            <select name="Get listed" id="listed" defaultValue="">
                <option value="" disabled hidden>Get listed</option>
                <option value="Cryptocurrency">Cryptocurrency</option>
                <option value="Exchange">Exchange</option>
                <option value="Page Updates">Page Updates</option>
            </select>
            <button className="api-btn">API</button>
        </div>
      </div>
      <hr />
    </header>
  );
};
