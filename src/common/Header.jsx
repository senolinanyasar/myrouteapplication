import React, { useEffect, useState } from "react";

const Header = ({ title, companyName }) => {
  const [currentDateTime, setCurrentDateTime] = useState("");

  
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const formattedDateTime = now.toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setCurrentDateTime(formattedDateTime);
    };

    
    updateDateTime();

   
    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg border-b border-gray-700">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-100">{title}</h1>
            <p className="text-sm text-gray-400">Welcome, {companyName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">{currentDateTime}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
