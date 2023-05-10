import React, { useState } from "react";
import "../styles/navigation.css";

export default function NavigTion() {
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);

  const handleNavClick = () => {
    setIsNavVisible((prevState) => !prevState);
    setIsAnimated((prevState) => !prevState);
  };

  return (
    <div>
      <button
        className={`btn-nav ${isAnimated ? "animated" : ""}`}
        onClick={handleNavClick}>
        <span className="icon-bar top"></span>
        <span className="icon-bar middle"></span>
        <span className="icon-bar bottom"></span>
      </button>
      <div
        className={`nav-content ${isNavVisible ? "showNav" : "hideNav"} ${
          isNavVisible ? "" : "hidden"
        }`}>
        <ul className="nav-list">
          <li className="nav-item">
            <a href="/create" className="item-anchor">
              Create
            </a>
          </li>
          <li className="nav-item">
            <a href="/" className="item-anchor">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="/list" className="item-anchor">
              List
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
