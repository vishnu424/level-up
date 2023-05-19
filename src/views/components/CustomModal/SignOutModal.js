import Link from "next/link";
import router from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../../application/actions/Auth.actions";
import WebsiteButton from "../Button/WebsiteButton";

function SignOutModal({ visible, setVisible }) {
  const dispatch = useDispatch();
  const handleSignOut = async () => {
    await dispatch(authActions.signOut());
  };
  return (
    visible && (
      <div
        className={`${"bg-blur-styling"} justify-center flex-col items-center  font-open-sans  flex fixed inset-0 z-50 outline-none focus:outline-none py-2 `}
        //  className="absolute inset-0 flex justify-center items-center z-40"
        style={{
          background: "rgba(0, 0, 0, 0.4)",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        }}
      >
        <div
          className="flex flex-col py-10 mx-3 md:mx-1 md:px-5 items-center "
          style={{
            backgroundColor: "#272727",

            borderRadius: 18,
          }}
        >
          <p className="text-white font-bold text-center text-2xl">
            Are you sure you want to sign out?
          </p>
          <div className="flex justify-center gap-5 mt-8">
            <div onClick={() => setVisible(false)}>
              <WebsiteButton
                px="px-5"
                py="py-1"
                textSize="text-lg"
                bg="bg-gray-2"
              >
                CANCEL
              </WebsiteButton>
            </div>

            <div onClick={() => handleSignOut()}>
              <WebsiteButton
                px="px-5"
                py="py-1"
                textSize="text-lg"
                bg="bg-orange-1"
              >
                SIGN OUT
              </WebsiteButton>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default SignOutModal;
