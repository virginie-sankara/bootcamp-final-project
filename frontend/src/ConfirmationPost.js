import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ConfirmationPost = () => {
  const navigate = useNavigate();
  const { matchId } = useParams();
  const [matchData, setMatchData] = useState(null);
  // random confirmationMessage
  const [randomMessage, setRandomMessage] = useState("");
  const confirmationMessages = [
    "Thanks for submitting your answers! You rock!",
    "Your answers have been received loud and clear. Thanks a bunch!",
    "High five! Your answers have been submitted successfully.",
    "Boom! Your answers have been processed. Thanks for taking the time!",
    "Your answers have been submitted. You're basically a genius.",
    "Submission successful. You're crushing it, keep it up!",
    "Your answers have been received. We're pretty impressed, not gonna lie.",
    "Well done! Your answers have been submitted. You're officially awesome.",
    "Boom! Your answers have been submitted. Thanks for being awesome!",
    "Well, well, well, look who submitted their answers like a boss. You did, and we're impressed.",
    "Yaaas ! Your answers have been submitted flawlessly. Keep slaying.",
    "Your answers have been successfully transmitted. If only all transmissions were this easy, amirite?",
    "You just knocked out those answers like a boss. Consider them submitted and consider yourself a boss.",
  ];

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * confirmationMessages.length);
    setRandomMessage(confirmationMessages[randomIndex]);
  }, []);

  //   GET matchData
  //   GET : Match to complete
  useEffect(() => {
    if (matchId) {
      fetch(`/match/${matchId}`)
        .then((res) => res.json())
        .then((response) => {
          if (response.status === 400 || response.status === 500) {
            throw new Error(response.message);
          } else {
            setMatchData(response.match);
            console.log("matchData here");
            console.log(response.match);
          }
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    }
  }, []);

  return (
    <>
      <h2>{randomMessage}</h2>
      {/* IF confirmation from POST */}
      {matchData && matchData.formData2 === null && (
        <>
          <p>
            {matchData.partnerUsername} has received your match request. Happy{" "}
            {matchData.type === "tv" ? (
              <span>TV show</span>
            ) : (
              <span>movie</span>
            )}{" "}
            binge-watching !
          </p>
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </button>
        </>
      )}
      {/* // IF confirmation from PATCH */}
      {matchData && matchData.formData2 !== null && (
        <>
          <p>
            The suspense is killing us! Click down here to find out which{" "}
            {matchData.type === "tv" ? (
              <span>TV show</span>
            ) : (
              <span>movie</span>
            )}{" "}
            you'll be watching with{""} {matchData.hostUsername}.
          </p>
          <button
            onClick={() => {
              navigate(`/match-result/${matchId}`);
            }}
          >
            Discover result
          </button>
        </>
      )}
    </>
  );
};
export default ConfirmationPost;
