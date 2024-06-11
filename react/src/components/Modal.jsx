import React from 'react';
import './css/Modal.css';

const Modal = ({ closeModal, submissionStatus }) => {
  return (
    <div className="modal show">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        {submissionStatus === 'Success' && <p className="success-message">Form submitted successfully!</p>}
        {submissionStatus === 'Error' && <p className="error-message">There was an error submitting the form. Please try again.</p>}
      </div>
    </div>
  );
};

export default Modal;
