import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";
import Logo from "../assets/Images/logo.webp"; // Adjust the path to your logo image

function Menu() {
  const [isScrolled, setIsScrolled] = useState(false); // For sticky header
  const [menuOpen, setMenuOpen] = useState(false); // For mobile menu toggle

  useEffect(() => {
    // Add scroll event to make header sticky when scrolling
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""} p-0`}>
      <div className="container d-flex main-nav align-items-center justify-content-between">
        {/* Logo Section */}
        <Link to="/" className="logo d-flex align-items-center">
          <img src={Logo} alt="Logo" className="me-2" />
          
        </Link>

        {/* Mobile Menu Toggle */}
        <i
          className="mobile-nav-toggle d-xl-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✖" : "☰"}
        </i>

        {/* Navigation Menu */}
        <nav className={`navmenu ${menuOpen ? "active" : ""}`}>
          <ul className="d-flex flex-column flex-md-row">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/team">Team</Link></li>
            
            {/* Login Dropdown */}
            <li className="nav-item dropdown">
              <Link to="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                <span className="">Login</span>
              </Link>
              <div className="dropdown-menu dropdown-menu-end bg-light border-0 rounded-0 rounded-bottom m-0">
                <Link to="/teacherLogin" className="dropdown-item">Teacher Login</Link>
                <Link to="/login" className="dropdown-item">Student Login</Link>
              </div>
            </li>

            {/* Registration Dropdown */}
            <li className="nav-item dropdown">
              <Link to="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                <span className="">Registration</span>
              </Link>
              <div className="dropdown-menu dropdown-menu-end bg-light border-0 rounded-0 rounded-bottom m-0">
                <Link to="/registration" className="dropdown-item">Teacher Registration</Link>
                <Link to="/register" className="dropdown-item">Student Registration</Link>
              </div>
            </li>
          </ul>
        </nav>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .navmenu {
            display: none;
            flex-direction: column;
          }
          .navmenu.active {
            display: flex;
          }
          .mobile-nav-toggle {
            display: block;
          }
        }
        @media (min-width: 769px) {
          .mobile-nav-toggle {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}

export default Menu;
