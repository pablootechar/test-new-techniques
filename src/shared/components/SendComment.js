import React from "react";
import { useParams } from "react-router-dom";
import DatabaseApi from "../DatabaseApi";
import styled from "styled-components";

const CommentDiv = styled.div`
  bottom: 36px;
  width: 100%;
  background: #000;
  padding: 5px;
  display: flex;
  justify-content: space-between;
`;

const CommentInput = styled.input`
  width: 100%;
  margin-right: 5px;
  font-size: 18px;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.representativeColor};
  border-radius: 5px;
  padding: 5px;
  color: #f5f5f5;
`;

const CommentButton = styled.button`
  background: ${({ theme }) => theme.representativeColor};
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  font-weight: bold;
  color: #f5f5f5;
`;

export const SendComment = ({ onCommentSent, showModal, setShowModal }) => {
  const params = useParams();
  const { id: animeId, episodeNum } = params;
  const storageUserInfo = localStorage.getItem("@animatrix/profile");

  const clearInput = () => {
    const inputText = document.getElementById("input-comment");
    inputText.value = "";
  };

  const sendComment = async () => {
    if (storageUserInfo === null || typeof storageUserInfo === "undefined") {
      setShowModal(!showModal);
    } else {
      const { id: userId } = JSON.parse(storageUserInfo);
      const inputText = document.getElementById("input-comment");
      await DatabaseApi.sendComment(
        userId,
        inputText.value,
        animeId,
        episodeNum
      );
      clearInput();
      onCommentSent();
    }
  };

  return (
    <CommentDiv>
      <CommentInput
        id="input-comment"
        type="text"
        placeholder="Send your comment..."
        autoComplete="off"
      />
      <CommentButton onClick={sendComment}>Send</CommentButton>
    </CommentDiv>
  );
};
