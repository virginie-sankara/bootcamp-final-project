import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

const Invitations = ({ userData, userInvites }) => {
  console.log("ici");
  console.log(userInvites);
  const navigate = useNavigate();

  return (
    <>
      <h2>Invitations</h2>

      {!userInvites ? (
        <h2>No invitations received</h2>
      ) : (
        userInvites.map((invitation) => {
          return (
            <div key={invitation._id}>
              {invitation.host}
              {invitation.creationDate.slice(0, -24)}

              <button
                onClick={() => {
                  navigate(`/invitation-response/${invitation._id}`);
                }}
              >
                Respond
              </button>
            </div>
          );
        })
      )}
    </>
  );
};

export default Invitations;
