import { useRef } from "react";
import { useDispatch } from "react-redux";
// import { topicActions } from "../../../application/actions/Topic.actions";

const CustomSearch = ({
  inputValue,
  setInputValue,
  handleClearSearch,
  handleSearch,
  showSearchModal,
  setShowSearchModal,
}) => {
  const dispatch = useDispatch();
  const searchInput = useRef(null);

  const handleClick = () => {
    if (document.activeElement === searchInput.current) {
      showSearchModal !== "active" && setShowSearchModal("active");
      // showSearchModal !== "active" &&
      //   dispatch(topicActions.setSearchShow("active"));
    } else {
      setShowSearchModal("");
      // dispatch(topicActions.setSearchShow(""));
    }
  };

  return (
    <div
      className="relative flex mb-3 flex-row-reverse"
      style={{ width: "350px" }}
      // onChange={handleSearch}
    >
      <input
        style={{
          borderWidth: "3px",
          borderColor: "#374151",
        }}
        onClick={handleClick}
        ref={searchInput}
        id="search"
        name="search"
        type="text"
        placeholder="Search"
        autoComplete="off"
        className="pl-14 pr-3 py-2 placeholder-gray-400 text-gray-400 relative bg-transparent  text-lg outline-none focus:outline-none border-2 w-full  rounded-xl"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          handleSearch(e.target.value);
        }}
      />
      <span className="z-0 h-full leading-snug font-normal  text-center text-gray-400 absolute bg-transparent rounded text-base items-center justify-center w-8 left-4 pl-2 pt-4">
        <img
          src="/search.svg"
          alt="search"
          height={"100%"}
          width="17px !important"
        />
      </span>
      {inputValue ? (
        <span
          className="z-0 h-full leading-snug font-normal  text-center text-gray-400 absolute bg-transparent rounded text-base items-center justify-center right-5 cursor-pointer"
          style={{ paddingTop: "1.12rem" }}
          onClick={handleClearSearch}
        >
          <img
            src="/searchCross.svg"
            alt="search cross"
            layout="fill"
            width="14px !important"
            height="15px !important"
          />
        </span>
      ) : (
        ""
      )}
    </div>
  );
};

export default CustomSearch;
