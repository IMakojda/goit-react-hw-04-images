import React from "react";
import PropTypes from 'prop-types';

const Button = ({ nameClas, handleLoadBtn, children }) => {

  return (
    <button className={nameClas} type="button" onClick={handleLoadBtn}>{children}</button>
  )
}

export default Button;
Button.propTypes = {
  handleLoadBtn: PropTypes.func.isRequired,
  nameClas: PropTypes.string.isRequired,
  children: PropTypes.node,
};
