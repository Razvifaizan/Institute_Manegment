import { NavLink } from "react-router-dom";
import "../assets/style/admin.css";
import { useSelector } from "react-redux";
import React from "react";

function MainAdminSidebar() {
    const data = useSelector(state => state.userCart.value);
    const profileImage = data.User_Icon ? `/userIcon/${data.User_Icon}` : defaultImg;

    console.log(data);
    console.log("Admin Data is " + JSON.stringify(data));

    return (
        <>
            <div className="sidebar pe-4 pb-3 col-md-3">
                <nav className="navbar bg-light navbar-light">
                    <NavLink to="/index" className="navbar-brand mx-4 mb-3">
                        <h3 className="text-primary"><i className="fa fa-hashtag me-2"></i>DASHMIN</h3>
                    </NavLink>
                    <div className="d-flex align-items-center ms-4 mb-4">
                        <div className="position-relative">
                            <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
                        </div>
                        <div className="ms-3 d-flex">
                            <img src={profileImage} width={"80px"} alt="user_Icon" />
                            <div>
                                <h6 className="mb-0">{data.name}</h6>
                                <span className="c-g">Admin</span>
                            </div>
                        </div>
                    </div>
                    <div className="navbar-nav w-100">
                        <NavLink to="/MainAdminHome" className={({ isActive }) => isActive ? "nav-item nav-link active" : "nav-item nav-link"}>
                            <i className="fa fa-tachometer-alt me-2"></i>Dashboard
                        </NavLink>
                        <NavLink to="/activeTecher" className={({ isActive }) => isActive ? "nav-item nav-link active" : "nav-item nav-link"}>
                            <i className="fa fa-bell" aria-hidden="true"></i>Active Teacher
                        </NavLink>
                        <NavLink to="/AddCategory" className={({ isActive }) => isActive ? "nav-item nav-link active" : "nav-item nav-link"}>
                            <i className="fa fa-th me-2"></i>Add Course
                        </NavLink>
                        <NavLink to="/ViewLecture" className={({ isActive }) => isActive ? "nav-item nav-link active" : "nav-item nav-link"}>
                            <i className="fa fa-chart-bar me-2"></i>View Lectures
                        </NavLink>
                        <NavLink to="/pandingTecher" className={({ isActive }) => isActive ? "nav-item nav-link active" : "nav-item nav-link"}>
                            <i className="fa fa-refresh" aria-hidden="true"></i>Pending Teacher
                        </NavLink>
                    </div>
                </nav>
            </div>
        </>
    );
}

export default MainAdminSidebar;
