import React, { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCaretUp,
  faFire,
  faCoins,
  faChartLine,
  faArrowTrendUp,
  faLeaf,
  faEye,
  faFilter,
  faRecycle,
  faChartBar,
  faColumns, 
  faClock} from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import '../Styles/Body.css';
import myData from '../data/MOCK_DATA.json'

export default function Body() {
  console.log(myData[0])
  const top5CirculatingSupply = [...myData]
  .sort((a, b) => b.circulating_supply - a.circulating_supply)
  .slice(0, 5);

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

  // Function to check if scrolling is possible
  const checkScrollButtons = () => {
    const nav = navRef.current;
    if (nav) {
      setCanScrollLeft(nav.scrollLeft > 0);

      setCanScrollRight(nav.scrollLeft + nav.clientWidth < nav.scrollWidth);
    }
  };

  // Scroll function to move left or right
  const scrollNav = (direction) => {
    const scrollAmount = 200;
    if (navRef.current) {
      navRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // Initial check and whenever scroll position changes
  useEffect(() => {
    checkScrollButtons();
  }, []);

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
        <FontAwesomeIcon icon={faFire} className="icon fire-icon" />
        <FontAwesomeIcon icon={faClock} className="icon clock-icon" />
        <FontAwesomeIcon icon={faEye} className="icon eye-icon" />
      </div>
    </div>

    <div className="top-supply-list">
      {top5CirculatingSupply.map((coin, index) => (
        <div key={index} className="supply-item">
          <p>{index + 1}</p>
          <h3>{coin.crypto_currency}</h3>
          <strong>${coin.circulating_supply.toLocaleString()}</strong>
          <label>{coin.blockchain}</label>
        </div>
      ))}
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
