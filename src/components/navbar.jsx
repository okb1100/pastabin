import React from 'react';
import PropTypes from 'prop-types';

function Navbar(props) {
  const navItems = props.items.map((item) => (
    <li className="nav-item" key={item.name}>
      <a href={item.link} className="nav-link">
        {item.name}
      </a>
    </li>
  ));
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-1">
      <a href="/" className="navbar-brand">
        {props.brand}
      </a>
      <button
        className="navbar-toggler hidden-lg-up"
        data-toggle="collapse"
        data-target="#collapsibleNavId"
        aria-controls="collapsibleNav"
        aria-expanded="false"
      >
        <span className="navbar-toggler-icon" aria-hidden="true" />
      </button>
      <div className="collapse navbar-collapse" id="collapsibleNav">
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">{navItems}</ul>
      </div>
    </nav>
  );
}
Navbar.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  brand: PropTypes.string.isRequired,
};
export default Navbar;
