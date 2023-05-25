import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import styled from "styled-components";
import GiftCommandButtonsBar from "./GiftCommandButtonsBar";
import GiftModal from "./GiftModal";
import axios from "axios";

import { AiOutlineUnorderedList } from "react-icons/ai";
import { BsCreditCard2Front } from "react-icons/bs";

import { useParams } from "react-router-dom";

import Image from "react-bootstrap/Image";

const Wishlist = ({ }) => {

  //Gift object
  class Gift {
    constructor(id, name, description, image, url, price) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.image = image;
      this.url = url;
      this.price = price;
    }
  }

  const { IdGroup } = useParams();

  const [currentView, setCurrentView] = useState("list");

  const [wishlist, setWishlist] = useState([]);
  const [selectedGift, setSelectedGift] = useState(0);

  //Modal
  const [showModal, setShowModal] = useState(false); //is the modal viewable or not?
  const [blnEdit, setBlnEdit] = useState(false); //is the modal editable or not?

  const [isAdding, setIsAdding] = useState(false);

  const [reload, setReload] = useState(false);

  async function handleClose() {
    setShowModal(false);
  }
  function handleShow() {
    setShowModal(true);
  }

  useEffect(() => {

    //fetch gifts from API: GET all gifts

    axios
      .get(`https://localhost:7160/gifts?groupId=${IdGroup}`)
      .then((response) => {
        setWishlist(response.data);

        console.log("Data : " + response.data.length);

      })
      .catch((err) => console.log(err));
  }, [reload]);

  async function showModalAddGift() {
    await setSelectedGift(new Gift(0, "", "", "", "", ""));
    await setBlnEdit(true);
    await setIsAdding(true);
    handleShow(true);
  }

  async function sendNewGift(e, myGift) {
    e.preventDefault();

    try {
      const response = await axios.post("https://localhost:7160/gifts", myGift);
      console.log("Le cadeau a été soumis avec succès:", response.data);
      hideModal();
    } catch (error) {
      console.error("Erreur de soumission du cadeau:", error);
    }
  }
  async function sendModifiedGift(e, myGift) {
    e.preventDefault();

    try {
      const response = await axios.put(
        `https://localhost:7160/gifts/${myGift.id}`,
        myGift
      );
      console.log("Le cadeau a été soumis avec succès:", response.data);
      hideModal();
    } catch (error) {
      console.error("Erreur de soumission du cadeau:", error);
    }
  }

  function hideModal() {
    setIsAdding(false);
    setBlnEdit(false);
    setShowModal(false);
    setReload(!reload);
  }
  function deleteGift(id) {
    /*
        //was used for testing purposes before connecting to the API...
        const withDeletedGiftFromWishlist = wishlist.map((gift) => {
            if (gift.id !== id) {
                return gift;
            }
            return null;
        }).filter(gift => gift !== null);
        setWishlist(withDeletedGiftFromWishlist);
        console.log(`Gift ${id} deleted`);
        */
    return axios.delete(
      `https://localhost:7160/api/gifts?groupId=${IdGroup}&giftId=${id}`

    );
  }
  const handleDeleteClick = async (id) => {
    await deleteGift(id)

      .then((response) => {
        //setWishlist(wishlist.filter(gift => gift.id !== id)); // not necessary set reload instead which will do another get from the API in useEffect()
      })
      .catch((error) => {
        console.log(error);
      });
    setReload(!reload);
  };
  async function editGift(id) {
    console.log(`editing gift ${id}`);

    const selectedGift = wishlist.find((gift) => gift.id === id); //don't use filter here!
    await setSelectedGift(selectedGift);
    await setBlnEdit(false);
    await setIsAdding(false);
    handleShow(true);
  }
  switch (currentView) {
    case "list": {
      return (
        <>
          <a
            href="#"
            onClick={() => {
              setCurrentView("card");
            }}
          >
            <BsCreditCard2Front />
          </a>
          <h2>Ma liste de souhaits</h2>
          <List>
            {wishlist &&
              wishlist.map((g) => {
                const { id, name, description, price, image, url } = g;
                return (
                  <ListItem key={id}>
                    {name} - {description} - {price}{" "}
                    <GiftCommandButtonsBar
                      giftId={id}
                      deleteHandler={handleDeleteClick}
                      editHandler={editGift}
                    />
                  </ListItem>
                );
              })}
          </List>
          <Button onClick={showModalAddGift}>Ajouter un cadeau</Button>
          <GiftModal
            blnShow={showModal}
            close={handleClose}
            gift={selectedGift}
            editable={blnEdit}
            sendData={isAdding ? sendNewGift : sendModifiedGift}
          />
        </>
      );
    }
    case "card": {
      return (
        <>
          <a
            href="#"
            onClick={() => {
              setCurrentView("list");
            }}
          >
            <AiOutlineUnorderedList />
          </a>

          {wishlist &&
            wishlist.map((item) => {
              const { id, name, description, price, image, url } = item;
              return (
                <GiftCard key={id}>
                  <Card.Body>
                    <div className="container">
                      <div className="row">
                        <div className="col-4">
                          <Card.Title>{name}</Card.Title>
                          <Card.Text>{description}</Card.Text>
                          <Card.Link target="_blank" href={url}>
                            Site du vendeur
                          </Card.Link>
                        </div>
                        <div className="col-4">
                          <Image fluid rounded src={image} width="120" />
                        </div>
                        <div className="col-4">
                          <GiftCommandButtonsBar
                            giftId={id}
                            deleteHandler={handleDeleteClick}
                            editHandler={editGift}
                          />
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </GiftCard>
              );
            })}
          <GiftModal
            blnShow={showModal}
            close={handleClose}
            gift={selectedGift}
            editable={blnEdit}
            sendData={isAdding ? sendNewGift : sendModifiedGift}
          />
        </>
      );
    }
    default: {
      return <>Vous devez passer une vue au composant Gift!</>;
    }
  }
};

const GiftCard = styled(Card)`
  padding: 10px;
  margin: 10px;
  color: red;
`;

const ListItem = styled.li`
  display: flex;
  padding: 0 10px;
  :before {
    content: "";
    background-image: url(/images/list-item-gift.png);
    background-size: contain;
    display: inline-block;
    width: 2em;
    height: 2em;
    position: relative;
    top: 0.1rem;
    margin-right: 0.2rem;
  }

`;

const List = styled.ul`
  list-style: none;
`;

export default Wishlist;
