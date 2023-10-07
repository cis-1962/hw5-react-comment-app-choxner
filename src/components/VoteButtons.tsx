import React from 'react';
import { VoteButtonsProps } from '../types';

function VoteButtons({
  votes,
  onUpvote,
  onDownvote,
}: VoteButtonsProps): JSX.Element {
  return (
    <div className="flex items-center space-x-2">
      <button
        type="button"
        onClick={onUpvote}
        className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200 transition duration-150 ease-in-out"
      >
        ↑
      </button>
      <div className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full font-bold">
        {votes}
      </div>
      <button
        type="button"
        onClick={onDownvote}
        className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-200 transition duration-150 ease-in-out"
      >
        ↓
      </button>
    </div>
  );
}

export default VoteButtons;
