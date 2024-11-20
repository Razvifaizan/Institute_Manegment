import "../assets/style/userHome.css"
import img from "../assets/Images/hero-img.png"
import React from "react";
import { useEffect, useState } from "react"
import WebServise from "../service/WebServise"
import WebAPI from "../service/WebAPI"
import { Link } from "react-router-dom"

import img1 from "../assets/Images/mern.png";
import img2 from "../assets/Images/fullstack.png";
import img3 from "../assets/Images/mean.jpeg";
import img4 from "../assets/Images/django.jpeg";
import img5 from "../assets/Images/download.jpeg";
import defaultimg from "../assets/Images/android.jpeg";
import { useSelector } from "react-redux"

const imageMap = {
    "mern full stack": img1,
    "java full stack": img2,
    "mean full stack": img3,
    "django": img4,
    "cybersecurity": img5,
    // Add more mappings as needed
};
function UserHome(){

     useEffect(()=>{
        loadCategory()
    },[])

    const data = useSelector(state => state.userCart.value);
const [categoryList, setcategoryList] = useState([]);


   



    const loadCategory = async ()=>{
        try {
            const response = await WebServise.getAPICall(WebAPI.viewAllCategory,data.token);
            console.log("cate gory list is"+response);
            setcategoryList(response.data.subCatList); 
        } catch (error) {
            console.error("Error fetching category list:", error);
        }
    }
    return<>
    <div class="topic-area section-padding40">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-xl-7 col-lg-8">
                        <div class="section-tittle text-center mb-55">
                            <h2>Explore top Cources</h2>
                        </div>
                    </div>
                </div>
                <div class="row">
                    {categoryList.map((obj)=>(
                        <div class="col-lg-3 col-md-4 col-sm-6">
                        <div class="single-topic text-center mb-30">
                            <div class="topic-img"><img height={"150px"}
                                        src={imageMap[obj.category_name] || defaultimg} 
                                        alt={obj.category_name}
                                    />
                                <div class="topic-content-box">
                                    <div class="topic-content">
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
                <div class="row justify-content-center">
                    <div class="col-xl-12">
                        <div class="section-tittle text-center mt-20">
                            <a href="courses.html" class="border-btn">View More Subjects</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}
export default UserHome