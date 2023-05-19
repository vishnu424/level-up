import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { levelUpActions } from "../../../application/actions/LevelUp.actions";
import { videosServices } from "../../../infrastructure/services/Videos.services";
import VideoListCard from "./VideoListCard";

function VideoList({
  selected,
  setSelected,
  selectedIndex,
  setSelectedIndex,
  setVideoCompleted,
}) {
  const dispatch = useDispatch();

  const {
    videos_by_topic_id: videosByTopicId,
    videos_by_topic_id_loading: videosLoading,
  } = useSelector((state) => state.videos);

  const onClickVideo = async (eachVideo, index) => {
    let videoId = selected?.uuidIdentifier;
    let videoData = {
      videoId,
      completionStatus: "paused",
      lastPausedDuration: 0,
    };

    selected.lessonStatus === "started" &&
      (await videosServices.videoEventListenerData(videoData, "video"));
    setSelected(eachVideo);
    setSelectedIndex(index);
    setVideoCompleted(true);
  };

  return (
    <div>
      {/* {videosData?.length && */}
      {videosByTopicId?.map((eachVideo, index) => (
        <div key={index} onClick={() => onClickVideo(eachVideo, index)}>
          <VideoListCard
            bg={index === selectedIndex ? "#272727" : "transparent"}
            data={eachVideo}
            index={index + 1}
          />
        </div>
      ))}
    </div>
  );
}

export default VideoList;
