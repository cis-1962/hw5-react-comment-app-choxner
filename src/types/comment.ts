export interface Comment {
  id: string; // Unique identifier for each comment
  author: string; // Author's name
  comment: string;
  childComments?: Comment[];
  votes: number;
}

export type CreateCommentProps = {
  onCommentSubmit: (comment: Comment, id?: string) => void;
};

export type CommentTreeActions = {
  onUpvote: (commentId: string) => void;
  onDownvote: (commentId: string) => void;
};

export type VoteButtonsProps = {
  votes: number;
  onUpvote: () => void;
  onDownvote: () => void;
};

export type CommentTreeProps = Comment &
  CreateCommentProps &
  CommentTreeActions;
