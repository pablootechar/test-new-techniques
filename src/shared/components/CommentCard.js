import React from "react";
// import "./Css/CommentCard.css"
import { useEffect, useState } from "react";
import DatabaseApi from "../DatabaseApi";

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
        getUserInfo()
    }, []);

    useEffect(() => {}, [])

    return (
        <div className="comment-card">
            <div className="comment-card-header">
                <div className="comment-card-header-main">
                    <img className="comment-photo" src={userImageUrl} alt="" />
                    <h5 className={userInfos?.isPremium === 1 ? `comment-username premium` : `comment-username`}>{userInfos?.name}</h5>

                </div>
                <h5 className="comment-date">{data.comment?.date_comment}</h5>
            </div>
            <hr />
            <p className="comment-text">{data.comment?.text_comment}</p>
        </div>
    )
}