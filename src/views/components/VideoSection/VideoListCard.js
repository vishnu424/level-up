import Link from "next/link";
import React from "react";
import WebsiteButton from "../Button/WebsiteButton";

function VideoListCard({ bg, data, index }) {
  return (
    <div
      className="px-3 py-4 rounded-2xl cursor-pointer"
      style={{ backgroundColor: bg, fontFamily: "DM Sans" }}
    >
      <div className="flex gap-5 relative items-center">
        <img
          height={"100%"}
          width={"55%"}
          src={data?.["thumbnailUrl.url"]}
          className="rounded-lg"
        />

        <p
          className="absolute top-2 left-1 z-20 opacity-60 text-center  flex justify-center items-center"
          style={{
            background: "#2F3641",
            width: "45px",
            height: "18px",
            opacity: 0.6,
            borderRadius: "30px",
            color: "#FFFBFB",
            fontFamily: "Work Sans",
            fontSize: "10px",
          }}
        >
          {data?.duration}:00
        </p>

        <div>
          <p className="text-lg  text-white-0 mb-3 font-bold leading-5">
            {data?.title}
          </p>
          <WebsiteButton
            style={{
              backgroundColor:
                data?.lessonStatus === "completed"
                  ? "#02A552"
                  : data?.lessonStatus === "paused" ||
                    data?.lessonStatus === "started"
                  ? "#ea5437"
                  : "#2F3641",
              fontSize: "10px",
              height: "25px",
              width: "83px",
            }}
            px="px-2"
            py="py-2"
            textSize="text-xs"
          >
            LESSON {index}
          </WebsiteButton>
        </div>
      </div>
      <p className="text-base text-gray-1 mt-3 leading-5">
        {data?.description}
      </p>
    </div>
  );
}

export default VideoListCard;
