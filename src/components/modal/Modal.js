import React, { Component } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.querySelector('#modal-root')

export default class Modal extends Component {

  componentDidMount() {
    window.addEventListener('keydown', this.handleKepDown)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKepDown)
  }

  handleKepDown = e => {
    if (e.code === "Escape") {
      this.props.onClose();
    }
  }

  handleBackDropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  }

  render() {
    return createPortal(
      <div className="overlay" onClick={this.handleBackDropClick}>
        <div className="modal">
          {this.props.children}
        </div>
      </div>,
      modalRoot
    )
  }
}