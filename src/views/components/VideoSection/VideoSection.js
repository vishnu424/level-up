import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { videosActions } from "../../../application/actions/Videos.Actions";

import VideoList from "./VideoList";
import VideoPlay from "./VideoPlay";

function VideoSection({ id }) {
  const dispatch = useDispatch();

  const { videos_last_sync_time: lastSyncTime } = useSelector(
    (state) => state.videos
  );
  const { is_mobile: isMobile } = useSelector((state) => state.levelUp);
  const [selected, setSelected] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [videoCompleted, setVideoCompleted] = useState(false);

  useEffect(async () => {
    videoCompleted &&
      (await dispatch(videosActions.getVideoDetailsByTopic(id, lastSyncTime)));
  }, [videoCompleted]);

  return (
    <div className="flex flex-col md:flex-row justify-between  mx-auto  pt-5 px-4">
      <div style={{ width: isMobile ? "100%" : "65%" }}>
        <VideoPlay
          selected={selected}
          setSelected={setSelected}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          setVideoCompleted={setVideoCompleted}
        />
      </div>

      <div
        style={{ width: isMobile ? "100%" : "36%", maxHeight: "100%" }}
        className="overflow-y-scroll h-screen md:px-4"
      >
        <VideoList
          selected={selected}
          setSelected={setSelected}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          setVideoCompleted={setVideoCompleted}
        />
      </div>
    </div>
  );
}

export default VideoSection;
