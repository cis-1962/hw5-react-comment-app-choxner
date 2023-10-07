import { nanoid } from 'nanoid';
import React, { useCallback, useState } from 'react';
import CreateComment from './components/CreateComment'; // Assuming you have exported the Comment interface from the CreateComment file.
import CommentTree from './components/CommentTree';
import { Comment } from './types';

export default function App() {
  const [commentsData, setCommentsData] = useState<Comment[]>([]);

  const onCommentSubmit = useCallback(
    (newComment: Omit<Comment, 'id'>, parentCommentId?: string) => {
      const id = nanoid();

      // If there's no parent ID, add the comment to the top level
      if (!parentCommentId) {
        setCommentsData((prevComments) => [
          ...prevComments,
          { ...newComment, id, childComments: [] },
        ]);
      } else {
        // Function to add a reply to a comment
        const addReplyToComment = (
          all_comments: Comment[],
          currentDepth = 0,
        ): Comment[] =>
          all_comments.map((comment) => {
            if (comment.id === parentCommentId) {
              if (currentDepth >= 2) {
                return comment;
              }
              return {
                ...comment,
                childComments: [
                  ...(comment.childComments || []),
                  { ...newComment, id, childComments: [] },
                ],
              };
            }

            return comment.childComments
              ? {
                  ...comment,
                  childComments: addReplyToComment(
                    comment.childComments,
                    currentDepth + 1,
                  ),
                }
              : comment;
          });

        setCommentsData((prevComments) => addReplyToComment(prevComments));
      }
    },
    [],
  );

  const updateVotesForComment = (commentId: string, change: number) => {
    const updateVotes = (comments2: Comment[]): Comment[] =>
      comments2.map((comment) => {
        if (comment.id === commentId) {
          return { ...comment, votes: comment.votes + change };
        }

        if (comment.childComments) {
          return {
            ...comment,
            childComments: updateVotes(comment.childComments),
          };
        }

        return comment;
      });

    setCommentsData((prevComments) => updateVotes(prevComments));
  };

  const upvoteComment = (commentId: string) => {
    updateVotesForComment(commentId, 1);
  };

  const downvoteComment = (commentId: string) => {
    updateVotesForComment(commentId, -1);
  };

  return (
    <main className="bg-blue-200 min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-8 text-center text-blue-700">
        Comments
      </h1>
      <div className="flex flex-col items-center space-y-6">
        <CreateComment onCommentSubmit={onCommentSubmit} />
        {commentsData.map((topLevelComment) => (
          <CommentTree
            key={topLevelComment.id}
            {...topLevelComment}
            onCommentSubmit={onCommentSubmit}
            onUpvote={upvoteComment}
            onDownvote={downvoteComment}
          />
        ))}
      </div>
    </main>
  );
}
