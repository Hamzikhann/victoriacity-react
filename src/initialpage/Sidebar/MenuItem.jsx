import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function MenuItem({ title, path, icon, child }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;
  
  const toggleMenuChild = () => setIsMenuOpen(!isMenuOpen);
console.log('ZZZZZZZZZZZZZZZZZZZZ', child)
  return (
    <li className="submenu">
      <Link
        to={path}
        className={isMenuOpen ? "subdrop" : ""}
        onClick={toggleMenuChild}
      >
        <i className={icon} /> <span>{title}</span>
        {child.length > 0 && <span className="menu-arrow" />}{" "}
      </Link>
      {isMenuOpen && child.length > 0 && (
        <ul>
          {child.map((item) => (
            <li>
              <Link
                className={pathname.includes(item.path) ? "active" : ""}
                to={item.path}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export default MenuItem;
