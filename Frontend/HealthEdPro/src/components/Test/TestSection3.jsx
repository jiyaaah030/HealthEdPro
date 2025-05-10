import React from "react";
import { Link } from "react-router-dom";

export default function DepressionTestSection() {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 px-8 lg:gap-16">

        <div className="flex items-center justify-center">
          <img
            src="https://img.freepik.com/free-vector/bad-habits-cartoon-concept-with-unhealthy-addiction-symbols-vector-illustration_1284-80087.jpg?t=st=1729361222~exp=1729364822~hmac=463cbf4bb1e28db492b2bc8a9324695e5ca4aada39d2607141795f79645bb14c&w=740"
            alt="Depression Illustration"
            className="w-full h-full"
          />
        </div>


        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-6">Addiction Test:</h2>
          <p className="text-xl mb-6">
          The Addiction Test is a screening tool used to assess an individual's risk of developing or continuing substance abuse problems. It is designed to identify potential warning signs and symptoms associated with addiction.
          </p>
          <p className="text-xl font-bold mb-4">TAKE A TEST</p>
          <Link
            to="addiction"
            className="flex bg-green-700 text-white w-50 h-12 py-4 px-8 rounded hover:bg-green-800 justify-center text-center ">
            TEST YOURSELF
          </Link>
        </div>
      </div>
    </div>
  );
}
