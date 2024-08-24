import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, PiggyBank, TrendingUp, Book, Check } from "lucide-react";
import landingLight from "../../assets/img/landing-light.png";
import landingDark from "../../assets/img/landing-dark.png";

const FeatureCard = ({ icon: Icon, title, description }) => (
  <motion.div 
    className="bg-white/90 dark:bg-gray-800/90 p-8 rounded-2xl shadow-lg backdrop-blur-sm border border-emerald-100 dark:border-emerald-900"
    whileHover={{ y: -5, boxShadow: "0 12px 24px rgba(0,0,0,0.1)" }}
    transition={{ duration: 0.3 }}
  >
    <Icon className="w-14 h-14 text-emerald-500 mb-6" />
    <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{description}</p>
  </motion.div>
);

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold text-emerald-600 dark:text-emerald-400 mb-6 leading-tight">
            UniCash: Your Student Finance Companion
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Master your finances, ace your studies. Track expenses, plan your budget, and make the most of your student life.
          </p>
          <Button asChild size="lg" className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold px-8 py-6 text-lg rounded-full transition-all duration-300 transform hover:scale-105">
            <Link to="/signup">
              Start Saving Today <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 gap-10 mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <FeatureCard 
            icon={PiggyBank}
            title="Smart Budgeting"
            description="Set budgets for different categories, track your expenses, and watch your savings grow."
          />
          <FeatureCard 
            icon={TrendingUp}
            title="Financial Insights"
            description="Get visual representations of your spending habits and income sources to make informed decisions."
          />
          <FeatureCard 
            icon={Book}
            title="Student-Focused"
            description="Tailored categories for student life, including textbooks, meal plans, and part-time job income tracking."
          />
        </motion.div>

        <motion.div 
          className="bg-white/80 dark:bg-gray-800/80 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-sm border border-emerald-100 dark:border-emerald-900"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <div className="md:flex items-center">
            <div className="md:w-1/2 p-10">
              <h2 className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-6">
                Why UniCash?
              </h2>
              <ul className="space-y-4 text-gray-700 dark:text-gray-300">
                {[
                  "Designed specifically for student financial needs",
                  "Easy-to-use interface for quick expense logging",
                  "Insightful charts to visualize your spending patterns",
                  "Categorize expenses for better budget management",
                  "Secure and private - your financial data stays yours"
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <Check className="text-emerald-500 flex-shrink-0 w-6 h-6" />
                    <span className="text-lg">{item}</span>
                  </motion.li>
                ))}
              </ul>
              <Button asChild size="lg" className="mt-8 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold px-8 py-4 text-lg rounded-full transition-all duration-300 transform hover:scale-105">
                <Link to="/signup">Join UniCash Today</Link>
              </Button>
            </div>
            <div className="md:w-1/2 p-6 relative">
              <motion.div 
                className="relative w-full h-0 pb-[100%] rounded-2xl shadow-lg overflow-hidden"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.8 }}
              >
                <img 
                  src={landingLight}
                  alt="UniCash app screenshot - Light Mode" 
                  className="absolute inset-0 w-full h-full object-cover dark:opacity-0 transition-opacity duration-300"
                />
                <img 
                  src={landingDark}
                  alt="UniCash app screenshot - Dark Mode" 
                  className="absolute inset-0 w-full h-full object-cover opacity-0 dark:opacity-100 transition-opacity duration-300"
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;