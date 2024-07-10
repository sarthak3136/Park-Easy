import React, { useEffect, useState } from "react";
import { db } from "./Firebase1";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Form, Button, FormControl, Modal } from "react-bootstrap"; // Import Modal from react-bootstrap

const ChatMessageSend = ({
  scroll,
  to,
  from,
  acceptedOffer,
  rejectedOffer,
}) => {
  const [message, setMessage] = useState("");
  const [offerAmount, setOfferAmount] = useState("");
  const [showOfferModal, setShowOfferModal] = useState(false);

  useEffect(() => {
    if (acceptedOffer) {
      console.log("Accepted Offer Details:", acceptedOffer);
      const { amount, sender, recipient } = acceptedOffer;
      const acceptedOfferMessage = `Accepted Amount: of $${amount}`;

      // Send the accepted offer message
      addDoc(collection(db, "messages"), {
        message: acceptedOfferMessage,
        createdAt: serverTimestamp(),
        to: sender, // Send the message to the sender of the original offer
        from: from,
      });
    } else if (rejectedOffer) {
      console.log("Rejected Offer Details:", rejectedOffer);
      const { amount, sender, recipient } = rejectedOffer;
      const rejectedOfferMessage = `Rejected Amount: of $${amount}`;

      // Send the accepted offer message
      addDoc(collection(db, "messages"), {
        message: rejectedOfferMessage,
        createdAt: serverTimestamp(),
        to: sender, // Send the message to the sender of the original offer
        from: from,
      });
    }
  }, [acceptedOffer, rejectedOffer, from]);

  const sendMessage = async (event) => {
    event.preventDefault();
    if (message.trim() === "") {
      alert("Enter a valid message");
      return;
    }

    // Send the regular message
    await addDoc(collection(db, "messages"), {
      message: message,
      createdAt: serverTimestamp(),
      to: to,
      from: from,
    });

    setMessage("");

    if (scroll && scroll.current) {
      scroll.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  const handleOffer = () => {
    setShowOfferModal(true);
  };

  const sendOffer = async () => {
    if (offerAmount.trim() === "") {
      alert("Enter a valid offer amount");
      return;
    }

    const offerMessage = `Offer ${offerAmount}`;

    // Send the offer message
    await addDoc(collection(db, "messages"), {
      message: offerMessage,
      createdAt: serverTimestamp(),
      to: to,
      from: from,
    });

    setOfferAmount("");
    setShowOfferModal(false);
  };

  return (
    <div>
      <Form
        onSubmit={(event) => sendMessage(event)}
        style={{
          position: "fixed",
          bottom: 0,
          display: "flex",
          alignItems: "center",
          width: "71%",
          borderRadius: "8px",
          marginBottom: "1rem",
          padding: "0.5rem",
          background: "#f2f2f2",
        }}
      >
        <FormControl
          style={{ flexGrow: 1, marginRight: "0.5rem" }}
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button type="submit" variant="primary">
          Send
        </Button>
        <Button variant="info" onClick={handleOffer}>
          Offer
        </Button>
      </Form>

      {/* Offer Modal */}
      <Modal show={showOfferModal} onHide={() => setShowOfferModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Offer Amount</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormControl
            type="number"
            placeholder="Enter offer amount"
            value={offerAmount}
            onChange={(e) => setOfferAmount(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowOfferModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={sendOffer}>
            Send Offer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ChatMessageSend;
