import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import WebServise from "../service/WebServise";
import WebAPI from "../service/WebAPI";

// Images
import img1 from "../assets/Images/mern.png";
import img2 from "../assets/Images/fullstack.png";
import img3 from "../assets/Images/mean.jpeg";
import img4 from "../assets/Images/django.jpeg";
import img5 from "../assets/Images/download.jpeg";
import defaultimg from "../assets/Images/android.jpeg";
import MainAdminMenu from "./MainAdminMenu";
import MainAdminSidebar from "./MainAdminSideBar";

const imageMap = {
    "mern full stack": img1,
    "java full stack": img2,
    "mean full stack": img3,
    "django": img4,
    "cybersecurity": img5,
    // Add more mappings as needed
};

function MainAdminHome() {
    const data = useSelector(state => state.userCart.value);
    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        loadCategory();
    }, []);

    const loadCategory = async () => {
        try {
            const response = await WebServise.getAPICall(WebAPI.viewAllCategory, data.token);
            console.log("Category list is:", response);
            setCategoryList(response.data.subCatList); 
        } catch (error) {
            console.error("Error fetching category list:", error);
        }
    };

    console.log("User Icon:", data.User_Icon);

    return (
        <>
        {/* <MainAdminSidebar/> */}
        <div className="content">
            <div className="topic-area section-padding40">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-7 col-lg-8">
                            <div className="section-tittle text-center mb-55">
                                <h2>Explore Top Courses</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {categoryList.map((obj) => (
                            <div key={obj.category_name} className="col-lg-3 col-md-4 col-sm-6">
                                <div className="single-topic text-center mb-30">
                                    <div className="topic-img">
                                        <img 
                                            height="150px"
                                            src={imageMap[obj.category_name] || defaultimg} 
                                            alt={obj.category_name}
                                        />
                                        <div className="topic-content-box">
                                            <div className="topic-content">
                                                <h3>
                                                    <Link to={`/viewSubCat/${obj.category_name}`}>{obj.category_name}</Link>
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                </div>
            </div>
        </div>
        </>
    );
}

export default MainAdminHome;
