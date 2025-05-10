
import HeroCommunity from "../../assets/mental-treatment.webp";

const CommunityPage = () => {
  

  return (
    <div className="bg-white min-h-screen">
    
      <div className="relative text-center py-12 bg-blue-100 mt-20">
        <img
          src={HeroCommunity}
          alt="Community"
          className="mx-auto w-[80vh] "
        />
        <h1 className="text-3xl font-bold mt-4">COMMUNITY!</h1>
        <h2 className="text-xl text-gray-700">Welcome to the HealthEdPro Community!</h2>
        <p className="max-w-xl mx-auto text-gray-600 mt-2">
          Join a compassionate space where mental wellness is nurtured. Share your journey, find support, and connect with others who understand.
        </p>
      </div>

     </div> 
  );
};

export default CommunityPage;
