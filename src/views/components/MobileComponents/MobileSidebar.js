import { useRef, useEffect } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const MobileSidebar = ({
  handleAuth,
  handleMobileSideBar,
  setVisible,
  handleProfile,

  handleContactModal,
}) => {
  const router = useRouter();
  const userInfo = useSelector((state) => state.auth.userInfo);

  const wrapperRef = useRef(null);

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          handleMobileSideBar();
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
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
    handleMobileSideBar();
  };

  useOutsideAlerter(wrapperRef);

  return (
    <>
      <div
        style={{
          backgroundColor: "#191c21",
          left: "0px",
          width: "fit-content",
        }}
        ref={wrapperRef}
        className="flex flex-col bg-modal-styling text-white z-50 fixed left-0 top-0 w-1/5 min-h-screen rounded-r-3xl px-3 py-5  text-custom-gray-1"
      >
        {/* <button type="button" onClick={handleMobileSideBar}>
          <img src="/hamberger-icon.svg" />
        </button> */}
        <div className="inner-sidebar flex justify-between items-center pb-2 ">
          <div className="flex justify-between items-center">
            <img
              src="/Profile.svg"
              alt="User Icon"
              width="28px"
              height="28px"
            />
            <div className="mt-4 ml-2 mr-1 mb-4">
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
            onClick={() => {
              handleProfile(), handleMobileSideBar();
            }}
            className="cursor-pointer"
          />
        </div>
        <hr />
        <div className="flex flex-col  gap-10 pt-4">
          <Link href="/explore">
            <div
              onClick={() => {
                handleMobileSideBar();
              }}
              className={`flex gap-2 cursor-pointer ${
                router?.pathname.includes("/explore") && "text-orange-1"
              }`}
            >
              <img
                src={
                  router?.pathname.includes("/explore")
                    ? "/Selected-Discovery.svg"
                    : "/Discovery.svg"
                }
              />
              <p>Explore</p>
            </div>
          </Link>
          <Link href="/subscription">
            <div
              onClick={() => {
                handleMobileSideBar();
              }}
              className={`flex gap-2 cursor-pointer ${
                router?.pathname.includes("/subscription") && "text-orange-1"
              }`}
            >
              <img
                src={
                  router?.pathname.includes("/subscription")
                    ? "/selected-subscription-logo.svg"
                    : "/subscription-logo.svg"
                }
              />
              <p>Subscription</p>
            </div>
          </Link>
          <p
            className="flex gap-2 cursor-pointer"
            onClick={() => {
              handleContactModal();
              handleMobileSideBar();
            }}
          >
            <img src="/contact.svg" />
            <span>Contact Us</span>
          </p>
          <div
            className={`flex gap-2 cursor-pointer ${
              router?.pathname === "/login" && "text-orange-1"
            }`}
            onClick={() => setVisible(true)}
          >
            <img
              src={
                router?.pathname === "/search"
                  ? "/Selected-Login.svg"
                  : "/Login.svg"
              }
            />
            <p className="">Signout</p>
          </div>

          {/* </Link> */}
        </div>

        <hr className="mt-4" />

        <p
          className="text-gray-600 flex cursor-pointer mx-1 my-3"
          onClick={() => {
            handleMobileSideBar();
          }}
        >
          <Link href="/terms-conditions">Terms and Conditions</Link>
        </p>
        <p
          className="text-gray-600 flex cursor-pointer mx-1 my-3"
          onClick={() => {
            handleMobileSideBar();
          }}
        >
          <Link href="/privacypolicy">Privacy Policy</Link>
        </p>
        <img
          src="/logo.svg"
          className="cursor-pointer flex self-end mx-auto mt-auto "
          height={"40px"}
          width={"76px"}
        />
      </div>
    </>
  );
};

export default MobileSidebar;
