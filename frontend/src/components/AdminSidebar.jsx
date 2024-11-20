import { Link } from "react-router-dom"
import "../assets/style/admin.css"
import { useSelector } from "react-redux"
import defaultImg from "../assets/Images/default.jpg"
import React from "react";

function AdminSidebar(){
    
    const data = useSelector(state=>state.userCart.value)
    const profileImage = data.User_Icon ? `/userIcon/${data.User_Icon}` : defaultImg;
// const data = useSelector(state=>state.userCart.value)
    console.log(data)
    console.log("Admin Data is"+JSON.stringify(data))
    return<>
    <div class="sidebar pe-4 pb-3">
            <nav class="navbar bg-light navbar-light">
                <Link href="index.html" class="navbar-brand mx-4 mb-3">
                    <h3 class="text-primary"><i class="fa fa-hashtag me-2"></i>DASHMIN</h3>
                </Link>
                <div class="d-flex align-items-center ms-4 mb-4">
                    <div class="position-relative">
                        {/* <img class="rounded-circle" src="img/user.jpg" alt="" style="width: 40px; height: 40px;"/> */}
                        <div class="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
                    </div>
                    <div class="ms-3 d-flex">
                        <img src={profileImage} width={"80px"} alt="user_Icon" />
                        <div>
                            <h6 class="mb-0">{data.name}</h6>
                        <span className="c-g">Admin</span>
                        </div>
                    </div>
                </div>
                <div class="navbar-nav w-100">
                    <Link to={"./adminHome"} class="nav-item nav-link"><i class="fa fa-tachometer-alt me-2"></i>Dashboard</Link>
                    <Link to={"/adminmessage"}  class="nav-item nav-link"><i class="fa fa-tachometer-alt me-2"></i>Admin Message</Link>
                    <Link to="./Addplaylist" class="nav-item nav-link"><i class="fa fa-th me-2"></i>Add Playlist</Link>
                    <Link to={"./AddProduct"} class="nav-item nav-link"><i class="fa fa-plus me-2"></i>Add Video</Link>
                    
                    <div class="nav-item dropdown">
                        {/* <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i class="far fa-file-alt me-2"></i>Pages</a> */}
                        <div class="dropdown-menu bg-transparent border-0">
                            <Link to={"/pandingTecher"}  class="dropdown-item"><i class="fa fa-th me-2"></i>View Panding Techer</Link>
                             <Link to={"/pandingTecher"}  class="dropdown-item"><i class="fa fa-th me-2"></i>View Active Techer</Link>
                            
                            <Link to={"./"}  class="dropdown-item">Sign Up</Link>
                            <Link to={"./"} class="dropdown-item">404 Error</Link>
                            <Link to={"./"}  class="dropdown-item">Blank Page</Link>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    </>

}
export default AdminSidebar