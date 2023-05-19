import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

// import { v4 as uuidv4 } from "uuid";

import Image from "next/image";
import { useSelector } from "react-redux";

import SubscriptionModal from "./SubscriptionModal";
import Link from "next/link";

const SubscriptionPlans = ({ userSubscriptionData }) => {
  const router = useRouter();
  const { id } = router.query;

  const SubscriptionData = useSelector(
    (state) => state.subscription.subscription_plans
  );
  const { is_mobile: isMobile } = useSelector((state) => state.levelUp);
  const [activeId, setActiveId] = useState(
    SubscriptionData[0]?.durationArr[0]?.uuidIdentifier
  );
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  const [selectedPlanPrice, setSelectedPlanPrice] = useState("");

  const [subScriptionId, setSubscriptionId] = useState("");
  const [subscriptionPlanDuration, setSubscriptionPlanDuration] = useState("");

  const [subscriptionStatus, setsubscriptionStatus] = useState("");
  const [subscriptionTitle, setsubscriptionTitle] = useState("");

  const newDate = new Date();

  const monthsAdded = newDate.setMonth(
    newDate.getMonth() + subscriptionPlanDuration
  );
  const validityDate = new Date(monthsAdded)
    .toISOString()
    .replace(/T.*/, "")
    .split("-")
    .reverse()
    .join("-");

  const onClickPlan = (subscriptionId, planAmount, duration, status, title) => {
    setSelectedPlanPrice(planAmount);
    setSubscriptionId(subscriptionId);
    setSubscriptionPlanDuration(duration);
    setsubscriptionStatus(status);
    setsubscriptionTitle(title);
    if (subscriptionId === activeId) {
      setActiveId("");
    } else {
      setActiveId(subscriptionId);
    }
  };

  useEffect(() => {
    if (id) {
      const data =
        SubscriptionData &&
        SubscriptionData[0] &&
        SubscriptionData[0]?.durationArr.filter(
          (each) => each.uuidIdentifier === id
        );

      data?.length &&
        onClickPlan(
          data[0].uuidIdentifier,
          data[0].amount,
          data[0].duration,
          data[0].active,
          data[0].title
        );

      data?.length && setShowSubscriptionModal(true);
    }
  }, []);
  return (
    <>
      <div className={`flex  font-open-sans flex-col`}>
        <div className="  px-3  ">
          <ul className=" list-none ">
            {SubscriptionData &&
              SubscriptionData[0] &&
              SubscriptionData[0]?.durationArr.map((each) => (
                <li
                  key={each.uuidIdentifier}
                  style={{
                    boxSizing: "border-box",
                    border: "1px solid #DADADA",

                    color:
                      activeId === each.uuidIdentifier ||
                      SubscriptionData[0]?.durationArr.length === 1
                        ? "#FFFFFF"
                        : "#181059",
                    height: "100%",

                    width: isMobile ? "100%" : "440px",
                    borderRadius: "5px",
                  }}
                  className={`bg-white p-2 md:p-3 mb-5 md:px-6 mt-3 ${
                    (activeId === each.uuidIdentifier ||
                      SubscriptionData[0]?.durationArr.length === 1) &&
                    "bg-subscription-card"
                  }`}
                  onClick={() =>
                    onClickPlan(
                      each.uuidIdentifier,
                      each.amount,
                      each.duration,
                      each.active,
                      each.title
                    )
                  }
                >
                  <div className="flex  justify-between items-center">
                    <h1 className="md:text-2xl font-bold w-3/4">
                      {each.title}
                    </h1>
                    <div className="flex justify-between items-center">
                      {!userSubscriptionData.includes(each.uuidIdentifier) &&
                        each?.offPercentage && (
                          <div className="mr-3 offers-bg flex flex-col justify-center items-center">
                            <p className="text-center font-semibold">
                              {each.offPercentage}%
                            </p>
                            <p className="text-center font-normal text-xs">
                              OFF
                            </p>
                          </div>
                        )}
                      {SubscriptionData[0]?.durationArr.length !== 1 &&
                        (activeId === each.uuidIdentifier ? (
                          <Image
                            src="/up-arrow-subscription.svg"
                            height={20}
                            width={20}
                            alt="close"
                          />
                        ) : (
                          <Image
                            src="/down-arrow-subscription.svg"
                            height={20}
                            width={20}
                            alt="open"
                          />
                        ))}
                    </div>
                  </div>
                  {(activeId === each.uuidIdentifier ||
                    SubscriptionData[0]?.durationArr.length === 1) && (
                    <div>
                      <p className=" mb-5 text-base">{each.description}</p>

                      <div className="flex justify-between items-center">
                        <div>
                          {/* <p
                            style={{
                              fontSize: "18px",
                              lineHeight: "20px",
                            }}
                            className="  text-[#6149A4]  font-normal"
                          >
                            <span
                              style={{
                                lineHeight: "20px",
                                fontSize: "20px",
                              }}
                              className=" font-literata text-white   font-bold   "
                            >
                              ₹ {Math.floor(each.amount / each.duration)}
                            </span>

                            <span className="opacity-50">{`  /month `}</span>
                          </p> */}
                          <p className="  font-normal">
                            <span className=" font-literata font-bold text-3xl">
                              ₹ {each.amount}
                            </span>

                            {/* <span
                              style={{
                                lineHeight: "20px",
                                fontSize: "16px",
                              }}
                              className="opacity-50"
                            >
                              {` /total `}
                            </span> */}
                          </p>
                        </div>

                        {userSubscriptionData &&
                        !userSubscriptionData.includes(each.uuidIdentifier) ? (
                          <button
                            style={{
                              backgroundColor: "#EA5437",
                              borderRadius: "5px",
                              height: "48px",
                              width: "175px",
                            }}
                            type="button"
                            onClick={() => setShowSubscriptionModal(true)}
                            className={` uppercase primary font-bold py-2  focus:outline-none flex items-center justify-center cursor-pointer`}
                          >
                            Buy Now
                          </button>
                        ) : (
                          <Link href="/explore">
                            <button
                              style={{
                                backgroundColor: "#02A552",
                                borderRadius: "5px",
                                height: "48px",
                                width: "175px",
                              }}
                              type="button"
                              className={` uppercase primary font-bold py-2  focus:outline-none flex items-center justify-center cursor-pointer`}
                            >
                              Go To Course
                            </button>
                          </Link>
                        )}
                      </div>
                    </div>
                  )}
                </li>
              ))}
          </ul>
        </div>
      </div>
      {showSubscriptionModal && (
        <SubscriptionModal
          subScriptionId={subScriptionId}
          setShowSubscriptionModal={setShowSubscriptionModal}
          selectedPlanPrice={selectedPlanPrice}
          subscriptionStatus={subscriptionStatus}
          subscriptionPlanDuration={subscriptionPlanDuration}
          subscriptionTitle={subscriptionTitle}
          validityDate={validityDate}
        />
      )}
    </>
  );
};

export default SubscriptionPlans;
