import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import InvitationBackground from "./assets/InvitationBackground.png";

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

  console.log("INVITATIONS", userInvites);

  return (
    <PageWrapper>
      <PageTitle>Invitations</PageTitle>
      {/* Immediately invoked function expression */}
      {(() => {
        if (userInvites === null) {
          return <p>Loading...</p>;
        } else if (userInvites.length === 0) {
          return (
            <TextWrapper>
              <h3>No request, no problem !</h3>
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
            </TextWrapper>
          );
        } else {
          return sortedInvitations.map((invitation) => {
            if (invitation.formData2 === null) {
              return (
                <InvitationDiv key={invitation._id}>
                  <InvitationHeader>
                    <CreationDate>
                      {new Date(invitation.creationDate).toLocaleString(
                        "en-US",
                        {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                        }
                      )}
                    </CreationDate>
                  </InvitationHeader>

                  <HostAvatar src={invitation.host[0].avatarSrc} />
                  <p>
                    {invitation.host[0].username} wants to watch a{" "}
                    {invitation.type === "movie" ? "movie" : "TV show"} with you
                  </p>

                  <button
                    onClick={() => {
                      navigate(`/invitation-response/${invitation._id}`);
                    }}
                  >
                    Respond
                  </button>
                </InvitationDiv>
              );
            }
          });
        }
      })()}
    </PageWrapper>
  );
};

const PageTitle = styled.h1`
  font-size: 60px;
`;

const PageWrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-image: url("https://images.unsplash.com/photo-1636955779321-819753cd1741?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2942&q=80");
  background-repeat: no-repeat;
  background-size: cover;
  text-align: center;
  align-items: center;
`;

const TextWrapper = styled.div`
  //   border: 2px solid white;
  border-radius: 20px;
  padding: 20px;
  max-width: 600px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.3);
  margin: auto;
`;

const InvitationDiv = styled.div`
  background-image: url(${InvitationBackground});
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 20px;
  border: white solid 1px;
  width: 80vw;
  margin: auto auto 20px auto;
`;

const InvitationHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 10px;
`;

const CreationDate = styled.p`
  font-size: 10px;
`;

const HostAvatar = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
`;

export default Invitations;
