import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { BsStarFill } from "react-icons/bs";
import AddFeedback from "./AddFeedback";
import axios from "axios";
import { backendUrl } from "../API/Api";

const Feedback = ({ showModal, handleClose, postId }) => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const starColorStyle = { color: "gold" };

  useEffect(() => {
    console.log(postId);

    axios
      .post(`${backendUrl}/feedback/getFeedback`, {
        postId,
      })
      .then((response) => {
        console.log(response);
        setReviews(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, [postId, showModal]);

  return (
    <>
      {showModal && (
        <div className="blur-container">
          <Modal
            id="2"
            show={showModal}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Reviews</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {isLoading ? (
                <p>Loading reviews...</p>
              ) : reviews?.length === 0 ? (
                <p>No reviews available.</p>
              ) : (
                reviews?.map((review, index) => (
                  <div
                    key={index}
                    style={{
                      marginBottom: "20px",
                      backgroundColor: "rgba(144, 238, 144, 0.3)",
                      padding: "10px",
                      borderRadius: "8px",
                    }}
                  >
                    <h6>Name: {review.name}</h6>
                    <h6>Comments: {review.comment}</h6>
                    <h6>
                      Rating:{" "}
                      {[...Array(review.stars)].map((_, i) => (
                        <BsStarFill key={i} style={starColorStyle} />
                      ))}
                    </h6>
                  </div>
                ))
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </>
  );
};

export default Feedback;
