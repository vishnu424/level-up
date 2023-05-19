// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { subscriptionActions } from "../../src/application/actions/Subscription.action";
import SubscriptionContainer from "../../src/views/containers/SubscriptionContainer";

const Subscription = () => {
  //   const dispatch = useDispatch;

  //   useEffect(() => {
  //     dispatch(subscriptionActions.getSubsciptionFaqs());
  //   }, []);
  return (
    <div>
      <SubscriptionContainer />
    </div>
  );
};

export default Subscription;
