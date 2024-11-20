import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/Logo-removebg-preview.png";
import { useEffect, useState } from "react";
import "../assets/style/admin.css"
import { useSelector } from "react-redux";
import defaultImg from "../assets/Images/default.jpg"
import React from "react";



function AdminMenu() {
  const data = useSelector(state=>state.userCart.value)
  const profileImage = data.User_Icon ? `/userIcon/${data.User_Icon}` : defaultImg;
  const username = data.name

  console.log(data)
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    // <AdminSidebar/>
    <div class="content">
    <nav className={`navbar navbar-expand bg-light navbar-light sticky-top px-4 py-0 ${isScrolled ? 'scrolled' : ''}`}>
      <a href="index.html" className="navbar-brand d-flex d-lg-none me-4">
        <h2 className="text-primary mb-0"><i className="fa fa-hashtag"></i></h2>
      </a>
      <a href="#" className="sidebar-toggler flex-shrink-0">
        <i className="fa fa-bars"></i>
      </a>
      <form className="d-none d-md-flex ms-4">
        {/* <input className="form-control border-0" type="search" placeholder="Search" /> */}
      </form>
      <div className="navbar-nav align-items-center ms-auto">
        <div className="nav-item dropdown">
          <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
            <i className="fa fa-envelope me-lg-2"></i>
            <span className="d-none d-lg-inline-flex">Message</span>
          </a>
          <div className="dropdown-menu dropdown-menu-end bg-light border-0 rounded-0 rounded-bottom m-0">
            <a href="#" className="dropdown-item">
              <div className="d-flex align-items-center">
                <img className="rounded-circle" src={Logo} alt="User Avatar" style={{ width: "40px", height: "40px" }} />
                <div className="ms-2">
                  <h6 className="fw-normal mb-0">John sent you a message</h6>
                  <small>15 minutes ago</small>
                </div>
              </div>
            </a>
            <hr className="dropdown-divider" />
            <Link to="#" className="dropdown-item text-center">See all messages</Link>
          </div>
        </div>
        <div className="nav-item dropdown">
          <Link to={"./"} className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
            <i className="fa fa-bell me-lg-2"></i>
            <span className="d-none d-lg-inline-flex">Notification</span>
          </Link>
          <div className="dropdown-menu dropdown-menu-end bg-light border-0 rounded-0 rounded-bottom m-0">
            <a href="#" className="dropdown-item">
              <h6 className="fw-normal mb-0">Profile updated</h6>
              <small>15 minutes ago</small>
            </a>
            <hr className="dropdown-divider" />
            <a href="#" className="dropdown-item">
              <h6 className="fw-normal mb-0">New user added</h6>
              <small>15 minutes ago</small>
            </a>
            <hr className="dropdown-divider" />
            <Link to="#" className="dropdown-item">Password changed</Link>
            <hr className="dropdown-divider" />
            <Link to="#" className="dropdown-item text-center">See all notifications</Link>
          </div>
        </div>
        <div className="nav-item dropdown">
          <Link to={"/"} className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
            <img className="rounded-circle me-lg-2" src={profileImage} alt="User Avatar" style={{ width: "40px", height: "40px" }} />
            <span className="d-none d-lg-inline-flex">{username}</span>
          </Link>
          <div className="dropdown-menu dropdown-menu-end bg-light border-0 rounded-0 rounded-bottom m-0">
            <Link to={"/MyProfile"} className="dropdown-item">My Profile</Link>
            <Link to="#" className="dropdown-item">Settings</Link>
            <Link to="#" className="dropdown-item">Log Out</Link>
          </div>
        </div>
      </div>
    </nav>
    </div>
  );
}

export default AdminMenu;
