import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <h2>Is Takibi</h2>
      <nav>
       
        <NavLink to={"/"}>Is Listesi</NavLink>
        <NavLink to={"/new"}>Is Ekle</NavLink>
      </nav>
    </header>
  );
};

export default Header;
