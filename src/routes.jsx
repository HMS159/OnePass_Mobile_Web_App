import React from "react";
import { Routes, Route } from "react-router-dom";
import MobileLayout from "./pages/MobileLayout.jsx";
import Home from "./Pages/Home.jsx";
import EmailCapture from "./Pages/EmailCapture.jsx";
import Consent from "./Pages/Consent.jsx";
import VerificationCode from "./Pages/VerificationCode.jsx";
import FaceMatch from "./Pages/FaceMatch.jsx";
import VerificationDone from "./Pages/VerificationDone.jsx";
import CheckinSuccess from "./Pages/CheckinSuccess.jsx";
import CheckinHistory from "./Pages/CheckinHistory.jsx";
import WelcomeBack from "./Pages/WelcomeBack.jsx";
import EmailVerification from "./Pages/EmailVerification.jsx";
import MyProfile from "./Pages/MyProfile.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MobileLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/:guestNumber/:restaurantId" element={<Home />} />
        <Route path="/email" element={<EmailCapture />} />
        <Route path="/welcome-back" element={<WelcomeBack />} />
        <Route path="/consent" element={<Consent />} />
        <Route path="/verification" element={<VerificationCode />} />
        <Route path="/face-match" element={<FaceMatch />} />
        <Route path="/verification-done" element={<VerificationDone />} />
        <Route path="/success" element={<CheckinSuccess />} />
        <Route path="/history" element={<CheckinHistory />} />
        <Route path="/email-verification" element={<EmailVerification />} />
        <Route path="/profile" element={<MyProfile />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
