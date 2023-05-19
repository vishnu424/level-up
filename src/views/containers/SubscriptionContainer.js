import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { levelUpActions } from "../../application/actions/LevelUp.actions";
import { subscriptionActions } from "../../application/actions/Subscription.action";
import Faq from "../components/Faq/Faq";
import SubscriptionPlans from "../components/Subscription/SubscriptionPlans";
import SubscriptionPlansCarousel from "../components/Subscription/SubscriptionPlansCarousel";

const SubscriptionContainer = () => {
  const dispatch = useDispatch();

  const { subscription_loading: subscriptionLoading } = useSelector(
    (state) => state.subscription
  );

  const [selectedTab, setSelectedTab] = useState("COURSES");
  const [userSubscriptionData, setUserSubscriptionData] = useState([]);
  const { is_mobile: isMobile } = useSelector((state) => state.levelUp);
  const userInfo = useSelector((state) => state.auth.userInfo);

  useEffect(async () => {
    const resp = await dispatch(
      levelUpActions.isUserSubscribed(userInfo.uuidIdentifier)
    );

    let myArray = [];
    resp.map((each) => myArray.push(each.subscriptionUuidIdentifier));

    setUserSubscriptionData(myArray);
    dispatch(subscriptionActions.getSubscriptionPlans());
  }, []);

  return (
    <>
      {subscriptionLoading ? (
        ""
      ) : (
        <div
          style={{ backgroundColor: "#1D1F21" }}
          className="min-h-screen flex flex-col"
        >
          <div
            style={{ backgroundColor: isMobile ? "1D1F21" : "#F8F9FA" }}
            className="flex justify-center w-full pb-10 "
          >
            <div
              style={{ width: "85%" }}
              className="flex justify-between w-full md:pt-8"
            >
              <SubscriptionPlansCarousel />
              {!isMobile && (
                <SubscriptionPlans
                  userSubscriptionData={userSubscriptionData}
                />
              )}
            </div>
          </div>
          {isMobile && (
            <div className="flex pt-4 text-white justify-around items-center pb-1">
              <div
                onClick={() => setSelectedTab("COURSES")}
                className="flex flex-col items-center justify-center"
              >
                <hr
                  className="mb-1"
                  style={
                    selectedTab === "COURSES"
                      ? {
                          width: "120px",
                          height: "0px",
                          border: "3px solid #EA5437",
                          borderRadius: "5px",
                          transform: "rotate(-0.28deg)",
                        }
                      : {}
                  }
                />

                <p>COURSES</p>
              </div>
              <div
                className="flex flex-col items-center justify-center"
                onClick={() => setSelectedTab("FAQ")}
              >
                <hr
                  className="mb-1"
                  style={
                    selectedTab === "FAQ"
                      ? {
                          width: "120px",
                          height: "0px",
                          border: "3px solid #EA5437",
                          borderRadius: "5px",
                          transform: "rotate(-0.28deg)",
                        }
                      : {}
                  }
                />

                <p>FAQS</p>
              </div>
            </div>
          )}
          <div className="flex flex-col  items-center ">
            <div className="" style={{ width: "85%" }}>
              {(selectedTab === "FAQ" || !isMobile) && <Faq />}
              {isMobile && selectedTab === "COURSES" && (
                <SubscriptionPlans
                  userSubscriptionData={userSubscriptionData}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SubscriptionContainer;
