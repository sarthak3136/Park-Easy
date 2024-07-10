import React, { useEffect, useRef, useState } from "react";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  where,
  limit,
} from "firebase/firestore";
import { db } from "./Firebase1";
import Message from "./Message";
import SendMessage from "./SendMessage";
import { Button, Card } from "react-bootstrap";
import { BsX } from "react-icons/bs"; // Import the X icon

const ChatBox = ({ to, from, setShowChatBox, showChatBox }) => {
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const [acceptedOffer, setAcceptedOffer] = useState(null);
  const [rejectedOffer, setRejectedOffer] = useState(null);

  const handleAcceptOffer = (offerDetails) => {
    console.log("Offer Accepted:", offerDetails);
    setAcceptedOffer(offerDetails);
  };
  const handleRejectedOffer = (offerDetails) => {
    console.log("Offer Rejected:", offerDetails);
    setRejectedOffer(offerDetails);
  };

  const scroll = useRef();

  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      where("from", "in", [from, to]),
      where("to", "in", [from, to]),
      orderBy("createdAt", "asc"),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const fetchedMessages = [];
      QuerySnapshot.forEach((doc) => {
        fetchedMessages.push({ ...doc.data(), id: doc.id });
      });

      setMessages(fetchedMessages);
    });

    return () => unsubscribe();
  }, [to, from]);

  useEffect(() => {
    if (scroll && scroll.current) {
      scroll.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);

  const handleCloseChatbox = () => {
    setShowChatBox(!showChatBox);
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <Card
          style={{
            position: "fixed",
            bottom: "2rem",
            right: "2rem",
            flexDirection: "column",
            alignItems: "center",
            width: "400px",
            borderRadius: "8px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            background: "#fff",
            color: "#000",
            border: "2px solid green",
          }}
        >
          <Button
            onClick={handleCloseChatbox}
            variant="danger"
            size="sm"
            style={{ position: "absolute", top: "0", right: "0" }}
          >
            <BsX />
          </Button>

          <div
            style={{
              width: "100%",
              height: "300px",
              overflowY: "auto",
              marginBottom: "1rem",
              borderRadius: "8px",
              padding: "1rem",
              background: "white",
            }}
          >
            {messages?.map((message) => (
              <Message
                key={message.createdAt}
                message={message}
                from={message.from}
                onAcceptOffer={handleAcceptOffer}
                onRejectOffer={handleRejectedOffer}
              />
            ))}
            <span ref={scroll}></span>
          </div>

          <SendMessage
            scroll={scroll}
            to={to}
            from={from}
            acceptedOffer={acceptedOffer}
            rejectedOffer={rejectedOffer}
          />
        </Card>
      )}
    </>
  );
};

export default ChatBox;
