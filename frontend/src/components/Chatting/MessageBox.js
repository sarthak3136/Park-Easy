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
import { Card } from "react-bootstrap";

import ChatMessages from "./ChatMessages";
import ChatMessageSend from "./ChatMessageSend";

const MessageBox = ({ from, to }) => {
  const [messages, setMessages] = useState([]);
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

  return (
    <div>
      <Card>
        <Card.Header className="bg-success text-white">
          Chatting with {to}
        </Card.Header>
        <Card.Body style={{ height: "80vh", position: "relative" }}>
          <div
            style={{
              maxHeight: "450px",
              overflowY: "auto",
              marginBottom: "1rem",
              borderRadius: "8px",
              padding: "1rem",
              background: "#f8f9fa",
            }}
          >
            {messages?.map((message) => (
              <ChatMessages
                key={message.createdAt}
                message={message}
                from={message.from}
                onAcceptOffer={handleAcceptOffer}
                onRejectOffer={handleRejectedOffer}
              />
            ))}
            <span ref={scroll}></span>
          </div>
          <ChatMessageSend
            scroll={scroll}
            to={to}
            from={from}
            acceptedOffer={acceptedOffer}
            rejectedOffer={rejectedOffer}
          />
        </Card.Body>
      </Card>
    </div>
  );
};

export default MessageBox;
