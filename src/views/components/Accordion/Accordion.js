import React from "react";

import AccordionItem from "./AccordionItem";

const Accordion = ({ questionsAnswers }) => {
  const [activeIndex, setActiveIndex] = React.useState(-1);

  const renderedQuestionsAnswers = questionsAnswers?.map((item, index) => {
    const showDescription = index === activeIndex ? "block" : "hidden";
    return (
      <AccordionItem
        showDescription={showDescription}
        item={item}
        index={index}
        key={index}
        onClick={() => {
          activeIndex === index ? setActiveIndex(-1) : setActiveIndex(index);
        }}
      />
    );
  });

  return <div className="">{renderedQuestionsAnswers}</div>;
};

export default Accordion;
