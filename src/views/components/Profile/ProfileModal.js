import { useState, useEffect } from "react";
import { authActions } from "../../../application/actions/Auth.actions";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";
import CustomInput from "../CustomInput";
import CustomButton from "../CustomButton";

// const CustomButton = dynamic(() => import("../Elements/CustomButton"));
// const CustomInput = dynamic(() => import("../Elements/CustomInput"));

const ProfileModal = ({ handleProfile, handleChangePassword }) => {
  const dispatch = useDispatch();

  const collegesList = useSelector((state) => state.auth.colleges_data);
  const userInfo = useSelector((state) => state.auth.userInfo);

  const [firstName, setFirstName] = useState(
    userInfo ? userInfo.firstName : ""
  );
  const [lastName, setLastName] = useState(userInfo ? userInfo.lastName : "");
  const [email, setEmail] = useState(userInfo ? userInfo.email : "");
  const [mobileNumber, setMobileNumber] = useState(
    userInfo ? userInfo.phone : ""
  );

  const [collegeName, setCollegeName] = useState(
    userInfo ? userInfo.collegeName : ""
  );

  const handleSignOut = () => {
    dispatch(authActions.signOut());

    handleProfile();
  };

  const handleEnterClick = (e) => {};

  const handleProfileSave = async () => {
    let res = await dispatch(
      authActions.changeProfile(userInfo && userInfo.uuidIdentifier, {
        firstName,
        lastName,
        collegeName,
      })
    );

    localStorage.setItem("userInfo", JSON.stringify(res.userInfo));

    if (res.statusCode === 200) {
      handleProfile();
    } else {
      dispatch(authActions.showAlert("error", "danger"));
    }
  };

  return (
    <>
      <div
        className="bg-blur-styling text-white justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none "
        onKeyPress={handleEnterClick}
      >
        <div className="relative my-3 mx-4 md:mx-auto md:w-1/4">
          {/*content*/}
          <div
            style={{ backgroundColor: "#191c21", height: "400px" }}
            className="border-0 rounded-lg shadow-lg relative flex flex-col w-full  outline-none focus:outline-none"
          >
            {/*header*/}
            <div className="flex items-start justify-between px-3 pt-4 rounded-t">
              <p className="font-medium flex mb-5 text-primary text-lg pl-5 mt-5">
                <span>Profile</span>
              </p>
              <div
                className="p-1 ml-auto bg-transparent border-0 text-white text-3xl leading-none font-semibold outline-none focus:outline-none cursor-pointer"
                onClick={handleProfile}
              >
                <img src="/close.svg" alt="close" width="14px" height="14px" />
              </div>
            </div>
            {/*body*/}
            <div className="relative pb-4 px-8 flex-auto text-center">
              <div className="text-left">
                <div style={{ backgroundColor: "#191c21" }} className="w-full">
                  <div className="flex" style={{ marginBottom: "-1.3rem" }}>
                    <CustomInput
                      id="First Name"
                      name="firstname"
                      label="First Name"
                      type="text"
                      style={{ marginRight: "0.3rem" }}
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <CustomInput
                      id="Last Name"
                      name="lastname"
                      label="Last Name"
                      type="text"
                      style={{ marginLeft: "0.3rem" }}
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                  <CustomInput
                    disabled
                    id="Email Id"
                    name="emailid"
                    label="Email Id"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <CustomInput
                    disabled
                    id="Phone Number"
                    name="phoneno"
                    label="Phone Number"
                    type="number"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                  />
                  {/* <CustomInput
                    id="Password"
                    name="password"
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  /> */}

                  <div className="flex justify-between font-semibold text-primary text-sm">
                    <p
                      className="cursor-pointer"
                      onClick={handleChangePassword}
                    >
                      CHANGE PASSWORD
                    </p>
                    <p className="cursor-pointer" onClick={handleSignOut}>
                      SIGNOUT
                    </p>
                  </div>
                  <div className="text-center mt-5">
                    <CustomButton
                      type="primary"
                      title="Save"
                      onClick={handleProfileSave}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileModal;
