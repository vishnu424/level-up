import Link from "next/link";
import { videosActions } from "../../application/actions/Videos.Actions";

const TopicCard = ({ topic }) => {
  // const onClickTopic = async (id) => {
  //   await dispatch(videosActions.getVideoDetailsByTopic(id));
  // };
  return (
    <Link href={`/explore/${topic["subject.name"]}/${topic.uuidIdentifier}`}>
      <div
        className="mr-4 ml-2 cursor-pointer w-64"
        //   onClick={() => onClickTopic(topic?.uuidIdentifier)}
      >
        <img
          style={{
            aspectRatio: "16:9",
            objectFit: "cover",
            background:
              "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%)",
            borderRadius: "5px",
          }}
          className=""
          height={"100%"}
          width={"100%"}
          src={topic?.["thumbnailUrl.url"]}
          alt="topic"
        />
        {/* <p
          style={{
            color: "#D0D0D0",
          }}
          className="font-bold text-lg text-white mt-1 text-center"
        >
          {topic?.name}
        </p> */}
      </div>
    </Link>
  );
};

export default TopicCard;
