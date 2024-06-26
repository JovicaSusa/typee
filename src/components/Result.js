import React from 'react';
import { Link } from 'react-router-dom';

const Result = (props) => {
  const getWpm = () => {
    if (props.location.result) {
      return props.location.result.wordsPerMin;
    } else {
      return 0;
    }
  }

  const getAccurancy = () => {
    if (props.location.result) {
      return props.location.result.accurancy;
    } else {
      return 0;
    }
  }

  return(
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="w-2/6 text-lg font-bold text-center">
        <p className="text-2xl mb-8">Congrats, your score is:</p>
        <div className="flex items-end leading-none">
          <span className="w-2/4 inline-block">Words per minute:</span>
          <span className="w-2/4 inline-block text-4xl">{getWpm()} wpm</span>
        </div>
        <div className="flex items-end leading-none mt-4">
          <span className="w-2/4 inline-block">Accurancy:</span>
          <span className="w-2/4 inline-block text-4xl">{getAccurancy()} %</span>
        </div>
      </div>
      <div className="mt-24">
        <button className="border-4 border-gray-900 px-8 py-2 text-lg font-semibold">
          <Link to="/">Retake test</Link>
        </button>
      </div>
    </div>

  )
};

export default Result;
