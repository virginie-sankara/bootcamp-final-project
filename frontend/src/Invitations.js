import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

const Invitations = ({ userData, userInvites }) => {
  const navigate = useNavigate();
  // SORT : invitations from most recent to less recent
  const [sortedInvitations, setSortedInvitations] = useState([]);

  useEffect(() => {
    if (userInvites) {
      const sorted = [...userInvites].sort(
        (a, b) => new Date(b.creationDate) - new Date(a.creationDate)
      );
      setSortedInvitations(sorted);
    }
  }, [userInvites]);

  // console.log("INVITATIONS", userInvites);

  return (
    <>
      <h2>Invitations</h2>
      {/* Immediately invoked function expression */}
      {(() => {
        if (userInvites === null) {
          return <p>Loading...</p>;
        } else if (userInvites.length === 0) {
          return (
            <>
              <h3>No request, no problem!</h3>
              <p>
                You can always make your own invitation for a new binge-watching
                session
              </p>
              <button
                onClick={() => {
                  navigate("/form");
                }}
              >
                Start a new match
              </button>
              <p>
                (just don't blame us if you end up staying up all night and
                regretting it in the morning)
              </p>
            </>
          );
        } else {
          return sortedInvitations.map((invitation) => {
            if (invitation.formData2 === null) {
              return (
                <div key={invitation._id}>
                  {invitation.host[0].username}
                  <HostAvatar src={invitation.host[0].avatarSrc} />
                  {new Date(invitation.creationDate).toLocaleString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })}

                  <button
                    onClick={() => {
                      navigate(`/invitation-response/${invitation._id}`);
                    }}
                  >
                    Respond
                  </button>
                </div>
              );
            }
          });
        }
      })()}
    </>
  );
};

const HostAvatar = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
`;

export default Invitations;
