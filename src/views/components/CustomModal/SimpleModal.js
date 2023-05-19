import Link from "next/link";

import { memo } from "react";
import ReactHtmlParser from "react-html-parser";

const SimpleModal = ({ title, isVisible, setIsVisble }) => {
  return (
    <>
      {isVisible && (
        <>
          <div className="bg-blur-styling justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className="relative my-3 mx-auto md:w-1/4">
              <div
                style={{ backgroundColor: "#191c21", color: "white" }}
                className="bg-custom-gray-2 border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none"
              >
                <div className="flex items-start justify-between text-white p-3 rounded-t">
                  <div
                    className="p-1 ml-auto bg-transparent border-0 text-white text-3xl leading-none font-semibold outline-none focus:outline-none z-1 cursor-pointer"
                    onClick={() => setIsVisble(false)}
                  >
                    <img
                      src="/close.svg"
                      alt="close"
                      width="14px"
                      height="14px"
                    />
                  </div>
                </div>

                <div className="relative p-2 flex-auto text-center">
                  <div className="my-4  text-xl font-semibold mb-8">
                    {ReactHtmlParser(unescape(title))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default memo(SimpleModal);
