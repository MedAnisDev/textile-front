import React, { useState, useRef, useEffect } from 'react';
import { fetchAllProductsByCategory } from '../service/product/product';


const CategoryFilter = ({ categories, activeCategory, onCategoryChange })=> {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

     const toggleDropdown = () => {
         setIsOpen(!isOpen);
    };
    const handleCategorySelect = (category) => {
        onCategoryChange(category);
          setIsOpen(false)
    };

    useEffect(() => {
     const handleClickOutside = (event) => {
         if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
      };
    document.addEventListener("mousedown", handleClickOutside);


     return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [dropdownRef]);
    
  return (
      <div ref={dropdownRef} className="relative inline-block text-left">
        <div>
          <button
            onClick={toggleDropdown}
            type="button"
             className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
             id="menu-button" aria-expanded="false" aria-haspopup="true"
            >
             {activeCategory}
              </button>
           </div>

          {isOpen && (
                <div className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                 <div className="py-1" role="none">
                      {categories.map((category, index) => (
                           <button
                            key={index}
                           onClick={() => handleCategorySelect(category)}
                             className={`block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none ${
                              activeCategory === category
                           ? 'bg-gray-100 text-gray-900 font-semibold'
                              : ''
                                 }`}
                           role="menuitem" tabIndex="-1">
                            {category}
                        </button>
                      ))}
                      </div>
                 </div>
               )}
        </div>
    );
 }

 export default CategoryFilter;