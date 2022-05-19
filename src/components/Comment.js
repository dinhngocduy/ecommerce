import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import "../css/Comment.css";
function Comment({ comment }) {
  return (
    <div className="comment">
      <div className="comment__user">
        <AccountCircleIcon className="comment__userAvatar" />
        <h3 className="commment__email">{comment.email}</h3>
      </div>
      <p className="comment__content">{comment.content}</p>
    </div>
  );
}

export default Comment;
