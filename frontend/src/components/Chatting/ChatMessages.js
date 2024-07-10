import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const ChatMessages = ({ message, from, onAcceptOffer, onRejectOffer }) => {
  const currentUser = localStorage.getItem("username");
  const isCurrentUser = from === currentUser;

  const isOfferMessage = /^Offer\s+\d+(\.\d{1,2})?$/.test(message.message);
  const offerAmount = isOfferMessage ? message.message.split(" ")[1] : null;

  const isAcceptedMessage = /^Accepted/.test(message.message);

  const acceptedAmount = isAcceptedMessage
    ? /\$\d+(\.\d{1,2})?/.exec(message.message)?.[0] || null
    : null;

  const isRejectedMessage = /^Rejected/.test(message.message);
  const rejectedAmount = isRejectedMessage
    ? /\$\d+(\.\d{1,2})?/.exec(message.message)?.[0] || null
    : null;

  const [accepted, setAccepted] = useState(false);
  const [rejected, setRejected] = useState(false);

  const handleAccept = () => {
    setAccepted(true);

    // Call the callback function to inform the parent component about the accepted offer
    if (onAcceptOffer) {
      const offerDetails = {
        amount: offerAmount || acceptedAmount,
        sender: message.from,
        recipient: message.to,
      };
      onAcceptOffer(offerDetails);
    }

    // Additional logic if needed
  };

  const handleReject = () => {
    setRejected(true);
    if (onRejectOffer) {
      const offerDetails = {
        amount: offerAmount || rejectedAmount,
        sender: message.from,
        recipient: message.to,
      };
      onRejectOffer(offerDetails);
    }
  };
  return (
    <Card
      style={{
        borderRadius: isCurrentUser ? "20px 20px 0 20px" : "20px 20px 20px 0",
        padding: "0.5rem",
        background: isCurrentUser ? "#fff" : "#35a444",
        color: isCurrentUser ? "#1c2c4c" : "#fff",
        width: "fit-content",
        maxWidth: "80%",
        marginLeft: isCurrentUser ? "auto" : "0",
        marginRight: isCurrentUser ? "0" : "auto",
        marginTop: "0.5rem",
        boxShadow: isCurrentUser
          ? "-1px 1px 5px 1px #348e49"
          : "-1px 1px 5px 1px #348e49",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: isCurrentUser ? "flex-end" : "flex-start",
        }}
      >
        <Card.Title
          style={{
            fontWeight: "bold",
            marginBottom: "0.5rem",
            fontSize: "0.8rem",
            color: isCurrentUser ? "#1c2c4c" : "#fff",
          }}
        >
          {message.from}
        </Card.Title>
        <Card.Text
          style={{
            wordBreak: "break-all",
            fontSize: "0.8rem",
          }}
        >
          {isOfferMessage ? (
            <div>
              <p>{`Offer Amount: $${offerAmount}`}</p>
              {isCurrentUser ? (
                <Button variant="success" disabled={accepted}>
                  {accepted ? "Offer Accepted" : "Offered"}
                </Button>
              ) : (
                <div>
                  <Button onClick={handleAccept} disabled={accepted}>
                    Accept
                  </Button>{" "}
                  <Button variant="danger" onClick={handleReject}>
                    Reject
                  </Button>
                </div>
              )}
            </div>
          ) : isAcceptedMessage ? (
            <div>
              <p>{`Accepted Amount: ${acceptedAmount}`}</p>
              <Button disabled>Offer Accepted</Button>
            </div>
          ) : isRejectedMessage ? (
            <div>
              <p>{`Rejected Amount: ${rejectedAmount}`}</p>
              <Button variant="danger" disabled>
                Offer Rejected
              </Button>
            </div>
          ) : (
            message.message
          )}
        </Card.Text>
      </div>
    </Card>
  );
};

export default ChatMessages;
