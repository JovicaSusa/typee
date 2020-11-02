import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Character = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectBoxVisibility, setSelectBoxVisibility] = useState("hidden");

  const setSelectArrow = () => {
    if(isOpen) {
      return "M5 10l7-7m0 0l7 7m-7-7v18"
    } else {
      return "M19 14l-7 7m0 0l-7-7m7 7V3"
    }
  }

  const handleSelect = (e) => {
    setIsOpen(!isOpen);
    if (selectBoxVisibility === "hidden") {
      setSelectBoxVisibility("")
    } else {
      setSelectBoxVisibility("hidden")
    }
  }

  return(
    <div className="flex justify-center items-center h-screen">
      <div className="w-2/6 flex flex-wrap justify-center -mt-40">
        <div className="w-9/12 flex justify-center items-center border-4 border-gray-900 py-4 px-8 w-64 text-2xl font-bold">
          <span className="inline-block">Select duration</span>
        </div>
        <div onClick={handleSelect} className="w-3/12 flex justify-center items-center border-t-4 border-r-4 border-b-4 border-gray-900 py-4 px-8 w-24 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="black" className="w-12 h-12 inline-block">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={setSelectArrow()} />
          </svg>
        </div>
        <div className="w-full relative">
          <div className={`absolute ${selectBoxVisibility} top-0 border-b-4 border-l-4 border-r-4 border-gray-900 w-full`}>
            <span className="block cursor-pointer text-center py-2 text-2xl font-bold hover:bg-gray-900 hover:text-blue-200">
              <Link to={{
                pathname: 'type',
                duration: 60
              }}>1:00</Link>
            </span>
            <span className="block cursor-pointer text-center py-2 text-2xl font-bold hover:bg-gray-900 hover:text-blue-200">
              <Link to={{
                pathname: 'type',
                duration: 120
              }}>2:00</Link>
            </span>
            <span className="block cursor-pointer text-center py-2 text-2xl font-bold hover:bg-gray-900 hover:text-blue-200">
              <Link to={{
                pathname: 'type',
                duration: 180
              }}>3:00</Link>
            </span>
            <span className="block cursor-pointer text-center py-2 text-2xl font-bold hover:bg-gray-900 hover:text-blue-200">
              <Link to={{
                pathname: 'type',
                duration: 240
              }}>4:00</Link>
            </span>
            <span className="block cursor-pointer text-center py-2 text-2xl font-bold hover:bg-gray-900 hover:text-blue-200">
              <Link to={{
                pathname: 'type',
                duration: 300
              }}>5:00</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Character;
