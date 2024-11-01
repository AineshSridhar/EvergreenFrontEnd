import React, { useState, useEffect } from 'react';
import './App.css';
import pagesData from './pagesData.json';

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [nextPage, setNextPage] = useState(null);
  const [fadeOut, setFadeOut] = useState(false);

  const handlePageChange = (index) => {
    if (index !== currentPage && nextPage === null) {
      setFadeOut(true);
      setNextPage(index);

      setTimeout(() => {
        setCurrentPage(index);
        setNextPage(null);
        setFadeOut(false); 
      }, 0); 
    }
  };

  const handleScroll = (event) => {
    const delta = event.deltaY;

    if (delta > 0) {
      if (currentPage < pagesData.length - 1) {
        handlePageChange(currentPage + 1);
      }
    } else {
      if (currentPage > 0) {
        handlePageChange(currentPage - 1);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('wheel', handleScroll);

    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [currentPage]);

  return (
    <div className="app-container">
      <div className="page-wrapper">
        {/* Current page */}
        <div
          className={`background-image ${fadeOut ? 'fade-out' : ''}`}
          style={{ backgroundImage: `url(${pagesData[currentPage].image})` }}
        >
          <div className="overlay">
            <h1 className="title">{pagesData[currentPage].index}</h1>
            <p className="date">{pagesData[currentPage].date}</p>
            <p className="description">{pagesData[currentPage].content}</p>
            <button className="promo-button">Watch Promo</button>
          </div>
        </div>

        {/* Next page */}
        {nextPage !== null && (
          <div
            className={`background-image fade-in`}
            style={{ backgroundImage: `url(${pagesData[nextPage].image})` }}
          >
            <div className="overlay">
              <h1 className="title">{pagesData[nextPage].index}</h1>
              <p className="date">{pagesData[nextPage].date}</p>
              <p className="description">{pagesData[nextPage].content}</p>
              <button className="promo-button">Watch Promo</button>
            </div>
          </div>
        )}
      </div>

      <div className="sidebar">
        {pagesData.map((page, index) => (
          <div
            key={index}
            className={`sidebar-item ${index === currentPage ? 'active' : ''}`}
            onClick={() => handlePageChange(index)}
          >
            <div className="sidebar-image" style={{ backgroundImage: `url(${page.image})` }}></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
