import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import GiftForm from './GiftForm';

function GiftModal({ blnShow, close, gift, editable, sendData }) {

    const { id, name, description, price, image, url } = gift;
    console.log("Gift from GiftModal: ", gift);
    return (
        <>
            <Modal show={blnShow} onHide={(e) => { close(close) }}>
                <Modal.Header closeButton>
                    <Modal.Title>{name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <GiftForm gift={gift} canEdit={editable} handleSubmit={sendData} />

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={close}>
                        Fermer
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    );
}

export default GiftModal;