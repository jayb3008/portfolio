
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 sm:py-12 px-4 sm:px-6 md:px-12 bg-background glass-morphism">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="mb-6 sm:mb-0">
            <div className="flex items-center justify-center sm:justify-start">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-accent to-purple-600 flex items-center justify-center mr-2 sm:mr-3">
                <span className="text-base sm:text-lg font-bold text-white">JS</span>
              </div>
              <span className="font-bold text-lg sm:text-xl text-foreground">
                DevPortfolio
              </span>
            </div>
            <p className="text-foreground/60 mt-2 text-sm text-center sm:text-left">
              Creating meaningful digital experiences.
            </p>
          </div>
          
          <div className="text-center sm:text-right">
            <p className="text-foreground/60 text-sm">
              &copy; {currentYear} Jay Sarvaiya. All rights reserved.
            </p>
            <div className="mt-2 space-x-4">
              <a href="#" className="text-foreground/60 hover:text-foreground text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-foreground/60 hover:text-foreground text-sm transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
