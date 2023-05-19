import { useSelector } from "react-redux";

const AuthBase = ({ children, currentStep, currentShowingType }) => {
  const { is_mobile: isMobile } = useSelector((state) => state.levelUp);

  const eclipseImg = !isMobile
    ? {
        backgroundImage: `url('/bg-login-form.svg')`,
        height: "100vh",
        width: "60vw",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right",
        backgroundSize: "cover",
      }
    : { backgroundSize: "cover" };
  return (
    <>
      <div className="relative flex flex-col md:flex-row md:justify-between content-width md:mx-auto items-center h-full w-screen">
        {((currentStep === 0 && isMobile) || !isMobile) && (
          <div
            // style={{ width: "40%" }}
            className=" flex flex-col items-center md:w-2/5 md:mb-6 h-2/3"
          >
            {isMobile ? (
              <img
                style={{
                  aspectRatio: "16:9",
                }}
                className="w-screen h-4/5"
                src="/login-image.png"
              />
            ) : (
              <img height={"50%"} width={"55%"} src="/login-img.svg" />
            )}
            {((currentStep === 0 && isMobile) || !isMobile) && (
              <div>
                <p className="font-bold text-xl text-gray-3 text-center md:mt-6 mt-3">
                  Download the App now!
                </p>
                <div className="flex md:mt-6 mt-3">
                  <img
                    className=" md:w-48 md:mr-2 w-28"
                    src="/google-play.svg"
                    alt="playstore"
                  />
                  <img
                    className="md:w-48 ml-2 w-28"
                    src="/apple-store.svg"
                    alt="playstore"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        <div
          style={eclipseImg}
          className="flex flex-col auth-section justify-center items-center md:w-1/2"
        >
          <div
            style={{
              backgroundColor: !isMobile ? "#1D1F21" : "",
            }}
            className="md:h-4/6 md:w-1/2 rounded-2xl md:mb-6 "
          >
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthBase;
