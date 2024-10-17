import React from "react";

const Footer = () => {
  return (
    <footer className="py-4 bg-gradient-to-r from-[#F1F9FF] to-[#E8F0FE] border-t border-gray-200">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="mb-2 md:mb-0">
            <h2 className="text-2xl font-bold text-[#2A2A72] transition-transform duration-300 hover:scale-105 uppercase">
              PLACEMATE
            </h2>
            <p className="text-xs text-[#6C757D] md:text-xs">
              © 2024 CodeSorcerers. All rights reserved.
            </p>
          </div>

          <div className="flex mt-2 space-x-4 md:mt-0">
            <a
              href="https://github.com/NishantCM31/PlacementPro"
              className="transition-colors duration-200 hover:text-[#007BFF]"
              aria-label="GitHub"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.372 0 0 5.372 0 12c0 5.303 3.438 9.8 8.205 11.387.6.111.82-.26.82-.578 0-.286-.011-1.241-.017-2.243-3.338.725-4.043-1.609-4.043-1.609-.546-1.386-1.333-1.758-1.333-1.758-1.086-.741.082-.726.082-.726 1.198.084 1.829 1.23 1.829 1.23 1.064 1.823 2.795 1.296 3.476.99.108-.772.417-1.296.76-1.593-2.665-.303-5.465-1.331-5.465-5.923 0-1.311.468-2.383 1.236-3.22-.124-.303-.536-1.529.117-3.176 0 0 1.008-.323 3.303 1.23a11.536 11.536 0 013.006-.404c1.024.004 2.055.139 3.006.404 2.295-1.553 3.303-1.23 3.303-1.23.653 1.647.243 2.873.12 3.176.77.837 1.236 1.909 1.236 3.22 0 4.61-2.804 5.617-5.474 5.911.43.373.817 1.104.817 2.223 0 1.605-.015 2.902-.015 3.29 0 .318.218.694.825.578C20.565 21.798 24 17.303 24 12c0-6.628-5.372-12-12-12z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
