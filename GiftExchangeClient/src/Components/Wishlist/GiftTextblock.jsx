import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import styled from 'styled-components';

const GiftTextblock = ({
    labelName = '',
    name = '',
    placeholder = '',
    giftProp = '',
    onChange = () => { },
    caption = '',
    disabled,
    onMessageChange = () => { },
    isFormValid
}) => {

    const [inputValue, setInputValue] = useState(giftProp);


    const validate = (name, value) => {
        let nom;
        switch (name) {
            case "name":
                nom = "Nom";
                break;
            case "price":
                nom = "Prix";
                break;
            case "url":
                nom = "Lien du cadeau";
                break;
            case "image":
                nom = "Lien l'Image du cadeau";
                break;
        }
        if (value == "") {
            onMessageChange(`Vous devez remplir le champs "${nom}"`);
        } else {
            onMessageChange('');
        }
    };
    return (
        <>
            <Form.Group className="mb-3" controlId={'txt' + name}>

                <Form.Label>{labelName}</Form.Label>
                <Form.Control
                    name={name}
                    type="text"
                    placeholder={placeholder == '' ? caption : placeholder}
                    disabled={disabled}
                    value={inputValue}
                    onChange={(e) => {
                        setInputValue(e.target.value); onChange(e); //doesn't work if i remove onChange(e) WHY???
                    }}
                    onBlur={(e) => { validate(e.target.name, e.target.value) }} />
                <Form.Text className="text-muted">
                    {caption}
                </Form.Text>
            </Form.Group>
        </>
    );
};

export default GiftTextblock;