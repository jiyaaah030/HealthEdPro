import React from "react";
import { Link } from "react-router-dom";

export default function AnxietyTestSection() {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 px-8 lg:gap-16">

        <div className="flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-6">Parent Test: Your Child’s Mental Health:</h2>
          <p className="text-xl mb-6">
          If you're concerned about your child's mental health, it's important to be aware of the signs and symptoms. While it's normal for children to experience emotional ups and downs, persistent changes in behavior or mood could indicate an underlying mental health concern.
          </p>
          <p className="text-xl font-bold mb-4">TAKE A TEST</p>
          <Link
            to="parent"
            className="inline-block bg-green-700 text-white py-4 px-8 rounded hover:bg-green-800  w-50 h-12"
          >
            TEST YOURSELF
          </Link>
        </div>


        <div className="flex items-center justify-center">
          <img
            src="https://img.freepik.com/free-vector/poster-design-mental-health-with-boy-girl_1308-108068.jpg?ga=GA1.1.1265955666.1727376536&semt=ais_hybrid"
            alt="Parent Test: Your Child’s Mental Health Illustration"
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
}
