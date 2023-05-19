import React, { useEffect, useState } from "react";
import WebsiteButton from "../Button/WebsiteButton";

import { useDispatch, useSelector } from "react-redux";

import SubscriptionLockModel from "../Subscription/SubscriptionLockModel";

import { videosServices } from "../../../infrastructure/services/Videos.services";
import { authActions } from "../../../application/actions/Auth.actions";

function VideoPlay({
  setSelected,
  selected,
  setSelectedIndex,
  selectedIndex,
  setVideoCompleted,
}) {
  const dispatch = useDispatch();
  const [showModel, setShowModel] = useState(false);
  const [pauseTime, setPauseTime] = useState(0);
  const { videos_by_topic_id: videosByTopicId, plan_details: planDetails } =
    useSelector((state) => state.videos);

  const { selected_video: selectedVideo } = useSelector(
    (state) => state.topics
  );

  // const [type, setType] = useState("");

  const VideoIndex = videosByTopicId?.findIndex(
    (each) => each.uuidIdentifier === selectedVideo
  );
  const { is_mobile: isMobile } = useSelector((state) => state.levelUp);
  useEffect(() => {
    videosByTopicId?.length &&
      setSelected(
        videosByTopicId[VideoIndex >= 0 ? VideoIndex : selectedIndex]
      );
    VideoIndex !== -1 && setSelectedIndex(VideoIndex);
  }, [VideoIndex, videosByTopicId]);

  // useEffect(() => {
  //   setShowModel(
  //     videosByTopicId[selectedIndex]?.status === "locked" ? true : false
  //   );
  // }, [selectedIndex]);

  const onClickEvent = async (type) => {
    if (selected.lessonStatus !== "completed") {
      let videoId = selected?.uuidIdentifier;
      let videoData =
        type === "paused" || type === "started"
          ? {
              videoId,
              completionStatus: type,
              lastPausedDuration: parseInt(pauseTime),
            }
          : {
              videoId,
              completionStatus: type,
            };

      await videosServices.videoEventListenerData(videoData, "video");
      await setPauseTime(0);
      type === "completed" && (await setVideoCompleted(true));
    }
  };

  useEffect(() => {
    if (selected) {
      const setup = async () => {
        jwplayer("myElement").setup({
          file: selected?.urlHigh,
          image: selected["thumbnailUrl.url"],
          autostart: true,
        });
        let totalTimeWatched = 0;
        let previousPosition = 0;

        await jwplayer().on("time", async (e) => {
          const { position } = e;
          totalTimeWatched += position - previousPosition;
          previousPosition = position;
          await setPauseTime(totalTimeWatched);
        });

        jwplayer().on("play", function (e) {
          selected.status === "locked" && jwplayer().remove();
          selected.status === "locked" && setShowModel(true);
          selected.status === "free" && onClickEvent("started");
        });

        jwplayer().on("pause", function (e) {
          selected.status === "free" && onClickEvent("paused");
        });
        jwplayer().on("complete", function (e) {
          onClickEvent("completed");
        });
      };
      jwplayer && setup();
    }
  }, [selected, showModel]);

  const onNext = async () => {
    let videoId = selected?.uuidIdentifier;
    let videoData = {
      videoId,
      completionStatus: "paused",
      lastPausedDuration: pauseTime,
    };
    selected.lessonStatus === "started" &&
      (await videosServices.videoEventListenerData(videoData, "video"));
    if (videosByTopicId?.length - 1 > selectedIndex) {
      setSelectedIndex(selectedIndex + 1);
      setSelected(videosByTopicId[selectedIndex + 1]);
    }
    setPauseTime(0);
  };

  const handleFile = () => {
    if (selected?.["pdfUrl.url"]) {
      const newWindow = window.open(
        selected?.["pdfUrl.url"],
        "_blank",
        "noopener,noreferrer"
      );
      if (newWindow) newWindow.opener = null;
    } else {
      dispatch(authActions.showAlert("PDF FILE NOT FOUND", "danger"));
    }
  };

  return (
    <>
      <SubscriptionLockModel
        planId={planDetails.length && planDetails[0]?.uuidIdentifier}
        isVisible={showModel}
        setIsVisble={setShowModel}
      />
      {selected && (
        <div className="md:pb-10 pb-4">
          <div id="myElement"></div>

          <section
            style={{
              fontFamily: "Inter",
            }}
            className="md:mt-10"
          >
            <div className="flex flex-col md:flex-row justify-between">
              <div>
                <p className="font-bold text-white md:text-3xl text-xl md:max-w-2xl">
                  Lesson {selectedIndex + 1} : {selected?.title}
                </p>
                <p className="text-white-2 text-base">
                  {selected && selected["instructor.name"]}
                </p>
              </div>
              <div
                onClick={() => {
                  onNext();
                }}
              >
                <WebsiteButton
                  style={
                    isMobile && {
                      width: "100%",
                      height: "40px",
                      borderRadius: "4px",
                    }
                  }
                  bg={"bg-orange-1"}
                >
                  Next Video
                </WebsiteButton>
              </div>
            </div>

            <div className={`${isMobile && "flex  flex-col-reverse"}`}>
              <p className=" hidden md:flex text-sm font-bold text-white mt-5">
                Lesson Overview
              </p>
              <p className="text-sm font-normal text-white mt-5">
                {selected?.description}
              </p>
              <div
                className="md:mt-5 mt-1 cursor-pointer"
                onClick={() => handleFile()}
              >
                <WebsiteButton
                  style={
                    isMobile && {
                      width: "100%",
                      height: "40px",
                      borderRadius: "4px",
                      background: "#2F3641",
                    }
                  }
                >
                  Download Coursebook
                </WebsiteButton>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default VideoPlay;
