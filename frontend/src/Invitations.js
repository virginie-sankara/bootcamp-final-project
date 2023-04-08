import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

const Invitations = ({ userData, userInvites }) => {
  console.log("ici");
  console.log(userInvites);
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

  return (
    <>
      <h2>Invitations</h2>

      {!userInvites ? (
        <h2>No invitations received</h2>
      ) : (
        sortedInvitations.map((invitation) => {
          if (invitation.formData2 === null) {
            return (
              <div key={invitation._id}>
                {invitation.hostUsername}
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
        })
      )}
    </>
  );
};

export default Invitations;
