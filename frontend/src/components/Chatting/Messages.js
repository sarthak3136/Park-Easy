import React, { useState, useEffect } from "react";
import {
  Navbar,
  Nav,
  Image,
  Container,
  ListGroup,
  Card,
  Col,
  Row,
} from "react-bootstrap";
import logo from "../assets/ParkEasy.png";
import { useNavigate } from "react-router-dom";
import MessageBox from "./MessageBox";
import { query, collection, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "./Firebase1";
import {NotificationBell, NovuProvider, PopoverNotificationCenter} from "@novu/notification-center";

const Messages = () => {
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState(null);
  const [fetchedUsers, setFetchedUsers] = useState([]);

  const currentUser = localStorage.getItem("username");
  const fetchUserList = async () => {
    try {
      const q = query(
        collection(db, "messages"),
        where("from", "==", currentUser),
        orderBy("createdAt", "asc")
      );

      const qTo = query(
        collection(db, "messages"),
        where("to", "==", currentUser),
        orderBy("createdAt", "asc")
      );

      const querySnapshotFrom = await getDocs(q);
      const querySnapshotTo = await getDocs(qTo);

      const userList = [];

      querySnapshotFrom.forEach((doc) => {
        const to = doc.data().to;
        if (to && to !== currentUser && !userList.includes(to)) {
          userList.push(to);
        }
      });

      querySnapshotTo.forEach((doc) => {
        const from = doc.data().from;
        if (from && from !== currentUser && !userList.includes(from)) {
          userList.push(from);
        }
      });

      setFetchedUsers(userList);
    } catch (error) {
      console.error("Error fetching user list:", error);
      setFetchedUsers([]);
    }
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  function onNotificationClick(message) {

    if (message?.cta?.data?.url) {
      window.location.href = message.cta.data.url;
    }
  }

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  return (
    <>
      <Navbar bg="success" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">
            <Image src={logo} style={{ width: "40px", height: "40px" }} fluid />
            ParkEasy
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
          </Nav>
          <Nav>
            <NovuProvider
                subscriberId={window.localStorage.getItem("email")}
                styles={{

                  bellButton: {
                    root: {
                      svg: {
                        color: '#FFFFFF8C',
                      },
                    },
                  },
                }}
                applicationIdentifier={'nS45TrQEHee_'}
                initialFetchingStrategy={{
                  fetchNotifications: true,
                  fetchUserPreferences: true,
                }}
            >
              <PopoverNotificationCenter colorScheme="light"
                                         onNotificationClick={onNotificationClick}
                                         listItem={(notification) => (
                                             <div>{notification?.payload?.description}</div>
                                         )}
              >
                {({ unseenCount }) => (
                    <Nav.Link>
                      <NotificationBell unseenCount={unseenCount} />
                    </Nav.Link>
                )}
              </PopoverNotificationCenter>
            </NovuProvider>
            <Nav.Link onClick={() => navigate("/messages")}>Messages</Nav.Link>
            <Nav.Link onClick={() => navigate("/support")}>Support</Nav.Link>
            <Nav.Link onClick={() => navigate("/faq")}>FAQ</Nav.Link>
            <Navbar.Text>{window.localStorage.getItem("email")}</Navbar.Text>
          </Nav>
        </Container>
      </Navbar>

      <Container fluid>
        <Row className="mt-3">
          <Col md={3}>
            <Card>
              <Card.Header
                style={{
                  fontWeight: "bold",
                  fontFamily: "monospace",
                  fontSize: "1.5rem",
                }}
              >
                Chats
              </Card.Header>
              <ListGroup variant="flush">
                {fetchedUsers.map((user) => (
                  <ListGroup.Item
                    key={user}
                    action
                    onClick={() =>
                      handleUserClick({ id: user, name: `${user}` })
                    }
                    active={selectedUser && selectedUser.id === user}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      cursor: "pointer",
                      background:
                        selectedUser && selectedUser.id === user
                          ? "#ececec"
                          : "white",
                      borderLeft:
                        selectedUser && selectedUser.id === user
                          ? "5px solid #28a745"
                          : "none",
                      padding: "1rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <div style={{ color: "green", fontFamily: "cursive" }}>
                      {`${user}`}
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "green" }}>
                      {selectedUser && selectedUser.id === user ? "Active" : ""}
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card>
          </Col>
          <Col md={9}>
            {selectedUser ? (
              <MessageBox from={currentUser} to={selectedUser.id} />
            ) : (
              <Card>
                <Card.Header>Select a user to start chatting</Card.Header>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Messages;
