import React, { useState } from 'react';
import { CommentTreeProps } from '../types';
import CreateComment from './CreateComment';
import VoteButtons from './VoteButtons';

function CommentTree({
  id,
  author,
  comment,
  childComments,
  votes,
  onCommentSubmit,
  onUpvote,
  onDownvote,
}: CommentTreeProps): JSX.Element {
  const [showReplyForm, setShowReplyForm] = useState(false);
  return (
    <div className="w-full ml-5 mb-4 bg-gray-100 p-4 rounded">
      <div className="flex items-start space-x-3 mb-2">
        <strong className="text-blue-700 font-semibold text-lg">
          {author}
        </strong>
        <div className="bg-white p-2 rounded shadow-sm flex-grow">
          <span>{comment}</span>
        </div>
      </div>
      {showReplyForm ? (
        <CreateComment
          onCommentSubmit={(newComment) => {
            onCommentSubmit(newComment, id);
            setShowReplyForm(false);
          }}
        />
      ) : (
        <button
          type="button"
          onClick={() => setShowReplyForm((prev) => !prev)}
          className="text-sm text-blue-500 bg-blue-100 px-2 py-1 rounded hover:bg-blue-200 hover:text-blue-700 focus:outline-none focus:ring focus:ring-blue-200 mb-2"
        >
          Reply
        </button>
      )}
      <VoteButtons
        votes={votes}
        onUpvote={() => onUpvote(id)}
        onDownvote={() => onDownvote(id)}
      />
      {childComments && childComments.length > 0 && (
        <div className="mt-2 border-l-2 border-blue-300 pl-4">
          {childComments.map((childComment) => (
            <CommentTree
              key={childComment.id}
              {...childComment}
              onCommentSubmit={onCommentSubmit}
              onUpvote={onUpvote}
              onDownvote={onDownvote}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default CommentTree;
