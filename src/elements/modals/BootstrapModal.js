import React, { Component, PropTypes } from 'react';
import { Modal, Button } from 'react-bootstrap';

export default class BootstrapModal extends Component {
  render() {
    return (
      <Modal show={this.props.handleShowModal} onHide={this.props.handleHideModal}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {this.props.children}
        </Modal.Body>

        <Modal.Footer>
          <Button bsClass="btn btn-secondary" onClick={this.props.handleHideModal}>Close</Button>
          <Button bsStyle="primary" onClick={this.props.handleSaveModal}>Save</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

BootstrapModal.displayName = 'BootstrapModal';

BootstrapModal.propTypes = {
  title: PropTypes.string.isRequired,
  handleShowModal: PropTypes.bool.isRequired,
  handleSaveModal: PropTypes.func.isRequired,
  handleHideModal: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
};
