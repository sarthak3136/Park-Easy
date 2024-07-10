import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { backendUrl } from "../API/Api";
const AddFeedback = ({ showModal, handleClose, postId }) => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [stars, setStars] = useState(0);

  const handleStarClick = (selectedStars) => {
    setStars(selectedStars);
  };

  const handleSubmit = () => {
    console.log("Name:", name);
    console.log("Comment:", comment);
    console.log("Stars:", stars);
    console.log("postId", postId);

    axios
      .post(`${backendUrl}/feedback/create`, {
        name,
        comment,
        stars,
        postId,
      })
      .then((response) => {
        console.log("response");
        handleClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Modal show={showModal} onHide={handleClose} centered id="3">
      <Modal.Header closeButton>
        <Modal.Title>Add Review</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formComment">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter your comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formStars">
            <Form.Label>Stars</Form.Label>
            <div>
              {[...Array(5)].map((star, index) => {
                const starValue = index + 1;

                return (
                  <FaStar
                    key={index}
                    size={30}
                    onClick={() => handleStarClick(starValue)}
                    color={starValue <= stars ? "#ffc107" : "#e4e5e9"}
                    style={{ cursor: "pointer" }}
                  />
                );
              })}
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="success" onClick={handleSubmit}>
          Submit Review
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddFeedback;
