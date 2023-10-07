import React, { useState, useCallback, useEffect } from 'react';
import { Comment, CreateCommentProps } from '../types';

function CreateComment({ onCommentSubmit }: CreateCommentProps) {
  const [author, setAuthor] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  useEffect(() => {
    setIsFormValid(!!author && !!comment);
  }, [author, comment]);

  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setAuthor(e.target.value);
    },
    [],
  );

  const handleCommentChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setComment(e.target.value);
    },
    [],
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (isFormValid) {
        onCommentSubmit({ author, comment, votes: 0 } as Comment);
        setAuthor('');
        setComment('');
      }
    },
    [author, comment, onCommentSubmit, isFormValid],
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center space-y-6 bg-blue-100 p-8 rounded-md shadow-md w-full max-w-xl mx-auto"
    >
      <div className="flex flex-col space-y-3 w-full">
        <label
          htmlFor="userName"
          className="text-blue-600 font-semibold text-lg"
        >
          Name:
          <input
            type="text"
            id="userName"
            value={author}
            onChange={handleNameChange}
            className="border rounded p-2 w-full focus:outline-none focus:border-blue-300 transition duration-150 ease-in-out"
          />
        </label>
      </div>
      <div className="flex flex-col space-y-3 w-full">
        <label
          htmlFor="userComment"
          className="text-blue-600 font-semibold text-lg"
        >
          Comment:
          <textarea
            id="userComment"
            value={comment}
            onChange={handleCommentChange}
            className="border rounded p-2 w-full h-32 focus:outline-none focus:border-blue-300 transition duration-150 ease-in-out"
          />
        </label>
      </div>
      <button
        type="submit"
        disabled={!isFormValid}
        className="bg-blue-500 text-white rounded px-4 py-2 w-full md:w-1/2 hover:bg-blue-600 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out"
      >
        Submit
      </button>
    </form>
  );
}

export default CreateComment;
