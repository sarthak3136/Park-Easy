import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const PaymentList = () => {
  const [paymentData, setPaymentData] = useState({
    paymentsMade: [],
    paymentsReceived: [],
  });

  const username = localStorage.getItem('username');

  useEffect(() => {
    axios.get(`http://localhost:9000/payment/${username}/payments`)
      .then((response) => {
        setPaymentData(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching payment data:', error);
      });
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <h2 className="text-success">Payments Made</h2>
          {paymentData.paymentsMade.map((payment) => (
            <Row key={payment._id} className="mb-2">
              <Col>
                <Card className="bg-success text-white">
                  <Card.Body>
                    <Card.Title>Recipient: {payment.to}</Card.Title>
                    <Card.Text>Price: ${payment.price}</Card.Text>
                    <Card.Text>Address: {payment.address}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          ))}
        </Col>

        <Col>
          <h2 className="text-success mt-4 mt-md-0">Payments Received</h2>
          {paymentData.paymentsReceived.map((payment) => (
            <Row key={payment._id} className="mb-2">
              <Col>
                <Card className="bg-success text-white">
                  <Card.Body>
                    <Card.Title>User: {payment.userName}</Card.Title>
                    <Card.Text>Price: ${payment.price}</Card.Text>
                    <Card.Text>Address: {payment.address}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentList;
