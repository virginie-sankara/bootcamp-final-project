import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ConfirmationPost = () => {
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
    "Yaaas, queen/king! Your answers have been submitted flawlessly. Keep slaying.",
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

      {/* IF confirmation for match host */}
      {matchData.formData2 === null && (
        <p>
          Yay, {""}
          {matchData.hostUsername} has received your request to binge-watch{" "}
          {matchData.type === "tv" ? (
            <span>a tv show</span>
          ) : (
            <span>a movie</span>
          )}
          . Now it's time to settle in and press play!
        </p>
      )}
    </>
  );
};
export default ConfirmationPost;