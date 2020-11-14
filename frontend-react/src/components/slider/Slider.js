import React, { Component } from "react";

class Slider extends Component {
  render() {
    return (
      <header>
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          data-ride="carousel"
        >
          <ol className="carousel-indicators">
            <li
              data-target="#carouselExampleIndicators"
              data-slide-to={0}
              className="active"
            />
            <li data-target="#carouselExampleIndicators" data-slide-to={1} />
            <li data-target="#carouselExampleIndicators" data-slide-to={2} />
          </ol>
          <div className="carousel-inner" role="listbox">
            {/* Slide One - Set the background image for this slide in the line below */}
            <div
              className="carousel-item active"
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1546433970-ae3c35917a58?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1600&h=900&fit=crop&ixid=eyJhcHBfaWQiOjF9")',
              }}
            >
              <div className="carousel-caption d-none d-md-block">
                <h2 className="display-4">Componentes para PC y mucho más</h2>
                <p className="lead">
                  Encontrarás una variedad de artículos tecnológicos de todo
                  tipo.
                </p>
              </div>
            </div>
            {/* Slide Two - Set the background image for this slide in the line below */}
            <div
              className="carousel-item"
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1515940175183-6798529cb860?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1600&h=900&fit=crop&ixid=eyJhcHBfaWQiOjF9")',
              }}
            >
              <div className="carousel-caption d-none d-md-block"></div>
            </div>
            {/* Slide Three - Set the background image for this slide in the line below */}
            <div
              className="carousel-item"
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1527747471697-174c755627dd?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1600&h=900&fit=crop&ixid=eyJhcHBfaWQiOjF9")',
              }}
            >
              <div className="carousel-caption d-none d-md-block"></div>
            </div>
          </div>
          <a
            className="carousel-control-prev"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="sr-only">Next</span>
          </a>
        </div>
      </header>
    );
  }
}

export default Slider;
