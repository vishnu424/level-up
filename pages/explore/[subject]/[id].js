import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { videosActions } from "../../../src/application/actions/Videos.Actions";

import VideoSection from "../../../src/views/components/VideoSection/VideoSection";

function Index() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  useEffect(async () => {
    id && (await dispatch(videosActions.getVideoDetailsByTopic(id, 0)));
  }, [id]);

  return (
    <>
      <div className="bg-black bg-opacity-90 relative min-h-screen ">
        <VideoSection id={id} />
      </div>
    </>
  );
}

export default Index;
