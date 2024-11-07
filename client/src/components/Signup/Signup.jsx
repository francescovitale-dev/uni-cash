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
import { AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Eye, EyeOff, Check, X } from "lucide-react";
import { motion } from "framer-motion";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    return { minLength, hasUppercase, hasLowercase, hasDigit };
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { password, confirmPassword } = formData;
    const passwordValidation = validatePassword(password);

    if (!Object.values(passwordValidation).every(Boolean)) {
      setError("Please make sure your password meets all the requirements.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      // Register the user
      const registerResponse = await axios.post(
        "https://eurasmus.onrender.com/api/v1/register",
        formData
      );
      
      if (!registerResponse.data.success) {
        setError(registerResponse.data.message);
      } else {
        // If registration is successful, proceed with login
        const loginResponse = await axios.post(
          "https://eurasmus.onrender.com/api/v1/login",
          {
            identifier: formData.email,
            password: formData.password
          }
        );

        if (loginResponse.data.token) {
          // Store the token in localStorage
          localStorage.setItem("token", loginResponse.data.token);

          toast({
            title: "Welcome to UniCash!",
            description: "Your account has been created and you're now logged in.",
          });

          // Redirect to the main app page
          navigate("/tracker");

          // Refresh the page to ensure all app components recognize the logged-in state
          setTimeout(() => {
            window.location.reload();
          }, 100);
        } else {
          throw new Error("Login failed after registration");
        }
      }
    } catch (error) {
      console.error("Signup error:", error);
      setError("An error occurred during the signup process. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const passwordValidation = validatePassword(formData.password);

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-md shadow-2xl rounded-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 dark:from-emerald-600 dark:to-teal-700 text-white px-6 py-8">
          <CardTitle className="text-4xl font-extrabold text-center">
            Join UniCash
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
          <form onSubmit={handleSignup} className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block mb-2 font-semibold text-gray-700 dark:text-gray-200"
              >
                Username
              </label>
              <Input
                id="username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
                className="w-full text-gray-700 dark:text-white bg-gray-100 dark:bg-gray-700 border-none rounded-lg focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 font-semibold text-gray-700 dark:text-gray-200"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full text-gray-700 dark:text-white bg-gray-100 dark:bg-gray-700 border-none rounded-lg focus:ring-2 focus:ring-emerald-500"
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
            <div>
              <label
                htmlFor="confirmPassword"
                className="block mb-2 font-semibold text-gray-700 dark:text-gray-200"
              >
                Confirm Password
              </label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className="w-full pr-10 text-gray-700 dark:text-white bg-gray-100 dark:bg-gray-700 border-none rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </Button>
              </div>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <p className="font-semibold mb-2">Password requirements:</p>
              <ul className="space-y-1">
                <li
                  className={
                    passwordValidation.minLength ? "text-emerald-500" : ""
                  }
                >
                  {passwordValidation.minLength ? (
                    <Check className="inline h-4 w-4 mr-1" />
                  ) : (
                    <X className="inline h-4 w-4 mr-1" />
                  )}
                  At least 8 characters
                </li>
                <li
                  className={
                    passwordValidation.hasUppercase ? "text-emerald-500" : ""
                  }
                >
                  {passwordValidation.hasUppercase ? (
                    <Check className="inline h-4 w-4 mr-1" />
                  ) : (
                    <X className="inline h-4 w-4 mr-1" />
                  )}
                  One uppercase letter
                </li>
                <li
                  className={
                    passwordValidation.hasLowercase ? "text-emerald-500" : ""
                  }
                >
                  {passwordValidation.hasLowercase ? (
                    <Check className="inline h-4 w-4 mr-1" />
                  ) : (
                    <X className="inline h-4 w-4 mr-1" />
                  )}
                  One lowercase letter
                </li>
                <li
                  className={
                    passwordValidation.hasDigit ? "text-emerald-500" : ""
                  }
                >
                  {passwordValidation.hasDigit ? (
                    <Check className="inline h-4 w-4 mr-1" />
                  ) : (
                    <X className="inline h-4 w-4 mr-1" />
                  )}
                  One digit
                </li>
              </ul>
            </div>
            <Button
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold rounded-lg py-3 transition-all duration-300 transform hover:scale-105"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center bg-gray-50 dark:bg-gray-800 px-8 py-6 space-y-3">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-emerald-500 hover:text-emerald-600 font-semibold hover:underline transition-colors duration-300"
            >
              Log in here
            </Link>
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default Signup;
