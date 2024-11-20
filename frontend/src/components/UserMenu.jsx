import { Link } from "react-router-dom";
import React from "react";
import { useEffect, useState } from "react";
import Logo from "../assets/Images/logo.webp"; // Adjust the path to your logo image
import { useSelector } from "react-redux";
import defaultImg from "../../public/lecture/default.jpg"; // Adjust the path to your default image

function Menu() {
  const data = useSelector((state) => state.userCart.value);
  const profileImage = data.User_Icon ? `/userIcon/${data.User_Icon}` : defaultImg;
  const [isScrolled, setIsScrolled] = useState(false); // For sticky header
  const [menuOpen, setMenuOpen] = useState(false); // For mobile menu toggle

  useEffect(() => {
    console.log(data.User_Icon)
    // Add scroll event to make header sticky when scrolling
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 1);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
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
            <li><Link to="/userHome">Home</Link></li>

            {/* User Profile Section */}
            <li>
              <Link to="/userProfile" className="d-flex align-items-center">
                <img
                  width={40}
                  src={
                    data.User_Icon && (data.User_Icon.endsWith('.jpg') || 
                    data.User_Icon.endsWith('.png') || 
                    data.User_Icon.endsWith('.svg')) 
                    ? `${profileImage}` 
                    : profileImage
                  }
                  alt={data.name || "Profile Picture"}
                  className="me-2 rounded-circle"
                />
                <span>{data.name || "Guest"}</span>
              </Link>
            </li>

            {/* Logout Option */}
            <li>
              <Link to="#">
                <span>Log-Out</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <style jsx>{`
        // .header.scrolled {
        //   background-color: #fff; /* Change color as per your preference */
        //   box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        //   transition: background-color 0.3s, box-shadow 0.3s;
        // }

        .navmenu ul {
          display: flex;
          list-style: none;
        }

        @media (max-width: 768px) {
          .navmenu {
            display: none;
            position: absolute;
            inset: 60px 20px 20px 20px;
            padding: 10px 0;
            background-color: #f8f9fa;
            z-index: 9999;
            box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.1);
          }

          .navmenu.active {
            display: block;
          }

          .navmenu ul {
            flex-direction: column;
            gap: 10px;
          }

          .mobile-nav-toggle {
            cursor: pointer;
            font-size: 24px;
          }
        }
      `}</style>
    </header>
  );
}

export default Menu;
