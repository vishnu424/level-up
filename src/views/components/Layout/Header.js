import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import debounce from "lodash.debounce";
import CustomSearch from "../CustomSearch";
import SearchModal from "../SearchModal";
import { topicsActions } from "../../../application/actions/Topics.actions";
import { useDispatch, useSelector } from "react-redux";

function Header({ setVisible, handleSideBar, handleMobileSidebar }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const [showSearchModal, setShowSearchModal] = useState("");
  const [inputValue, setInputValue] = useState("");

  const [selectedSearchType, setSelectedSearchType] = useState([]);

  const [val, setVal] = useState("");

  const wrapperRef = useRef(null);
  const { is_mobile: isMobile } = useSelector((state) => state.levelUp);

  const handleCustomSearch = async () => {
    await dispatch(topicsActions.searchContent(val, "video"));
  };

  useEffect(() => {
    if (inputValue !== "") {
      handleCustomSearch();
    }
  }, [val, selectedSearchType]);

  const delayedHandleSearch = useCallback(debounce(setVal, 400), []);

  useEffect(() => {
    if (inputValue.length === 0) {
      setSelectedSearchType([]);
    }
  }, [inputValue, val]);

  const handleClearSearch = () => {
    setInputValue("");
    setVal("");
    setSelectedSearchType([]);
  };

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowSearchModal(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  useOutsideAlerter(wrapperRef);

  return (
    <>
      {!isMobile ? (
        <div
          className={`content-width mx-auto flex justify-between py-2 items-center text-white-1`}
        >
          <div className="flex flex-1 justify-between">
            <div className="h-hull justify-center items-center flex ">
              <Link href="/explore">
                <img src="/logo.svg" className="cursor-pointer" />
              </Link>

              <div className="h-hull justify-center items-center flex ">
                <p
                  style={{
                    height: "fit-content",
                  }}
                  className={`text-white text-center  flex rounded-lg bg-orange-1  px-2 mt-2`}
                >
                  BETA
                </p>
              </div>
            </div>

            <div className=" mt-3.5  ml-auto">
              <CustomSearch
                inputValue={inputValue}
                setInputValue={setInputValue}
                handleSearch={delayedHandleSearch}
                handleClearSearch={handleClearSearch}
                showSearchModal={showSearchModal}
                setShowSearchModal={setShowSearchModal}
              />
            </div>
          </div>

          <div className="flex flex-1  gap-10 justify-end  items-center">
            <Link href="/explore">
              <div
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

            <div
              onClick={handleSideBar}
              className={`flex gap-2 cursor-pointer ${
                router?.pathname === "/profile" && "text-orange-1"
              }`}
            >
              <img
                src={
                  router?.pathname === "/profile"
                    ? "/Selected-Profile.svg"
                    : "/Profile.svg"
                }
              />
              <p>Profile</p>
            </div>

            {/* <Link href={"/search"}>
            <div
              className={`flex gap-2 cursor-pointer ${
                router?.pathname === "/search" && "text-orange-1"
              }`}
            >
              <img
                src={
                  router?.pathname === "/search"
                    ? "Selected-Search.svg"
                    : "Search.svg"
                }
              />
              <p>Search</p>
            </div>
          </Link> */}
            {/* <Link href="/login"> */}
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
              <p className="">Logout</p>
            </div>
            {/* </Link> */}
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-center p-4">
          <button type="button" onClick={handleMobileSidebar}>
            <img src="/hamberger-icon.svg" />
          </button>

          <Link href="/explore">
            <img
              src="/logo.svg"
              className="cursor-pointer"
              height={"40px"}
              width={"76px"}
            />
          </Link>
        </div>
      )}
      {showSearchModal && (
        <SearchModal
          inputValue={inputValue}
          wrapperRef={wrapperRef}
          setShowSearchModal={setShowSearchModal}
          setInputValue={setInputValue}
          //  handleAuth={handleAuth}
        />
      )}
    </>
  );
}

export default Header;
