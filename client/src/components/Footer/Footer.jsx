import React from "react";
import { Link } from "react-router-dom";
import { Mail, ExternalLink, Linkedin, Github } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-emerald-500 to-teal-600 dark:from-emerald-900 dark:to-teal-950 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="col-span-1 md:col-span-2"
          >
            <h2 className="text-3xl font-bold mb-4">UniCash</h2>
            <p className="text-emerald-100 dark:text-emerald-200 mb-6">
              Your ultimate financial companion for a smarter student life. Budget, save, and thrive with UniCash.
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              <SocialLink href="https://www.vitalefrancesco.com/" icon={<ExternalLink />} ariaLabel="Website" />
              <SocialLink href="https://www.linkedin.com/in/francesco-vitale--/" icon={<Linkedin />} ariaLabel="LinkedIn" />
              <SocialLink href="https://github.com/francescovitale-dev" icon={<Github />} ariaLabel="GitHub" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-2xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <FooterLink href="/features">Features</FooterLink>
              <FooterLink href="/pricing">Pricing</FooterLink>
              <FooterLink href="/blog">Blog</FooterLink>
              <FooterLink href="/faq">FAQ</FooterLink>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold mb-4">Get in Touch</h3>
            <p className="flex items-center justify-center md:justify-start mb-4 text-emerald-100 dark:text-emerald-200">
              <Mail className="w-5 h-5 mr-2" />
              support@unicash.com
            </p>
            <Link
              to="/support"
              className="inline-block bg-white text-emerald-600 dark:bg-emerald-200 dark:text-emerald-800 font-semibold px-6 py-2 rounded-full transition-all duration-300 hover:bg-emerald-100 dark:hover:bg-emerald-300"
            >
              Get Support
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="mt-12 pt-8 border-t border-emerald-400 dark:border-emerald-700 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-sm text-emerald-100 dark:text-emerald-200 mb-4 text-center">
            &copy; {new Date().getFullYear()} UniCash. All rights reserved.
          </p>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 text-center">
            <Link to="/privacy" className="text-sm text-emerald-100 dark:text-emerald-200 hover:text-white transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-emerald-100 dark:text-emerald-200 hover:text-white transition-colors duration-300">
              Terms of Service
            </Link>
            <Link to="/accessibility" className="text-sm text-emerald-100 dark:text-emerald-200 hover:text-white transition-colors duration-300">
              Accessibility
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

const SocialLink = ({ href, icon, ariaLabel }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="text-emerald-100 dark:text-emerald-200 hover:text-white transition-colors duration-300"
    aria-label={ariaLabel}
  >
    {React.cloneElement(icon, { className: "w-6 h-6" })}
  </a>
);

const FooterLink = ({ href, children }) => (
  <li>
    <Link 
      to={href} 
      className="text-lg text-emerald-100 dark:text-emerald-200 hover:text-white transition-colors duration-300"
    >
      {children}
    </Link>
  </li>
);

export default Footer;