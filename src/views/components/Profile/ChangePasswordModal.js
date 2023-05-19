import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../../application/actions/Auth.actions";
import dynamic from "next/dynamic";
import CustomInput from "../CustomInput";
import CustomButton from "../CustomButton";

const ChangePasswordModal = ({ handleChangePassword }) => {
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.auth.userInfo);

  const [newPassword, setNewPassword] = useState("");
  const [showResetPassword, setshowResetPassword] = useState(false);
  const [confirmOldPassword, setConfirmOldPassword] = useState("");

  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  useEffect(() => {}, [confirmNewPassword, newPassword]);

  const onClickConfirmOldPassword = async () => {
    let res = await dispatch(
      authActions.signIn({
        type: "password",
        payload: {
          identifier: userInfo.email,
          password: confirmOldPassword,
        },
      })
    );
    if (res.status) {
      setshowResetPassword(true);
    } else {
      dispatch(authActions.showAlert("wrong password", "danger"));
    }
  };

  const changePassword = async () => {
    let isSamePassword = await dispatch(
      authActions.signIn({
        type: "password",
        payload: {
          identifier: userInfo.email,
          password: newPassword,
        },
      })
    );

    if (newPassword === confirmNewPassword) {
      let res = await dispatch(
        authActions.changeProfile(userInfo && userInfo.uuidIdentifier, {
          password: newPassword,
        })
      );

      if (
        (await res.statusCode) === 200 &&
        (await isSamePassword.status) === false
      ) {
        handleChangePassword("close");
      } else {
        dispatch(
          authActions.showAlert(
            isSamePassword.status
              ? "old and new password not be same"
              : "error",
            "danger"
          )
        );
      }
    } else {
      dispatch(authActions.showAlert("password not matched", "danger"));
    }
  };

  return (
    <>
      <div className="bg-blur-styling text-white justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
        <div className="relative my-3 mx-3 md:mx-auto md:w-1/4">
          <div
            style={{ backgroundColor: "#191c21", height: "425px" }}
            className="border-0 rounded-lg shadow-lg relative flex flex-col w-full  outline-none focus:outline-none"
          >
            <div className="flex items-start justify-between pl-8 pr-5 py-4 rounded-t">
              <p className="font-semibold text-lg mt-3 flex mb-5 text-primary">
                <img
                  src="/back-arrow.svg"
                  alt="leftArrow"
                  width="25px"
                  height="10px"
                  className="mr-5 cursor-pointer"
                  onClick={handleChangePassword}
                />
                <span>Change Password</span>
              </p>
              <div className="p-1 ml-auto bg-transparent border-0 text-white text-3xl leading-none font-semibold outline-none focus:outline-none cursor-pointer">
                <img
                  src="/close.svg"
                  alt="close"
                  width="14px"
                  height="14px"
                  onClick={() => handleChangePassword("close")}
                />
              </div>
            </div>
            <div className="relative pb-4 px-8 flex-auto text-center">
              <div className="text-left">
                {showResetPassword ? (
                  <div
                    style={{ backgroundColor: "#191c21" }}
                    className=" w-full"
                  >
                    <CustomInput
                      id="New Password"
                      label="New Password"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />

                    <CustomInput
                      id="Confirm New Password"
                      label="Confirm New Password"
                      type="password"
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                    />
                    <div
                      className="text-center mb-6 mt-32"
                      onClick={changePassword}
                    >
                      <CustomButton type="primary" title="Submit" />
                    </div>
                  </div>
                ) : (
                  <div>
                    <CustomInput
                      id="Old Password"
                      label="Old Password"
                      type="password"
                      value={confirmOldPassword}
                      onChange={(e) => setConfirmOldPassword(e.target.value)}
                    />
                    <div
                      className="text-center mb-6 mt-32"
                      onClick={onClickConfirmOldPassword}
                    >
                      <CustomButton type="primary" title="Submit" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePasswordModal;
