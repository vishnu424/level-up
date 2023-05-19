import React from "react";

import Link from "next/link";

const SubscriptionLockModel = ({ planId, isVisible, setIsVisble }) => {
  return (
    <>
      {isVisible && (
        <div className="bg-blur-styling justify-center items-center flex overflow-x-hidden overflow-y-auto scroll-smooth fixed inset-0 z-50 outline-none focus:outline-none py-4 ">
          <div className="m-auto">
            <div
              className="border-0 md:w-96 w-80  rounded-2xl font-open-sans  shadow-lg  flex   flex-col outline-none focus:outline-none"
              style={{
                height: "100%",
                borderRadius: "30px",
                backgroundColor: "#262A30",
              }}
            >
              <div className="px-5 pt-3 pb-6">
                <div
                  className="flex flex-row-reverse   self-end  pl-10   rounded-t cursor-pointer "
                  onClick={() => {
                    setIsVisble(false);
                  }}
                >
                  <img
                    src="/xmark.svg"
                    alt="close"
                    width="18px"
                    height="20px"
                  />
                </div>

                <div className="flex  flex-col">
                  <div>
                    <h1
                      style={{
                        fontWeight: "600",
                        fontSize: "27px",
                        lineHeight: "46px",
                      }}
                      className="text-white text-left"
                    >
                      Get Access to
                    </h1>
                    <ol
                      style={{
                        fontSize: "14px",
                        lineHeight: "28px",
                        color: "#FFFFFF",
                      }}
                      className="list-decimal font-normal pl-6 mt-1 mb-2"
                    >
                      <li>4+ hours of course content</li>
                      <li>Signed certificate from the Instructor</li>
                      <li>Exclusive workshops and events</li>
                    </ol>
                  </div>

                  <div className="flex flex-col self-center justify-center items-center mb-2 mt-4">
                    <img
                      src="/lock-img.png"
                      alt="lock"
                      height={140}
                      width={140}
                    />
                    <h1
                      style={{
                        fontSize: "32px",
                      }}
                      className="font-bold text-white mb-2 mt-1"
                    >
                      Locked
                    </h1>
                    <p
                      style={{
                        fontSize: "14px",
                      }}
                      className="text-center font-normal text-white mb-1"
                    >
                      Pay once, Learn Forever
                    </p>
                  </div>

                  <>
                    <Link href={`/subscription/${planId && planId}`}>
                      <button
                        style={{
                          backgroundColor: "#EA5437",
                          borderRadius: "8px",
                          height: "45px",
                          width: "160px",
                          color: "white",
                        }}
                        type="button"
                        //   onClick={() => setShowSubscriptionModal(true)}
                        className={` mt-3 mb-1 self-center uppercase primary font-bold py-2 text-[22px] leading-[25px] focus:outline-none flex items-center justify-center cursor-pointer`}
                      >
                        Buy Now
                      </button>
                    </Link>
                    {/* <Link href="/subscription">
                      <p className="text-white text-center mt-2 cursor-pointer">
                        More Plans
                      </p>
                    </Link> */}
                  </>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SubscriptionLockModel;
