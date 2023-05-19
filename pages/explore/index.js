import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import ReactJWPlayer from "react-jw-player";
import { levelUpActions } from "../../src/application/actions/LevelUp.actions";

import TopicCard from "../../src/views/components/TopicCard";
import { subjectsActions } from "../../src/application/actions/Subject.actions";
import { topicsActions } from "../../src/application/actions/Topics.actions";
import Link from "next/link";
import CustomAlert from "../../src/views/components/CustomAlert/CustomAlert";

function Expore() {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.access_token);
  const { authenticated } = useSelector((state) => state.auth);

  const {
    continue_reading_data: continueData,
    continue_reading_loading: continueReadingLoading,
    get_recomendations_data: recomendationData,
    get_recomendations_loading: recomendationLoading,
  } = useSelector((state) => state.levelUp);

  const { topics_loading: topicLoading, topics_data: topicsData } = useSelector(
    (state) => state.topics
  );

  const { subjects_data: subjectsData } = useSelector(
    (state) => state.subjects
  );

  useEffect(() => {
    dispatch(subjectsActions.getSubjects());
    dispatch(topicsActions.getTopics());
    dispatch(levelUpActions.recomendedData());
    dispatch(levelUpActions.continueLearningData());
  }, []);

  const getGoToCourseCard = () => {
    return (
      <div className="relative ">
        <div
          style={{
            background: "#000000",
            opacity: "0.8",
            backdropFilter: "blur(487px)",
            borderRadius: "24px",
            boxShadow: "rgba(0, 0, 0, 0.45) 0px 25px 20px -20px",
            boxSizing: "border-box",
          }}
          className="h-64 hidden w-2/6 absolute -top-80 right-4 md:flex justify-center items-center p-6"
        >
          <img
            className="h-52 w-44 mr-6"
            src="./karthik.png"
            // {videoData && videoData["thumbnailUrl.url"]}
            alt="author"
          />
          <div>
            <p className="font-bold text-2xl text-white ">Karthik Subbaraj</p>
            <p className="text-xs font-normal" style={{ color: "#C7C7C7" }}>
              Teaches Filmaking
            </p>
            <p className="text-xs font-normal  text-white mb-8 mt-4">
              Karthik Subbaraj tells us how his passion for film began and what
              they meant to him as a child. He narrates his..
            </p>
            <Link href="/explore/Film/bbe5ccd5-05a9-4020-a55c-c719df8707d5">
              <button
                style={{ background: "#EA5437", borderRadius: "42px" }}
                className="font-normal text-sm h-9 w-32  text-white "
              >
                Go to Course
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="bg-black pb-10 min-h-screen box-border">
        {topicLoading ? (
          ""
        ) : (
          <div>
            <ReactJWPlayer
              playerId="my-unique-id"
              // aspectRatio="2.3:1"
              playerScript="https://content.jwplatform.com/libraries/j9BLvpMc.js"
              file="https://cdn.jwplayer.com/videos/oCMoTmgF-d5bxSp2Y.mp4"
              image="https://basidia.s3.ap-south-1.amazonaws.com/resized_1650526835698_337bf633-724d-457a-85ef-8e662b3a2686.jpg"
              // {topicsData[0]?.["thumbnailUrl.url"]}
              // {videoData?.urlHigh}
              // onReady={onReady}
              aspectRatio="16:9"
            />
            {getGoToCourseCard()}

            {continueData !== null && Object?.keys(continueData)?.length && (
              <div className="md:pl-16 pl-2 mb-6 mt-6">
                <p className="font-bold text-2xl text-white  mt-2 mb-2">
                  Continue Learning
                </p>
                <Link
                  href={`/explore/${continueData?.["subject.name"]}/${continueData?.["topic.uuidIdentifier"]}`}
                >
                  <div
                    className="mr-4 ml-2 cursor-pointer w-64"
                    onClick={() =>
                      dispatch(
                        topicsActions.selectVideo(continueData?.uuidIdentifier)
                      )
                    }
                  >
                    <img
                      style={{
                        aspectRatio: "16:9",
                        objectFit: "cover",
                        background:
                          "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%)",
                        borderRadius: "5px",
                      }}
                      height={200}
                      width={250}
                      src={continueData?.["thumbnailUrl.url"]}
                      alt="continueData"
                    />
                  </div>
                </Link>
              </div>
            )}
            <div className="md:pl-16 pl-2">
              {subjectsData?.map((eachSubject) => {
                return (
                  <div key={eachSubject.uuidIdentifier} className="mt-4 mb-4">
                    <p className="font-bold text-2xl text-white  mt-2 mb-2">
                      {topicsData?.filter(
                        (each) =>
                          each["subject.uuidIdentifier"] ===
                          eachSubject.uuidIdentifier
                      ).length > 0 && eachSubject?.name}
                    </p>
                    <div className="flex items-center">
                      {topicsData?.map(
                        (eachTopic) =>
                          eachSubject?.uuidIdentifier ===
                            eachTopic?.["subject.uuidIdentifier"] && (
                            <li key={eachTopic.uuidIdentifier}>
                              <TopicCard topic={eachTopic} />
                            </li>
                          )
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Expore;
