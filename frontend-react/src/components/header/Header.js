/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import logo from "../../assets/images/logo.svg";
import { NavLink } from "react-router-dom";

class Header extends Component {

  render() {

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="navbar-brand" to="/">
          <img
            src={logo}
            width={45}
            height={35}
            alt="Logotipo React"
            title="App realizada con ReactJS"
          />
          ProductsApp
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <NavLink className="nav-link" to="/home">
                Home <span className="sr-only">(current)</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/portatiles">
                Portátiles
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/monitores">
                Monitores
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Accesorios
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <NavLink className="dropdown-item" to="/cables">
                  Cables
                </NavLink>
                <NavLink className="dropdown-item" to="/adaptadores">
                  Adaptadores
                </NavLink>
                <div className="dropdown-divider" />
                <a className="dropdown-item">Más</a>
              </div>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" href="#">
                CATEGORÍAS MÁS RELEVANTES
              </a>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Buscar"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Buscar
            </button>
          </form>
        </div>
      </nav>
    );
  }
}

export default Header;
