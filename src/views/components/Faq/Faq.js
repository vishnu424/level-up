import { useSelector } from "react-redux";
import Accordion from "../Accordion/Accordion";

const Faq = () => {
  const faqData = useSelector(
    (state) => state.subscription.subscription_plans[0]?.faqs
  );
  return (
    <>
      {faqData?.length > 0 && (
        <div className="md:bg-white w-full py-14 ">
          <section className={`content-width mx-auto px-4 lg:px-0  `}>
            <h1 className="text-white md:text-black sm:text-4xl  capitalize font-alegreya-sans-semibold font-semibold mb-4 content-heading text-website-primary">
              FAQ
            </h1>
            <Accordion questionsAnswers={faqData} />
          </section>
        </div>
      )}
    </>
  );
};

export default Faq;
