import React from 'react';
import { Link } from 'react-router-dom';

const Result = (props) => {
  return(
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="text-lg font-bold text-center">
        <p>Congrats, your score is:</p>
        <span className="block text-4xl mt-2">{props.location.result} wpm</span>
      </div>
      <div className="mt-4">
        <button class="border-4 border-gray-900 px-8 py-2 text-lg font-semibold">
          <Link to="/">Retake test</Link>
        </button>
      </div>
    </div>

  )
};

export default Result;
