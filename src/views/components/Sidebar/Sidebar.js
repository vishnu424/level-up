import { useRef, useEffect } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";

const Sidebar = ({
  handleSideBar,
  handleProfile,

  handleContactModal,
  handleTermsCondition,
  handlePrivacyPolicy,
  handleAuth,
}) => {
  const userInfo = useSelector((state) => state.auth.userInfo);

  const wrapperRef = useRef(null);

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          // setShowSidebar(false)
          handleSideBar();
        }
      }

      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const handleProfileAuth = () => {
    if (userInfo && Object.keys(userInfo).length) {
      handleProfile();
    } else {
      handleAuth();
    }
  };

  useOutsideAlerter(wrapperRef);

  return (
    <>
      <div
        style={{ backgroundColor: "#191c21" }}
        ref={wrapperRef}
        className="bg-modal-styling text-white z-50 fixed right-0 top-0 w-1/5 min-h-screen rounded-l-3xl px-3 py-5  text-custom-gray-1"
      >
        <div className="inner-sidebar flex justify-between items-center pb-2 ">
          <div className="flex justify-between items-center">
            <img
              src="/userIcon.svg"
              alt="User Icon"
              height="60px"
              width="60px"
            />
            <div className="mt-4 ml-4 mb-4">
              <p
                className="font-bold text-lg cursor-pointer"
                onClick={handleProfileAuth}
              >
                {userInfo && Object.keys(userInfo).length
                  ? `${userInfo.firstName} ${userInfo.lastName}`
                  : "-------"}
              </p>
            </div>
          </div>
          <img
            src="/editIcon.svg"
            alt="Edit Icon"
            width="30px"
            height="30px"
            onClick={handleProfile}
            className="cursor-pointer"
          />
        </div>
        <hr />
        <div className="mt-6 ml-4 font-semibold text-lg">
          <Link href="/subscription">
            <p
              className="mb-5 cursor-pointer"
              onClick={() => {
                // handleSubscription();
                handleSideBar();
              }}
            >
              Subscriptions
            </p>
          </Link>

          <p
            className="mb-5 cursor-pointer"
            onClick={() => {
              handleContactModal();
              handleSideBar();
            }}
          >
            Contact Us
          </p>
          <p
            className="mb-5 cursor-pointer"
            onClick={() => {
              handleTermsCondition, handleSideBar();
            }}
          >
            <Link href="/terms-conditions">Terms and Conditions</Link>
          </p>
          <p
            className="mb-5 cursor-pointer"
            onClick={() => {
              handlePrivacyPolicy, handleSideBar();
            }}
          >
            <Link href="/privacypolicy">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
