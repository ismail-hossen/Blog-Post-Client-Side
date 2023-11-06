import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <div className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              Welcome to Our Blog
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-6">
              Discover a world of knowledge and inspiration.
            </p>
            <Link
              to="/all-blogs"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 md:py-3 md:px-6 rounded-full inline-block transition duration-300"
            >
              Read Our Blog
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="md:ml-6 relative"
          >
            <img
              src="https://img.freepik.com/free-photo/worker-reading-news-with-tablet_1162-83.jpg?w=1380&t=st=1699249726~exp=1699250326~hmac=5096b2d0fd0234bbac9d842557163a57cfdcb36ac58f45b2398be5832f0cd826"
              alt="Blog Hero Image"
              className="rounded-lg shadow-lg"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 rounded-lg" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
                Explore Our World
              </h2>
              <p className="text-lg md:text-xl lg:text-2xl mt-4">
                Dive into a realm of endless knowledge and inspiration.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
