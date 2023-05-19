import Link from "next/link";
import ReactHtmlParser from "react-html-parser";
import { useDispatch, useSelector } from "react-redux";
import { topicsActions } from "../../application/actions/Topics.actions";
import { videosActions } from "../../application/actions/Videos.Actions";

const SearchModal = ({
  setShowSearchModal,
  wrapperRef,
  inputValue,
  setInputValue,
}) => {
  const dispatch = useDispatch();

  const { search_data: searchData, searc_data_loading: searchLoading } =
    useSelector((state) => state.topics);
  const handleSearchList = async (id, type) => {
    type == "video" && (await dispatch(topicsActions.selectVideo(id)));
    setInputValue("");
    setShowSearchModal(false);
  };

  return (
    <>
      {inputValue && (
        <>
          <div
            className=" bg-black flex overflow-x-hidden overflow-y-scroll scroll-smooth fixed top-20 z-50 outline-none focus:outline-none "
            style={{ left: "24%", right: "44%", maxHeight: "45%" }}
          >
            <div className="relative " style={{ width: "100%" }}>
              <div
                ref={wrapperRef}
                className="border-0 rounded-lg shadow-lg relative flex flex-col w-full  outline-none focus:outline-none"
              >
                <div className="relative px-4 pb-5 flex-auto ">
                  {searchLoading
                    ? ""
                    : searchData.length > 0
                    ? searchData &&
                      searchData?.map((item, index) => (
                        <>
                          <Link
                            href={`/explore/${item.subjectName}/${item.topicId}`}
                          >
                            <div
                              key={index}
                              style={{
                                boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                                width: "80%",
                              }}
                              className="flex bg-primary flex-col mt-4 mb-4 cursor-pointer px-4 py-4"
                              onClick={() =>
                                handleSearchList(item.contentId, item.type)
                              }
                            >
                              <p className="text-white  ">
                                {ReactHtmlParser(unescape(item.title))}
                              </p>

                              <div className="flex text-gray-400 justify-between items-center">
                                <p className="text-xs">
                                  {ReactHtmlParser(unescape(item.title))}
                                </p>
                                <p className="text-custom-gray-1 uppercase text-orange-1">
                                  {item.type}
                                </p>
                              </div>
                            </div>
                          </Link>
                        </>
                      ))
                    : inputValue && (
                        <p className="text-center text-white py-16">
                          Not finding what you are looking for ? <br />
                          <span className="text-blue-400 mr-1">
                            <a
                              href={`https://wa.me/7200791962?text=Request for New Content ${inputValue} `}
                              target="_blank"
                            >
                              Click here
                            </a>
                          </span>
                          to request
                        </p>
                      )}
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed left-0 top-20 right-0 bottom-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
};

export default SearchModal;
