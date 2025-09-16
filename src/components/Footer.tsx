import React, { useState } from "react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const legalLinks = [
    { name: "Privacy Policy", href: "/" },
    { name: "Terms of Service", href: "/" },
    { name: "Cookie Policy", href: "/" },
  ];

  return (
    <footer className="bg-gradient-to-br from-background via-background to-background/95 border-t border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Bottom Bar */}
        <div className="py-8 border-t border-border/30">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            <div className="text-center lg:text-left">
              <p className="text-foreground/60 text-sm mb-2">
                &copy; {currentYear} Jay Sarvaiya. All rights reserved.
              </p>
              <p className="text-xs text-foreground/40">
                Built with ❤️ using React, TypeScript & Tailwind CSS
              </p>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-end gap-8">
              {legalLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-foreground/60 hover:text-accent text-sm transition-colors duration-300 hover:underline"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
