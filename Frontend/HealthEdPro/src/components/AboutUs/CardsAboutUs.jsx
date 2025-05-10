import React from "react";
import Col1 from "../../assets/Aboutus-col1.webp";
import Col2 from "../../assets/Aboutus-col2.webp";
import Col3 from "../../assets/Aboutus-col3.png";
import Col4 from "../../assets/Aboutus-col4.png";
import Col5 from "../../assets/Aboutus-col5.png";

const SectionData = [
  {
    heading: "What are we?",
    text: `At HealthEdPro, our mission is to revolutionize mental health care by integrating innovative technology with compassionate support, creating a safe and accessible platform for individuals to assess their mental well-being, access resources, and connect with a supportive community. We are dedicated to making mental health care effective and approachable, guiding you toward enhanced mental wellness.
We envision a world where mental health care is universally accessible, personalized, and free from stigma. By leveraging cutting-edge technology, we empower individuals to take control of their mental health journeys, fostering a society where mental well-being is prioritized and nurtured.`,
    image: Col1,
    bgColor: "bg-gray-800",
    textColor: "text-white", 
  },
  {
    heading: "What do we offer?",
    text: `HealthEdPro provides a range of tools and resources to support your mental health. Our platform 
    includes interactive self-assessments, personalized AI advice, and a vibrant community space for sharing 
    and support. Explore practical tips, mental health exercises, and expert resources tailored to your needs. 
    Join HealthEdPro and take the first step towards a healthier, happier you.`,
    image: Col2,
    bgColor: "bg-green-700",
    textColor: "text-white",
  },
  {
    heading: "Who is it for?",
    text: `HealthEdPro is for anyone seeking mental health support. Whether you're dealing with stress, anxiety, or just want to improve your well-being, our platform offers the tools, resources, and community to help you on your journey. Join us to take control of your mental health.`,
    image: Col3,
    bgColor: " bg-pink-400 ",
    textColor: "text-white",
  },
  {
    heading: "What do we offer?",
    text: `HealthEdPro provides a range of tools and resources to support your mental health. Our platform 
    includes interactive self-assessments, personalized AI advice, and a vibrant community space for sharing 
    and support. Explore practical tips, mental health exercises, and expert resources tailored to your needs. 
    Join HealthEdPro and take the first step towards a healthier, happier you.`,
    image: Col4,
    bgColor: "bg-amber-800",
    textColor: "text-white",
  },
  {
    heading: "What do we offer?",
    text: `HealthEdPro provides a range of tools and resources to support your mental health. Our platform 
    includes interactive self-assessments, personalized AI advice, and a vibrant community space for sharing 
    and support. Explore practical tips, mental health exercises, and expert resources tailored to your needs. 
    Join HealthEdPro and take the first step towards a healthier, happier you.`,
    image: Col5,
    bgColor: "bg-purple-500",
    textColor: "text-white",
  },
];

const AboutSections = () => {
  return (

    <div className="w-full mt-20  ">
      {SectionData.map((section, index) => (
        <div
          key={index}
          className={`${section.bgColor} ${section.textColor} py-12 px-6 flex flex-col md:flex-row items-center h-[80vh] `}
        >

          <div className="md:w-1/2 md:pr-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {section.heading}
            </h2>
            <p className="leading-relaxed">{section.text}</p>
          </div>

          <div className="md:w-1/2 flex justify-center mt-6 md:mt-0">
            <img
              src={section.image}
              alt={section.heading}
              className="max-w-xs md:max-w-md"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AboutSections;
