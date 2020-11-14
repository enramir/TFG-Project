/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

class Sidebar extends Component {

  searchRef = React.createRef();

  state = {
    search: '',
    redirect: false
  }

  redirectToSearch = (e) => {
    e.preventDefault();
    // console.log(this.searchRef.current.value);
    
    this.setState({
      search: this.searchRef.current.value,
      redirect: true
    });
  }

  render() {

    if(this.state.redirect){
      return(
        <Redirect to={'/redirect/'+this.state.search}></Redirect>
      )
    }

    return (
      <div>
        <aside id="sidebar">
          <div id="nav-blog" className="sidebar-item">
            <h6>Añade un nuevo producto:</h6>
            <Link to={'/home/crear'} className="btn btn-success">Añadir producto</Link>
          </div>
          <div id="search" className="sidebar-item">
            <h6>Busque aquí un producto:</h6>
            <form onSubmit={this.redirectToSearch} className="form-inline my-2 my-lg-0">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Buscar"
                aria-label="Search"
                ref={this.searchRef}
              />
              <button className="btn btn-info my-2 my-sm-2" type="submit">
                Buscar
              </button>
            </form>
          </div>
        </aside>
        <div className="clearfix" />
      </div>
    );
  }
}


export default Sidebar;