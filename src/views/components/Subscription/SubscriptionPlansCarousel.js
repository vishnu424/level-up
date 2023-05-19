import React from "react";
import Image from "next/image";
import Carousel from "react-elastic-carousel";
import { useSelector } from "react-redux";

const SubscriptionPlansCarousel = () => {
  const SubscriptionData = useSelector(
    (state) => state.subscription.subscription_plans
  );

  const isImages = SubscriptionData[0]?.images?.length;

  return (
    <>
      {isImages !== 0 && (
        <div className="" style={{ width: "620px" }}>
          {isImages > 1 ? (
            <Carousel
              enableAutoPlay={true}
              itemsToShow={1}
              preventDefaultTouchmoveEvent={false}
              autoPlaySpeed={3000}
              className=""
            >
              {SubscriptionData[0]?.images?.map((eachImage, srno) => (
                <li id={srno} className="text-center pt-2">
                  <img
                    className="rounded-2xl"
                    src={eachImage}
                    height={500}
                    width={560}
                    alt="offer"
                  />
                </li>
              ))}
              {/* <div className="text-center pt-2">
          <Image
            className="rounded-2xl"
            src="/subscription-carousel-1.png"
            height={500}
            width={560}
            alt="offer"
          />
        </div>

        <div className="text-center pt-2">
          <Image
            className="rounded-2xl"
            src="/subscription-carousel-2.png"
            height={500}
            width={560}
            alt="offer"
          />
        </div>
        <div className="text-center pt-2">
          <Image
            className="rounded-2xl"
            src="/subscription-carousel-3.png"
            height={500}
            width={560}
            alt="offer"
          />
        </div>

        <div className="text-center pt-2">
          <Image
            className="rounded-2xl"
            src="/subscription-carousel-4.png"
            height={500}
            width={560}
            alt="offer"
          />
        </div>
        <div className="text-center pt-2">
          <Image
            className="rounded-2xl"
            src="/subscription-carousel-5.png"
            height={500}
            width={560}
            alt="offer"
          />
        </div>
        <div className="text-center pt-2">
          <Image
            className="rounded-2xl"
            src="/subscription-carousel-6.png"
            height={500}
            width={560}
            alt="offer"
          />
        </div> */}
            </Carousel>
          ) : (
            <div className="text-center pt-2">
              <img
                className="rounded-2xl"
                src={SubscriptionData[0]?.images[0]}
                height={500}
                width={560}
                alt="offer"
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SubscriptionPlansCarousel;
