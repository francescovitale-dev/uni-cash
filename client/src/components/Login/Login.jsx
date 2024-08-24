import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2, Eye, EyeOff, LogIn } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

const Login = () => {
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://eurasmus.onrender.com/api/v1/login",
        formData
      );
      const token = response.data.token;
      localStorage.setItem("token", token);
      toast({
        title: "Welcome back!",
        description: "You've successfully logged into your UniCash account.",
        duration: 5000,
      });
      // Redirect to the tracker page
      navigate("/tracker");
      // Refresh the page after a short delay to ensure proper loading of user data
      setTimeout(() => {
        window.location.reload();
      }, 100);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred while processing your request. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-md shadow-2xl bg-white dark:bg-gray-800 rounded-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 dark:from-emerald-600 dark:to-teal-700 text-white px-6 py-8">
          <CardTitle className="text-4xl font-extrabold text-center">
            Welcome to UniCash
          </CardTitle>
        </CardHeader>
        <CardContent className="px-8 py-10">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Alert
                variant="destructive"
                className="mb-6 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100 border border-red-200 dark:border-red-800"
              >
                <AlertCircle className="h-5 w-5" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </motion.div>
          )}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label
                htmlFor="identifier"
                className="block mb-2 font-semibold text-gray-700 dark:text-gray-200"
              >
                Email or Username
              </label>
              <Input
                id="identifier"
                type="text"
                name="identifier"
                value={formData.identifier}
                onChange={handleInputChange}
                required
                className="w-full text-gray-700 dark:text-white bg-gray-100 dark:bg-gray-700 border-none rounded-lg focus:ring-2 focus:ring-emerald-500"
                placeholder=""
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 font-semibold text-gray-700 dark:text-gray-200"
              >
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full pr-10 text-gray-700 dark:text-white bg-gray-100 dark:bg-gray-700 border-none rounded-lg focus:ring-2 focus:ring-emerald-500"
                  placeholder=""
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </Button>
              </div>
            </div>
            <Button
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold rounded-lg py-3 transition-all duration-300 transform hover:scale-105"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Logging in...
                </>
              ) : (
                <>
                  <LogIn className="mr-2 h-5 w-5" />
                  Login
                </>
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center bg-gray-50 dark:bg-gray-800 px-8 py-6 space-y-3">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Not registered yet?{" "}
            <Link
              to="/signup"
              className="text-emerald-500 hover:text-emerald-600 font-semibold hover:underline transition-colors duration-300"
            >
              Sign up for UniCash
            </Link>
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default Login;