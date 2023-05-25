import React, { useEffect } from 'react'
import { FaGift, FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import Button from "react-bootstrap/Button";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const GiftCommandButtonsBar = ({ giftId, deleteHandler, editHandler }) => {

    const API_URL = import.meta.env.VITE_API_URL;

    console.log("API URL: ", API_URL);
    return (
        <div className="d-flex flex-row">



            <div className="p-2">

                <Button variant='light' onClick={() => { deleteHandler(giftId) }}>
                    <FaTrashAlt />
                </Button>

            </div>
            <div className="p-2"><Button variant='light' onClick={() => { editHandler(giftId) }}><FaGift /></Button></div>
        </div>
    );
}

export default GiftCommandButtonsBar;