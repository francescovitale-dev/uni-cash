import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, PiggyBank, Home, DollarSign, Search } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center text-gray-800 dark:text-white p-4">
      <div className="text-center max-w-2xl bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <PiggyBank className="w-24 h-24 mx-auto text-emerald-500 mb-4" />
          <h1 className="text-6xl font-extrabold mb-4 text-emerald-600 dark:text-emerald-400">
            404
          </h1>
          <h2 className="text-3xl font-bold mb-6 text-gray-700 dark:text-gray-300">
            Oops! Looks like your budget took a detour
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <p className="text-xl mb-4 text-gray-600 dark:text-gray-400">
            Don't worry, even the savviest savers sometimes lose their way.
          </p>
          <p className="text-xl mb-8 text-gray-600 dark:text-gray-400">
            Let's get you back on track to financial success!
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Link 
            to="/" 
            className="flex items-center bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-6 py-3 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <Home className="mr-2" />
            Back to Homepage
          </Link>
        </motion.div>

        <motion.div
          className="mt-12 text-gray-600 dark:text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <p className="flex items-center justify-center">
            <MapPin className="mr-2" />
            Your current location: The Land of Lost Savings
          </p>
        </motion.div>

        <motion.div
          className="mt-8 text-sm text-gray-500 dark:text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <p>Remember: Every penny counts, even the lost ones!</p>
          <p className="flex items-center justify-center mt-2">
            <DollarSign className="w-4 h-4 mr-1" />
            <DollarSign className="w-4 h-4 mr-1" />
            <DollarSign className="w-4 h-4" />
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage;