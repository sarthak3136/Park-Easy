import React, { useState } from "react";
import axios from "axios";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Payment.css";
import { backendUrl } from "../API/Api";

const Payment = ({ showPaymentModal, handleClose, address, toName }) => {
  const [price, setPrice] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      userName: localStorage.getItem("username") ?? 1,
      address,
      price: price,
      to: toName,
    };

    try {
      const response = await axios.post(`${backendUrl}/payment`, formData);

      if (response.data.success) {
        window.location.href = response.data.data.link;
      } else {
        throw new Error("Failed to create payment session");
      }

      setSubmitted(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal show={showPaymentModal} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Payment</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "rgba(144, 238, 144, 0.3)" }}>
        <p className="payment-subtitle label">Name:</p>
        <p className="payment-subtitle">{toName}</p>
        <p className="payment-subtitle label">Parking Spot:</p>
        <p className="payment-subtitle">{address}</p>
        <p className="payment-subtitle label">Amount:</p>
        <p className="payment-subtitle">${price}</p>

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formAmount">
            <Form.Label>Enter Amount:</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter amount"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>

          <Row className="form-container">
            <Col lg={12} md={12} sm={12}>
              <div className="button-container">
                <Button
                  type="submit"
                  variant="success"
                  className="button button-100p"
                >
                  Submit
                </Button>
              </div>
              {submitted && (
                <p className="submitted-message">
                  Payment submitted. Thank you!
                </p>
              )}
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Payment;
