import React, { useState } from "react";
import { useSelector } from "react-redux";

import SimpleModal from "../CustomModal/SimpleModal";
import MobileSidebar from "../MobileComponents/MobileSidebar";
import ChangePasswordModal from "../Profile/ChangePasswordModal";
import ProfileModal from "../Profile/ProfileModal";

import Sidebar from "../Sidebar/Sidebar";

import Header from "./Header";

function Layout({ children, setVisible }) {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [showSidebar, setShowSidebar] = useState(false);

  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  const [showProfile, setShowProfile] = useState(false);

  const [showSignup, setShowSignup] = useState(false);
  const [contactModal, setContactModal] = useState(false);
  const [showSubscription, setShowSubscription] = useState(false);
  const [showTermsCondition, setShowTermsCondition] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const handleSideBar = () => {
    showSidebar ? setShowSidebar(false) : setShowSidebar(true);
  };

  const handleContactModal = () => {
    contactModal ? setContactModal(false) : setContactModal(true);
  };

  const handleChangePassword = (type) => {
    if (showChangePassword) {
      setShowChangePassword(false);
      setShowProfile(true);
    } else {
      setShowChangePassword(true);
      setShowProfile(false);
    }
    if (type === "close") {
      setShowChangePassword(false);
      setShowProfile(false);
    }
  };

  const handleProfile = () => {
    if (userInfo && Object.keys(userInfo).length) {
      showProfile ? setShowProfile(false) : setShowProfile(true);
    }
  };

  const handleMobileSidebar = () => {
    showMobileSidebar
      ? setShowMobileSidebar(false)
      : setShowMobileSidebar(true);
  };
  return (
    <>
      <div className={`bg-primary sticky top-0 z-40`}>
        <Header
          setVisible={setVisible}
          handleSideBar={handleSideBar}
          handleMobileSidebar={handleMobileSidebar}
        />

        {showSidebar && (
          <Sidebar
            handleSideBar={handleSideBar}
            handleProfile={handleProfile}
            handleContactModal={handleContactModal}
            // handleAuth={handleAuth}
          />
        )}

        {showMobileSidebar && (
          <MobileSidebar
            handleMobileSideBar={handleMobileSidebar}
            setVisible={setVisible}
            handleSideBar={handleSideBar}
            handleProfile={handleProfile}
            handleContactModal={handleContactModal}
          />
        )}
        {showProfile && (
          <ProfileModal
            handleProfile={handleProfile}
            handleChangePassword={handleChangePassword}
          />
        )}

        {showChangePassword && (
          <ChangePasswordModal handleChangePassword={handleChangePassword} />
        )}

        <SimpleModal
          title={`
              <h1 class= "text-4xl text-bold" > Got A Query?</h1>
              <div class = "flex justify-center  items-center py-4 px-4">
                <img
              src="/whatsapp.svg"
              alt="whatsapp"
               width="40"
               height="40"  
              className="mr-4 cursor-pointer share-icon"
            />
              <p class=" ml-2 text-blue-600">   
              <a
              target="_blank"
              href="https://wa.me/7200791962"
            >
            +91 7200791962
            </a></p></div>

            
           
            `}
          isVisible={contactModal}
          setIsVisble={setContactModal}
        />
      </div>
      {children}
    </>
  );
}

export default Layout;
