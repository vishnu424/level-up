import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { levelUpActions } from "../../application/actions/LevelUp.actions";

const SubjectCard = ({ subject }) => {
  const dispatch = useDispatch();

  const { topics_data: TopicsData } = useSelector((state) => state.levelUp);

  const onClickSubject = (subjectId) => {
    // dispatch(levelUpActions.getVideoDetailsByTopic(topicId));
    dispatch(levelUpActions.selectSubject(subjectId));
  };
  return (
    <Link href="/profile">
      <div
        onClick={() => onClickSubject(subject.uuidIdentifier)}
        className="mr-4 ml-2 cursor-pointer"
      >
        <img className="h-80 w-80 " src={subject?.thumnail} alt="" />
        <p
          style={{
            color: "#D0D0D0",
          }}
          className="font-bold text-lg text-white mt-2 text-center"
        >
          {subject?.name}
        </p>
      </div>
    </Link>
  );
};

export default SubjectCard;
