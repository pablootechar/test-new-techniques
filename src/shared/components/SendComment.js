import React from "react";
// import "./Css/SendComment.css"
import { useParams } from "react-router-dom";
import DatabaseApi from "../DatabaseApi"

export const SendComment = ({ onCommentSent }) => {
    const params = useParams();
    const {id: animeId, episodeNum} = params;
    const storageUserInfo = localStorage.getItem("@animatrix/profile");
    
    const clearInput = () => {
        const inputText = document.getElementById("input-comment");
        inputText.value = "";
    }
    
    const sendComment = async () => {
        if (storageUserInfo === null || typeof storageUserInfo === "undefined") {
            alert("You need to login to post a comment!");
        } else {
            const {id: userId} = JSON.parse(storageUserInfo);
            const inputText = document.getElementById("input-comment");
            await DatabaseApi.sendComment(userId, inputText.value, animeId, episodeNum);
            clearInput();
            onCommentSent();
        }
    }

    return (
        <div className="comment-div">
            <input className="input-comment" id="input-comment" type="text" placeholder="Send your comment..." />
            <button className="button-comment" onClick={sendComment}>Send</button>
        </div>
    )
}