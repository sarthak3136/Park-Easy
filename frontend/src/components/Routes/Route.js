import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../Home/Home";
import Login from "../Auth/Login";
import Register from "../Auth/Registration";
import Support from "../Support/Support";
import Lister from "../Listers/Lister";
import Finder from "../Finders/Finder";
import ChatBox from "../Chatting/ChatBox";
import Messages from "../Chatting/Messages";
import FAQs from "../FAQs/FAQs";
import Payment from "../Payment/Payment";
import PaymentList from "../Payment/PaymentHistory";

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/lister" element={<Lister />}></Route>
        <Route path="/faq" element={<FAQs />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/support" element={<Support />}></Route>
        <Route path="/finder" element={<Finder />}></Route>
        <Route path="/messages" element={<Messages />}></Route>
        <Route path ='/paymenthistory' element = {<PaymentList/>}></Route>
        <Route
          path="/chat"
          element={<ChatBox from="admin123" to="margin123" />}
        ></Route>
        <Route path="/payment" element={<Payment />}></Route>
      </Routes>
    </Router>
  );
};

export default Routing;
