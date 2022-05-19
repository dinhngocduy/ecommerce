import React, { useContext, useState, useEffect } from "react";
import DataContext from "../context/DataContext";
import { fs } from "../Config/Config";
import { toast } from "react-toastify";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SendIcon from "@mui/icons-material/Send";
import "../css/Comments.css";
import Comment from "./Comment";
function Comments({ product }) {
  const [commentContent, setCommentContent] = useState();
  const [comments, setComments] = useState([]);

  const { currentEmail } = useContext(DataContext);
  toast.configure();
  const comment = { email: currentEmail, content: commentContent };
  const getComments = async () => {
    const comments = await fs
      .collection("Products")
      .doc(product.id)
      .collection("Comments")
      .get();
    const commentsArray = [];
    for (let snap of comments.docs) {
      let data = snap.data();
      data.ID = snap.id;
      commentsArray.push({
        ...data,
      });
      if (commentsArray.length === comments.docs.length) {
        setComments(commentsArray);
      }
    }
  };
  useEffect(() => {
    getComments();
  }, []);

  const handleSubmitComment = (e) => {
    e.preventDefault();
    const commentId = fs
      .collection("Products")
      .doc(product.id)
      .collection("Comments")
      .doc().id;

    fs.collection("Products")
      .doc(product.id)
      .collection("Comments")
      .doc(commentId)
      .set(comment, { merge: true })
      .then(() => {
        toast.success("Your Comment Submited", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
      });
  };
  return (
    <div className="comments">
      <h1 className="comments__title">Comments</h1>
      {comments.map((comment) => (
        <Comment product={product} comment={comment} />
      ))}
      <form onSubmit={handleSubmitComment}>
        <AccountCircleIcon className="userIcon" />
        <input
          className="comments__input"
          type="text"
          placeholder="Your Comment"
          onChange={(e) => setCommentContent(e.target.value)}
        />
        <SendIcon className="comment__send" onClick={handleSubmitComment} />
      </form>
    </div>
  );
}

export default Comments;
