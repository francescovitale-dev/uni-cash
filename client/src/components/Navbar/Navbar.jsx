import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Moon, Sun, Menu, X, LogOut, LogIn, UserPlus, PiggyBank } from 'lucide-react';

function Navbar({ authenticated, setAuthenticated }) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') !== 'false';
    setIsDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
    document.documentElement.classList.toggle('dark', newMode);
  };

  const handleLogout = () => {
    setAuthenticated(false);
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md transition-colors duration-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2 group">
            <PiggyBank className="w-8 h-8 text-emerald-500 group-hover:text-emerald-600 transition-colors duration-200" />
            <span className="text-2xl font-bold text-gray-800 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-200">UniCash</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleDarkMode}
              className="rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            {authenticated ? (
              <Button 
                variant="outline" 
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900 dark:hover:text-red-400 transition-colors duration-200"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </Button>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  asChild
                  className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:bg-emerald-100 hover:text-emerald-600 dark:hover:bg-emerald-900 dark:hover:text-emerald-400 transition-colors duration-200"
                >
                  <Link to="/login">
                    <LogIn className="w-4 h-4" />
                    <span>Log in</span>
                  </Link>
                </Button>
                <Button 
                  asChild 
                  className="flex items-center space-x-2 bg-emerald-500 text-white hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 transition-colors duration-200"
                >
                  <Link to="/signup">
                    <UserPlus className="w-4 h-4" />
                    <span>Sign up</span>
                  </Link>
                </Button>
              </>
            )}
          </div>

          <Button 
            variant="ghost" 
            size="icon"
            className="md:hidden text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-gray-900 shadow-lg"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              <Button 
                variant="ghost" 
                onClick={toggleDarkMode}
                className="w-full justify-start text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                {isDarkMode ? <Sun className="h-4 w-4 mr-2" /> : <Moon className="h-4 w-4 mr-2" />}
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              </Button>
              {authenticated ? (
                <Button 
                  variant="outline" 
                  onClick={handleLogout}
                  className="w-full justify-start text-gray-700 dark:text-gray-300 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900 dark:hover:text-red-400"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              ) : (
                <>
                  <Button 
                    variant="ghost" 
                    asChild
                    className="w-full justify-start text-gray-700 dark:text-gray-300 hover:bg-emerald-100 hover:text-emerald-600 dark:hover:bg-emerald-900 dark:hover:text-emerald-400"
                  >
                    <Link to="/login">
                      <LogIn className="w-4 h-4 mr-2" />
                      Log in
                    </Link>
                  </Button>
                  <Button 
                    asChild 
                    className="w-full justify-start bg-emerald-500 text-white hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700"
                  >
                    <Link to="/signup">
                      <UserPlus className="w-4 h-4 mr-2" />
                      Sign up
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

const NavLink = ({ to, children, isActive, mobile = false }) => (
  <Link
    to={to}
    className={`
      ${mobile ? 'block w-full py-2 px-4' : 'inline-flex items-center'}
      ${isActive 
        ? 'text-emerald-600 dark:text-emerald-400 font-semibold' 
        : 'text-gray-700 dark:text-gray-300'}
      hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200
    `}
  >
    {children}
  </Link>
);

export default Navbar;