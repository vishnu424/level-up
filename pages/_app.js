import { Head } from "next/document";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { wrapper } from "../src/application/store";
import "../src/styles/globals.css";
import "../src/styles/tailwind.css";
import "../src/styles/CustomInput.css";
import "../src/styles/jwPlayer.css";
import "../src/styles/subscription.css";

import SignOutModal from "../src/views/components/CustomModal/SignOutModal";
import Layout from "../src/views/components/Layout/Layout";

import "../src/helpers/auth.interceptor";

import Auth from "../src/views/components/Auth/Auth";
import { AUTHENTICATED } from "../src/application/types";
import CustomAlert from "../src/views/components/CustomAlert/CustomAlert";
import { levelUpActions } from "../src/application/actions/LevelUp.actions";

function MyApp({ Component, pageProps }) {
  const dispatch = useDispatch();
  const { authenticated: auth, access_token: token } = useSelector(
    (state) => state.auth
  );

  const alertText = useSelector((state) => state.auth.alert_text);
  const alertType = useSelector((state) => state.auth.alert_type);
  const showAlert = useSelector((state) => state.auth.show_alert);

  const [visible, setVisible] = useState(false);

  const [signIn, setSignIn] = useState(true);

  if (process.browser) {
    const accessToken =
      process.browser && window.localStorage.getItem("access_token");
    const refreshToken =
      process.browser && window.localStorage.getItem("refresh_token");
    const userInfo = JSON.parse(
      process.browser && window.localStorage.getItem("userInfo")
    );

    useEffect(() => {
      var width = typeof screen !== "undefined" && screen.width;
      dispatch(levelUpActions.getScreenSize(width < 430 ? true : false));

      // let width = screen.width;
      // if (width < 430) {
      //   window.location.href =
      //     "https://play.app.goo.gl/?link=https://play.google.com/store/apps/details?id=com.app.leveluplearning";
      // }
      dispatch({
        type: AUTHENTICATED,
        payload: {
          data: {
            accessToken,
            refreshToken,
          },
          userInfo,
        },
      });
    }, []);
  }

  useEffect(async () => {
    setSignIn(token);
  }, [auth]);

  return (
    <>
      <div className="relative">
        {!token && (
          <>
            <div className="fixed inset-0 z-50 bg-primary ">
              {/* <Login visible={signIn} /> */}
              <Auth />
            </div>
            {showAlert && (
              <div className="fixed z-50 font-semibold text-white text-bold start-button bottom-8 flex justify-center items-center h-11 w-full">
                <CustomAlert
                  isVisible={showAlert}
                  title={alertText}
                  type={alertType}
                />
              </div>
            )}{" "}
          </>
        )}

        {token && (
          <Layout setVisible={setVisible}>
            <SignOutModal setVisible={setVisible} visible={visible} />
            <Component {...pageProps} />
            {showAlert && (
              <div className="fixed z-50 font-semibold text-white text-bold start-button bottom-8 flex justify-center items-center h-11 w-full">
                <CustomAlert
                  isVisible={showAlert}
                  title={alertText}
                  type={alertType}
                />
              </div>
            )}
          </Layout>
        )}
      </div>
    </>
  );
}

export default wrapper.withRedux(MyApp);
