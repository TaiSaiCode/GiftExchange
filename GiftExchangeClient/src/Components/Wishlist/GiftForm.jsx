import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import { BiPencil, BiCheck, BiX } from 'react-icons/bi';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import GiftTextblock from './GiftTextblock';



const GiftForm = ({ gift, canEdit, handleSubmit }) => {
    const { id, name, description, price, image, url } = gift;

    const { IdGroup } = useParams();

    const [myGift, setMyGift] = useState({ ...gift, 'IdGroup': IdGroup });

    const [isEditable, setIsEditable] = useState(canEdit);

    //Form's Error message coming from the child component GiftTextBlock
    const [message, setMessage] = useState('');

    const handleMessageChange = (newMessage) => {
        setMessage(newMessage);
    };

    //
    const handleChange = (e) => {
        setMyGift({ ...myGift, [e.target.name]: e.target.value });
        setIsFormValid(true);
    }

    function clearFields(e) {
        setIsEditable(!isEditable);
        //clear all of the add form fields values
        setMyGift({ ...gift, 'IdGroup': IdGroup });
    }

    //Verify that all fields are filled before enabling the submit button. TODO: doesn't work

    const [isFormValid, setIsFormValid] = useState(canEdit);

    useEffect(() => {
        const areAllFieldsFilled = Object.values(myGift).every((value) => value && value.toString() !== ''); //TODO:  always return false, why!???
        setIsFormValid(areAllFieldsFilled);
        console.log(areAllFieldsFilled);
    }, [myGift]);

    return (
        <>
            <Form>
                <FormMessage>{message}</FormMessage>
                <GiftTextblock name='name' onMessageChange={handleMessageChange} labelName='Nom' caption='Nom du cadeau' placeholder='Nom' disabled={!isEditable} giftProp={myGift.name} onChange={handleChange} />

                <Form.Group className="mb-3" controlId="txtDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control name="description" as="textarea" rows={3} disabled={!isEditable} value={myGift.description} onChange={handleChange} required />
                    <Form.Text className="text-muted">
                        La description de votre cadeau
                    </Form.Text>
                </Form.Group>

                <GiftTextblock name='price' onMessageChange={handleMessageChange} labelName='Prix ($)' caption='Le prix de votre cadeau' disabled={!isEditable} giftProp={myGift.price} onChange={handleChange} />

                <GiftTextblock name='url' onMessageChange={handleMessageChange} labelName='Lien du cadeau' caption='Le lien de votre cadeau' disabled={!isEditable} giftProp={myGift.url} onChange={handleChange} />

                <GiftTextblock name='image' onMessageChange={handleMessageChange} labelName="Lien de l'image du cadeau" caption="Le lien de l'image de votre cadeau" disabled={!isEditable} giftProp={myGift.image} onChange={handleChange} />

                <br></br>
                <Image src={myGift.image} width="180" height="180" rounded />
                <br></br>

                {!isEditable ? (
                    <Button
                        variant="light"
                        onClick={(e) => setIsEditable(!isEditable)}
                    ><BiPencil size={"30px"} />
                    </Button>) :
                    (<>
                        <Button
                            className="mx-2"
                            variant="outline-danger"
                            onClick={() => clearFields()}
                        >
                            <BiX size={"30px"} />
                        </Button>
                        <Button
                            type="button"
                            variant="outline-success"
                            onClick={(e) => { handleSubmit(e, myGift) }}
                        //disabled={!isFormValid}
                        >
                            <BiCheck size={"30px"} />
                        </Button>
                    </>)
                }
            </Form >


        </>
    );

}

const FormMessage = styled.div`
    color: red;
    background-color: palegoldenrod;
    border: 1px solid white;
`

export default GiftForm;