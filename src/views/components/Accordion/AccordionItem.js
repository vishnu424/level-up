import { Link } from "next/link";
import { useSelector } from "react-redux";
const AccordionItem = ({ showDescription, item, index, onClick }) => {
  const { is_mobile: isMobile } = useSelector((state) => state.levelUp);
  let faqStatus = false;
  let indexValue = "";

  const getFaq = (item, id) => {
    if (item.includes("support@leveluplearning.in")) {
      faqStatus = true;
      indexValue = item.indexOf("support@leveluplearning.in");

      const text = item.slice(0, indexValue);

      return text;
    } else {
      faqStatus = false;
      return item;
    }
  };

  return (
    <div key={item.uuidIdentifier} className="w-full">
      <div className="cursor-pointer">
        <div
          style={{ width: "100%" }}
          className={`text-white md:text-custom-gray-1 py-5 ${
            showDescription
              ? "subscription-bottom"
              : showDescription === "hidden" && "border-bottom"
          } font-normal font-open-sans  flex justify-between items-center z-0`}
          onClick={onClick}
        >
          <p
            style={{
              color: isMobile ? "white" : "#546287",
            }}
            className={" font-bold"}
          >
            {item.question}
          </p>
          <div>
            <img
              src={showDescription === "hidden" ? "./plus.svg" : "./xmark.svg"}
              alt="arrow"
            />
          </div>
        </div>
      </div>
      <p
        style={{
          color: isMobile ? "white" : "#546287",
        }}
        id={`${index + 1}`}
        className={`${showDescription} `}
      >
        {getFaq(item.answer)}
        {faqStatus && (
          <a
            target="_blank"
            className="text-blue-400"
            href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=support@leveluplearning.in"
          >
            support@leveluplearning.in
          </a>
        )}
        {faqStatus && item.answer.slice(indexValue + 27)}
      </p>
      <div
        className={`border-bottom mt-2 w-full ${showDescription}`}
        style={{ width: "100%" }}
      ></div>
    </div>
  );
};
export default AccordionItem;
