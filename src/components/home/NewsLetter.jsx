import { useState } from "react";
import toast from "react-hot-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !email ||
      !email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)
    ) {
      setError("Please enter a valid email address.");
      return;
    }
    toast.success("Thank you for subscribing to our newsletter!");
  };

  return (
    <section className="bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-semibold text-gray-800 mb-4">
          Subscribe to Our Newsletter
        </h2>
        <p className="text-gray-600 text-lg mb-6">
          Stay updated with the latest news, articles, and updates from our
          blog.
        </p>
        <form onSubmit={handleSubmit} className="flex justify-center">
          <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 flex items-center">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-l-lg p-3 outline-none focus:ring focus:ring-primary"
              placeholder="Your Email Address"
            />
            <button
              type="submit"
              className="bg-green-700 hover:bg-green-600 hover:text-green-400 text-white py-3 px-6 rounded-r-lg"
            >
              Subscribe
            </button>
          </div>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </section>
  );
};

export default Newsletter;
