import React from "react";
import { Link } from "react-router-dom";

export default function MentalHealthConditions() {
  return (
    <section className="px-4 py-8 md:py-12 lg:py-16">
      <h2 className="text-2xl font-bold mb-2">Mental health conditions</h2>
      <hr className="mb-6" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* ADHD TEST */}
        <div className="border-2 border-green-700 rounded p-4 flex flex-col">
          <img
            src="https://cdn.prod.website-files.com/6399a4a86b6eb30bdc650a3f/63fe4b38a4cf703b58f2a20e_00.The-Most-Common-ADHD-Symptoms-Cover-p-500.jpg"
            alt="ADHD Test"
            className="w-full h-40 object-cover mb-4"
          />
          <h3 className="font-bold mb-2">ADHD TEST</h3>
          <p className="text-sm mb-4">
            For people of all ages who have trouble focusing, remembering things,
            completing tasks, and/or sitting still.
          </p>
          <Link
            to="adhd"
            className="mt-auto bg-green-600 text-white py-2 px-4 text-center rounded hover:bg-green-700"
          >
            TAKE ADHD TEST
          </Link>
        </div>

        {/* BIPOLAR TEST */}
        <div className="border-2 border-green-700 rounded p-4 flex flex-col">
          <img
            src="https://static.vecteezy.com/system/resources/previews/001/217/412/large_2x/bipolar-disorder-mood-swings-vector.jpg"
            alt="Bipolar Test"
            className="w-full h-40 object-cover mb-4"
          />
          <h3 className="font-bold mb-2">BIPOLAR TEST</h3>
          <p className="text-sm mb-4">
            For people who experience extreme mood swings, from high energy and
            excitement to low energy and sadness.
          </p>
          <Link
            to="bipolar"
            className="mt-auto bg-green-600 text-white py-2 px-4 text-center rounded hover:bg-green-700"
          >
            TAKE BIPOLAR TEST
          </Link>
        </div>

        {/* PTSD TEST */}
        <div className="border-2 border-green-700 rounded p-4 flex flex-col">
          <img
            src="https://static.vecteezy.com/system/resources/previews/027/568/939/large_2x/suffering-from-ptsd-depression-mental-disorder-female-flat-character-vector.jpg"
            alt="PTSD Test"
            className="w-full h-40 object-cover mb-4"
          />
          <h3 className="font-bold mb-2">PTSD TEST</h3>
          <p className="text-sm mb-4">
            For people experiencing flashbacks, nightmares, or severe anxiety
            after a traumatic event.
          </p>
          <Link
            to="ptsd"
            className="mt-auto bg-green-600 text-white py-2 px-4 text-center rounded hover:bg-green-700"
          >
            TAKE PTSD TEST
          </Link>
        </div>

        {/* YOUTH MENTAL HEALTH TEST */}
        <div className="border-2 border-green-700 rounded p-4 flex flex-col">
          <img
            src="https://static.vecteezy.com/system/resources/previews/046/452/100/large_2x/neurosis-chronic-stress-and-anxiety-mental-disorder-character-vector.jpg"
            alt="Youth Mental Health Test"
            className="w-full h-40 object-cover mb-4"
          />
          <h3 className="font-bold mb-2">YOUTH MENTAL HEALTH TEST</h3>
          <p className="text-sm mb-4">
            For young people who are concerned that their emotions, attention or
            behaviors might be signs of a problem.
          </p>
          <Link
            to="youth"
            className="mt-auto bg-green-600 text-white py-2 px-4 text-center rounded hover:bg-green-700"
          >
            TAKE A TEST
          </Link>
        </div>

        {/* OCD TEST */}
        <div className="border-2 border-green-700 rounded p-4 flex flex-col">
          <img
            src="https://static.vecteezy.com/system/resources/previews/014/744/812/large_2x/obsessive-compulsive-disorder-vector.jpg"
            alt="OCD Test"
            className="w-full h-40 object-cover mb-4"
          />
          <h3 className="font-bold mb-2">
            OBSESSIVE-COMPULSIVE DISORDER (OCD) TEST
          </h3>
          <p className="text-sm mb-4">
            For people who experience recurring, unwanted thoughts, urges, or
            images that cause distress.
          </p>
          <Link
            to="ocd"
            className="mt-auto bg-green-600 text-white py-2 px-4 text-center rounded hover:bg-green-700"
          >
            TAKE OCD TEST
          </Link>
        </div>

        {/* SLEEP DISORDER */}
        <div className="border-2 border-green-700 rounded p-4 flex flex-col">
          <img
            src="https://static.vecteezy.com/system/resources/previews/028/534/726/large_2x/sleep-disorder-flat-style-design-illustration-stock-illustration-vector.jpg"
            alt="Sleep Disorder"
            className="w-full h-40 object-cover mb-4"
          />
          <h3 className="font-bold mb-2">SLEEP DISORDER</h3>
          <p className="text-sm mb-4">
            For people who have trouble sleeping or staying asleep, or who
            experience excessive daytime sleepiness.
          </p>
          <Link
            to="sleep"
            className="mt-auto bg-green-600 text-white py-2 px-4 text-center rounded hover:bg-green-700"
          >
            TAKE A TEST
          </Link>
        </div>

        {/* DEMENTIA TEST */}
        <div className="border-2 border-green-700 rounded p-4 flex flex-col">
          <img
            src="https://static.vecteezy.com/system/resources/previews/050/980/510/large_2x/alzheimer-disease-and-dementia-in-old-woman-who-forgets-dates-and-faces-or-gets-confused-in-space-vector.jpg"
            alt="Dementia Test"
            className="w-full h-40 object-cover mb-4"
          />
          <h3 className="font-bold mb-2">DEMENTIA TEST</h3>
          <p className="text-sm mb-4">
            For people who experience memory loss, confusion, difficulty with
            communication, and difficulty with daily activities.
          </p>
          <Link
            to="dementia"
            className="mt-auto bg-green-600 text-white py-2 px-4 text-center rounded hover:bg-green-700"
          >
            TAKE DEMENTIA TEST
          </Link>
        </div>

        {/* ED/PME TEST */}
        <div className="border-2 border-green-700 rounded p-4 flex flex-col">
          <img
            src="https://prptreatmentbeverlyhills.com/wp-content/uploads/2022/11/icon-erec-dys-3.jpg"
            alt="ED/PME Test"
            className="w-full h-40 object-cover mb-4"
          />
          <h3 className="font-bold mb-2">ED/PME TEST</h3>
          <p className="text-sm mb-4">
            For people who experience difficulty achieving or maintaining an
            erection, or who ejaculate too quickly during sex.
          </p>
          <Link
            to="edpme"
            className="mt-auto bg-green-600 text-white py-2 px-4 text-center rounded hover:bg-green-700"
          >
            TAKE A TEST
          </Link>
        </div>
      </div>
    </section>
  );
}
