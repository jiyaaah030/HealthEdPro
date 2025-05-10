import React from "react";
import { Link } from "react-router-dom";

export default function DepressionTestSection() {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 px-8 lg:gap-16">

        <div className="flex items-center justify-center">
          <img
            src="https://img.freepik.com/premium-vector/bullying-modern-flat-concept-web-banner-design-frustrated-woman-reads-angry_9209-8221.jpg?w=1060"
            alt="Depression Illustration"
            className="w-full h-full"
          />
        </div>


        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-6">Depression Test</h2>
          <p className="text-xl mb-6">
            Depression is a serious mental health condition that can have a significant impact on a person’s life.
            If you are experiencing overwhelming sadness or despair, low energy, or a negative self-image,
            it is important to seek help. These symptoms can be indicative of depression and can be treated
            effectively with the right support.
          </p>
          <p className="text-xl font-bold mb-4">TAKE A TEST</p>
          <Link
            to="depression"
            className="flex bg-green-700 text-white w-50 h-12 py-4 px-8 rounded hover:bg-green-800 justify-center text-center "
          >
            TEST YOURSELF
          </Link>
        </div>
      </div>
    </div>
  );
}
