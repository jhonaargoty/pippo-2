import React from "react";
import { FaTimes } from "react-icons/fa";
import "./styles.scss";

function Index({ children, isOpen, onClose, title }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-background">
      <div className="modal-content">
        <div className="title">
          {title}
          <button onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        <div className="children">{children}</div>
      </div>
    </div>
  );
}

export default Index;
