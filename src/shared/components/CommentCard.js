import React from "react";
import { useEffect, useState } from "react";
import DatabaseApi from "../DatabaseApi";
import styled from "styled-components";
import { shade } from "polished";

const CertificateIcon = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 5px;

  & > i.fa-check {
    position: absolute;
    font-size: 10px;
    /* font-weight: bolder; */
    z-index: 2;
    color: #fff;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  & > i.fa-certificate {
    color: #00a7bd;
    font-size: 18px;
  }
`;

const CommentCardDiv = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  min-height: 100px;
  width: 90%;
  margin: 5%;
  border-radius: 8px;
  padding: 10px;
  
  &.borda-com-mulecagi{
    box-shadow: 0px 0px 15px ${({ theme }) => theme.representativeColor};
    border: 2px solid ${({ theme }) => theme.representativeColor};
  }
  
  &.borda-comum {
    border: 2px solid ${({ theme }) => theme.representativeColor};
  }
  
  &.borda-de-pobre{
    border: 2px solid ${({ theme }) => shade(0.8, theme.representativeColor)};
  }
`;

const InfoHeader = styled.div`
  display: flex;
  height: 20px;
  margin-top: -5px;
  margin-bottom: 10px;
  justify-content: space-between;
`;

const CommentInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 10px;
  width: 100%;
  max-width: 90%;
  word-wrap: break-word;
`;

const CardImage = styled.img`
  margin-left: -20px;
  margin-top: -20px;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.representativeColor};
  background: #000;
  padding: 2px;
  height: 50px;
  width: 50px;
  z-index: 10;

  &.borda-comum {
    border: 2px solid ${({ theme }) => theme.representativeColor};
  }
  
  &.borda-de-pobre{
    border: 2px solid ${({ theme }) => shade(0.8, theme.representativeColor)};
  }
`;

const CommentUserName = styled.h5`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;

  &.premium {
    position: relative;
    z-index: 2;
    font-size: 16px;
    font-weight: bold;
    background-image: linear-gradient(
      45deg,
      ${({ theme }) => shade(0.05, theme.representativeColor)},
      ${({ theme }) => shade(0.4, theme.representativeColor)},
      ${({ theme }) => theme.representativeColor},
      ${({ theme }) => shade(0.4, theme.representativeColor)},
      ${({ theme }) => theme.representativeColor},
      ${({ theme }) => shade(0.4, theme.representativeColor)},
      ${({ theme }) => theme.representativeColor},
      ${({ theme }) => shade(0.4, theme.representativeColor)}
    );
    -webkit-background-clip: text;
    background-clip: text;
    background-size: 300%;
    color: transparent;
    animation: rgb-border 8s linear infinite;
  }

  @keyframes rgb-border {
    0% {
      background-position: 0%;
    }
    100% {
      background-position: 300%;
    }
  }
`;

const CommentPostDate = styled.h5`
  font-size: 16px;
  color: #2d2d2d;
  font-weight: 400;
`;

export const CommentCard = (data) => {
  const [userInfos, setUserInfos] = useState();
  const [userImageUrl, setUserImageUrl] = useState();

  async function getUserInfo() {
    const userInfo = await DatabaseApi.getAllUserInfo(data.comment?.user_id);
    const photoUrl = await DatabaseApi.getImageUrl(userInfo?.photoId);
    setUserInfos(userInfo);
    setUserImageUrl(photoUrl);
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  const checkTypeUser = (user_info) => {

    if (user_info.isAdmin === 1) {
      return "borda-com-mulecagi"
    } else if (user_info.isPremium === 1) {
      return "borda-comum"
    } else {
      return "borda-de-pobre"
    }
  }

  const checkTypePhoto = (user_info) => {

    if (user_info.isPremium === 1) {
      return "borda-comum"
    } else {
      return "borda-de-pobre"
    }
  }

  return (
    <CommentCardDiv className={checkTypeUser(userInfos)}>
      <CardImage className={checkTypePhoto(userInfos)} src={userImageUrl} alt="" />
      <CommentInfo>
        <InfoHeader>
          <CommentUserName
            className={userInfos?.isPremium === 1 ? "premium" : ""}
          >
            {userInfos?.name}
            {userInfos?.isAdmin === 1 ? (
              <CertificateIcon>
                <i className="fa-solid fa-check"></i>
                <i className="fa-solid fa-certificate"></i>
              </CertificateIcon>
            ) : (
              ""
            )}
          </CommentUserName>
          <CommentPostDate>{data.comment?.date_comment}</CommentPostDate>
        </InfoHeader>
        <p className="comment-text">{data.comment?.text_comment}</p>
      </CommentInfo>
    </CommentCardDiv>
  );
};
