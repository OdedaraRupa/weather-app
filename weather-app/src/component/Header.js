import React from "react";
import LocationSearch from "./LocationSearch";
import { FaGithub } from "react-icons/fa";

const Header = () => {
  return (
    <>
      <header>
        <div className="container flex-3-column">
          <div className="logo"> 🌤️ WeatherNow</div>
        
          <div className="github-icon">
            <a
              href="https://github.com/OdedaraRupa/weather-app.git"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub size={24} color="#2D2D2D" />
            </a>
          </div>
        </div>
      </header>
    </>
  );
};
export default Header;
