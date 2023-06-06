import React, { useState } from "react";
import logo from "../img/logo2.png";
import "../App.css";
import { Link } from "react-router-dom";
import Main from "../pages/Main";
import Contact from "../pages/Contact";


function Layout({ children }) {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <nav>
          <ul type="none" className="App-menu">
            <li>
              <Link to="/" className="App-nav-element">
                Home
              </Link>
            </li>
            <li>
              <a href="#search" className="App-nav-element">
                Check Weather
              </a>
            </li>
            <li>
              <Link to="/contact" className="App-nav-element">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
      <footer className="App-footer">
        <p>
          Created by Maksymilian Urbanowicz. &copy; 2023 All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default Layout;
