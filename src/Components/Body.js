import {
  faArrowTrendUp,
  faCaretDown,
  faCaretUp,
  faChartBar,
  faChartLine,
  faCircleCheck,
  faClock,
  faCoins,
  faColumns,
  faEye,
  faFaceSmile,
  faFilter,
  faFire,
  faLeaf,
  faMessage,
  faRecycle,
  faRepeat
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import '../Styles/Body.css';
import myData from '../data/MOCK_DATA.json';

export default function Body() {
  const coin = myData[10];
  function generateLast7Days(coin) {
    const dailyChangePercent = coin.change_7d_percent / 7;
    let price = coin.price_usd;
    const last_7_days = [parseFloat(price.toFixed(2))];
  
    for (let i = 1; i < 7; i++) {
      price = price * (1 + dailyChangePercent / 100);
      last_7_days.push(parseFloat(price.toFixed(2)));
    }
  
    coin.last_7_days = last_7_days;
  }
  generateLast7Days(coin);

  /*********************/
  const coin2 = myData[1];
  function generateLast7Days2(coin) {
    const dailyChangePercent = coin.change_7d_percent / 7;
    let price = coin.price_usd;
    const last_7_days = [parseFloat(price.toFixed(2))];
  
    for (let i = 1; i < 7; i++) {
      price = price * (1 + dailyChangePercent / 100);
      last_7_days.push(parseFloat(price.toFixed(2)));
    }
  
    coin2.last_7_days = last_7_days;
  }
  generateLast7Days2(coin2);  
  
  const top5CirculatingSupply = [...myData]
  .sort((a, b) => b.circulating_supply - a.circulating_supply)
  .slice(0, 5);

  top5CirculatingSupply.forEach((coin) => {
    const dailyChangePercent = coin.change_7d_percent / 7;
  
    let price = coin.price_usd;
    const last_7_days = [parseFloat(price.toFixed(2))];
  
    for (let i = 1; i < 7; i++) {
      price = price * (1 + dailyChangePercent / 100);
      last_7_days.push(parseFloat(price.toFixed(2)));
    }
  
    coin.last_7_days = last_7_days; 
    console.log('coin.last_7_days', coin.last_7_days);

  });
  
  const navItems = [
    { path: "/all-crypto", label: "All Crypto" },
    { path: "/nfts", label: "NFTs" },
    { path: "/categories", label: "Categories" },
    { path: "/token-unlocks", label: "Token Unlocks" },
    { path: "/rehypo", label: "Rehypo", icon: faRecycle, className: 'recycle' },
    { path: "/bianca-alpha", label: "Bianca Alpha", icon: faFire },
    { path: "/memes", label: "Memes", icon: faFire },
    { path: "/sol", label: "SOL", icon: faFire },
    { path: "/bnb", label: "BNB", icon: faFire },
    { path: "/usa", label: "USA", icon: faFire },
    { path: "/ai", label: "AI", icon: faFire },
    { path: "/rwa", label: "RWA", icon: faFire },
    { path: "/gaming", label: "Gaming", icon: faFire },
    { path: "/depin", label: "DePIN", icon: faFire },
    { path: "/defai", label: "DeFAI", icon: faFire },
    { path: "/ai-agents", label: "AI Agents", icon: faFire },
  ]; 
  
  const [selectedOption, setSelectedOption] = useState("Show 100");

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const navRef = useRef();
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    const nav = navRef.current;
    if (nav) {
      setCanScrollLeft(nav.scrollLeft > 0);

      setCanScrollRight(nav.scrollLeft + nav.clientWidth < nav.scrollWidth);
    }
  };

  const scrollNav = (direction) => {
    const scrollAmount = 200;
    if (navRef.current) {
      navRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    checkScrollButtons();
  }, []);

  const [activeIcon, setActiveIcon] = useState('clock'); 

  const handleIconClick = (icon) => {
    setActiveIcon(icon);
  };


  const lineColor = parseFloat(coin.change_7d_percent) >= 0 ? "#16c784" : "#ea3943";
  const lineColor2 = parseFloat(coin2.change_7d_percent) >= 0 ? "#16c784" : "#ea3943";

  return (
    
    <div className='hero-section'>
        <div className='heading'>
            <h1>Today's Cryptocurrency Prices by Market Cap</h1>
            <p>The global crypto market cap is <strong>$2.94T</strong>, a<strong style={{color:'#00B386'}}> <FontAwesomeIcon icon={faCaretUp} /> 4.87%</strong> increase over the last day. <label>Read More</label></p>
        </div>

        <div className="cards">
          <div className="trending-coins">
            <div className="trending-header">
              <h3>Most Circulating Supply<button className="navigate-btn">{">"}</button></h3>
              <div className="trending-icons">
                <FontAwesomeIcon
                  icon={faFire}
                  className={`icon fire-icon ${activeIcon === 'fire' ? 'active' : ''}`}
                  onClick={() => handleIconClick('fire')}
                />
                <FontAwesomeIcon
                  icon={faClock}
                  className={`icon clock-icon ${activeIcon === 'clock' ? 'active' : ''}`}
                  onClick={() => handleIconClick('clock')}
                />
                <FontAwesomeIcon
                  icon={faEye}
                  className={`icon eye-icon ${activeIcon === 'eye' ? 'active' : ''}`}
                  onClick={() => handleIconClick('eye')}
                />
              </div>
            </div>

            <table className="supply-table">
              <tbody>

              {top5CirculatingSupply.map((coin, index) => {
                const isPriceIncreasing = coin.last_7_days[6] > coin.last_7_days[0];

                const lineColor = isPriceIncreasing ? "#00B386" : "#FF3B30";

                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{coin.crypto_currency}</td>
                    <td>${coin.price_usd.toLocaleString()}</td>
                    <td className="sparkline-cell">
                      {coin.last_7_days && (
                        <Sparklines data={coin.last_7_days} width={100} height={30}>
                          <SparklinesLine color={lineColor} />
                        </Sparklines>
                      )}
                    </td>
                  </tr>
                );
              })}

              </tbody>
            </table>
          </div>

          <div className="trending-coins">
            <div className="trending-header">
              <h3>Percentage Change<button className="navigate-btn">{">"}</button></h3>
              <div className="trending-icons">
                <FontAwesomeIcon
                  icon={faFire}
                  className={`icon fire-icon ${activeIcon === 'fire' ? 'active' : ''}`}
                  onClick={() => handleIconClick('fire')}
                />
                <FontAwesomeIcon
                  icon={faClock}
                  className={`icon clock-icon ${activeIcon === 'clock' ? 'active' : ''}`}
                  onClick={() => handleIconClick('clock')}
                />
                <FontAwesomeIcon
                  icon={faEye}
                  className={`icon eye-icon ${activeIcon === 'eye' ? 'active' : ''}`}
                  onClick={() => handleIconClick('eye')}
                />
              </div>
            </div>

            <table className="supply-table">
              <tbody>
                {top5CirculatingSupply.map((coin, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{coin.crypto_currency}</td>
                    <td>${coin.circulating_supply.toLocaleString()}</td>
                    <td className={coin.change_7d_percent >= 0 ? 'green' : 'red'}>
                      <FontAwesomeIcon icon={coin.change_7d_percent >= 0 ? faCaretUp : faCaretDown} />
                      {coin.change_7d_percent.toFixed(2)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="coin-stats-container">
            <div className="coin-stat-card">
              <h3>
                Market Cap <button>{'>'}</button>
              </h3>
              <h2>${coin.price_usd}</h2>
              <h4 className="green">
                <FontAwesomeIcon icon={faCaretUp} /> {coin.change_30d_percent}%
              </h4>
              <Sparklines data={coin2.last_7_days.map(Number)}   width={100} height={30}>
                <SparklinesLine color={lineColor2} />
              </Sparklines>
            </div>

            <div className="coin-stat-card">
              <h3>
                CMC100 <button>{'>'}</button>
              </h3>
              <h2>${coin.all_time_low_usd}</h2>
              <h4 className="red">
                <FontAwesomeIcon icon={faCaretDown} /> {coin.change_7d_percent}%
              </h4>
              <Sparklines data={coin.last_7_days.map(Number)}   width={100} height={30}>
                <SparklinesLine color={lineColor} />
              </Sparklines>
            </div>

            <div className="coin-stat-card">
              <h3>
                CMC100 <button>{'>'}</button>
              </h3>
              <h2>${coin.all_time_low_usd}</h2>
              <h4 className="red">
                <FontAwesomeIcon icon={faCaretDown} /> {coin.change_7d_percent}%
              </h4>
              <Sparklines data={coin.last_7_days.map(Number)}   width={100} height={30}>
                <SparklinesLine color={lineColor} />
              </Sparklines>
            </div>

            <div className="coin-stat-card">
              <h3>
                Market Cap <button>{'>'}</button>
              </h3>
              <h2>${coin.price_usd}</h2>
              <h4 className="green">
                <FontAwesomeIcon icon={faCaretUp} /> {coin.change_30d_percent}%
              </h4>
              <Sparklines data={coin2.last_7_days.map(Number)}   width={100} height={30}>
                <SparklinesLine color={lineColor2} />
              </Sparklines>
            </div>
          </div>

          <div className='news'>
            <div className='news-card'>
              <div className='news-card-header'>
                <img src='https://s3.coinmarketcap.com/static-gravity/image/7f20f190ae67489f91bf77faf7af6775.jpg' alt='coins'/>
                <h3>CryptoMaven <FontAwesomeIcon icon={faCircleCheck} style={{ color: '#3b82f6' }}/> .</h3>
                <p>10 hours</p>
              </div>
              <p>
                A new #Bitcoin giant just stepped onto the scene, Twenty One Capital is launching with...
              </p>
              <label>
                <FontAwesomeIcon icon={faMessage}/> 5 .
                <FontAwesomeIcon icon={faRepeat}/> 0 
                <FontAwesomeIcon icon={faFaceSmile}/>
              </label>
            </div>
            <div className='news-card'>
              <div className='news-card-header'>
                <img src='https://s3.coinmarketcap.com/static-gravity/image/63d79c60c56546e0889ab0d710a1f08d.jpg' alt='coins'/>
                <h3>CryptoMaven <FontAwesomeIcon icon={faCircleCheck} style={{ color: '#3b82f6' }}/> .</h3>
                <p>8 hours</p>
              </div>
              <div className='prediction'>
                <img src='https://academy-public.coinmarketcap.com/srd-optimized-uploads/0c3d095e45d14d35bad0c5a9964f5b00.png' alt='hint-bar'/>
                <p>
                Federal Reserve Officials Hint at 2025 Rate Cuts
                </p>
              </div>
            </div>
          </div>
        </div>
 
        <div className="nav-container">
            {canScrollLeft && (
              <button className="nav-scroll-btn left" onClick={() => scrollNav('left')}>
                {"<"}
              </button>
            )}

            <nav className="nav-bar" ref={navRef} onScroll={checkScrollButtons}>
              {navItems.map(({ path, label, icon, className }) => (
                <div key={path} className="nav-item">
                  {icon && <FontAwesomeIcon className={className || 'nav-item__icon'} icon={icon} />}
                  <NavLink to={path} className={({ isActive }) => isActive ? 'nav-item__link--active' : 'nav-item__link'}>
                    {label}
                  </NavLink>
                </div>
              ))}
            </nav>

            {canScrollRight && (
              <button className="nav-scroll-btn right" onClick={() => scrollNav('right')}>
                {">"}
              </button>
            )}
        </div>
        <hr/>

        <div className="crypto-section-controls">
          <div className="category-tabs">
            <div className="category-tab-group">
              <div className="category-tab">
                <NavLink to="/coins" className={({ isActive }) => isActive ? 'active' : ''}>
                  <FontAwesomeIcon icon={faCoins} /> Coins
                </NavLink>
              </div>
              <div className="category-tab">
                <NavLink to="/dexscan" className={({ isActive }) => isActive ? 'active' : ''}>
                  <FontAwesomeIcon icon={faChartLine} /> DexScan
                </NavLink>
              </div>
            </div>

            <div className="category-highlight top">
              <FontAwesomeIcon icon={faChartBar} />
              <h3>Top</h3>
            </div>
            <div className="category-highlight">
              <FontAwesomeIcon className='nav-item__icon' icon={faFire} />
              <h3>Trending</h3>
            </div>
            <div className="category-highlight">
              <FontAwesomeIcon className='new' icon={faLeaf} />
              <h3>New</h3>
            </div>
            <div className="category-highlight">
              <FontAwesomeIcon className='gainers' icon={faArrowTrendUp} />
              <h3>Gainers</h3>
            </div>
            <div className="category-highlight">
              <FontAwesomeIcon className='most-visited' icon={faEye} />
              <h3>Most Visited</h3>
            </div>
          </div>


          <div className="filter-controls">
            <div className="filter-option">
              <FontAwesomeIcon icon={faFilter} />
              <h3>Filter</h3>
            </div>
            <div className="filter-option">
              <FontAwesomeIcon icon={faColumns } />
              <h3>Columns</h3>
            </div>
            <div className="dropdown-container">
              <select value={selectedOption} onChange={handleChange}>
                <option value="Show 100">Show 100</option>
                <option value="Show 200">Show 200</option>
                <option value="Show 500">Show 500</option>
                <option value="Show All">Show All</option>
              </select>
            </div>
          </div>
        </div>
        <hr/>
    </div>
  );
};
