import React from "react";
import { Link } from "react-router-dom";

export default function AnxietyTestSection() {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 px-8 lg:gap-16">

        <div className="flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-6">Anxiety Test</h2>
          <p className="text-xl mb-6">
            Anxiety is a common mental health condition that can significantly impact a person's daily life.
            If you are experiencing extreme worry or fear that interferes with your ability to function, it is important to seek help.
            An anxiety test can help you assess whether you may be experiencing symptoms of anxiety.
          </p>
          <p className="text-xl font-bold mb-4">TAKE A TEST</p>
          <Link
            to="anxiety"
            className="inline-block bg-green-700 text-white py-4 px-8 rounded hover:bg-green-800  w-50 h-12"
          >
            TEST YOURSELF
          </Link>
        </div>


        <div className="flex items-center justify-center">
          <img
            src="https://img.freepik.com/free-vector/hand-drawn-flat-design-overwhelmed-people-illustration_23-2149352793.jpg"
            alt="Anxiety Illustration"
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
}
