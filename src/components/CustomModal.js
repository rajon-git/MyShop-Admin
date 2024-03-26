import React from 'react'
import { Button, Modal, Space } from 'antd';

function CustomModal(props) {
    const {open, hideModal, performAction, title} = props;
  return (
    <Modal
        title="Modal"
        open={open}
        onOk={performAction}
        onCancel={hideModal}
        okText="ok"
        cancelText="cancel"
      >
        <p>{title}</p>
      </Modal>
  )
}

export default CustomModal
