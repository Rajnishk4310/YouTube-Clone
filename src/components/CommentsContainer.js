import React, { useState } from "react";

const Comment = ({ data }) => {
  const { authorProfileImageUrl, textOriginal, authorDisplayName } =
    data?.snippet?.topLevelComment?.snippet || data?.snippet;

  return (
    <div className="py-1 flex">
      <img
        className="rounded-full h-9 mr-3"
        alt="user"
        src={authorProfileImageUrl}
      />
      <div>
        <h1 className="font-bold text-sm ">{authorDisplayName}</h1>
        <p className="text-sm">{textOriginal} </p>
      </div>
    </div>
  );
};

const CommentCall = ({ comments }) => {
  const [showReplies, setShowReplies] = useState(false);
  const handleReplies = () => {
    setShowReplies(!showReplies);
  };

  return comments.map((comment, index) => (
    <div key={index} className="py-2">
      <Comment data={comment} />
      {comment.replies && (
        <div className="pl-11">
          <span
            onClick={() => {
              handleReplies();
            }}
            className="text-blue-500 px-3 py-1 hover:bg-blue-100 rounded-full cursor-pointer font-bold"
          >
            {!showReplies ? "🔽" : "🔼"} {comment.replies.length} replies
          </span>
          {showReplies && <CommentCall comments={comment.replies.comments} />}
        </div>
      )}
    </div>
  ));
};

const CommentsContainer = ({ commentList }) => {
  return (
    <div className="py-5">
      <h1 className="font-bold text-2xl mb-2">{commentList.length} Comments</h1>
      <CommentCall comments={commentList} />
    </div>
  );
};

export default CommentsContainer;
