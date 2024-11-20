import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import WebServise from "../service/WebServise";
import WebAPI from "../service/WebAPI";
import { useSelector } from "react-redux";
import defaultImag from "../assets/Images/default.jpg"
function SubCategoryView() {
    const data = useSelector(state=>state.userCart.value)
    const { category_name } = useParams();
    const [subCategoryList, setSubCategoryList] = useState([]);

    useEffect(() => {
        loadSubCategories();
    }, [category_name]);

    const loadSubCategories = async () => {
        try {
            const response = await WebServise.postAPICall(WebAPI.viewSubCategoryList,data.token,{ category: category_name })
            setSubCategoryList(response.data.subCategories);
            console.log(response.data.subCategories)
        } catch (error) {
            console.error("Error fetching subcategory list:", error);
        }
    };

    return (
        <div className="sub-category-area section-padding40">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-7 col-lg-8">
                        <div className="section-tittle text-center mb-55">
                            <h2>Sessons for {category_name}</h2>
                        </div>
                    </div>
                </div>
<div className="row">
    {subCategoryList.length === 0 ? (
        <h1>Playlist Coming Soon</h1>
    ) : (
        subCategoryList.map((subCat) => (
            <div className="col-lg-3 col-md-4 col-sm-6" key={subCat._id}>
                <div className="single-topic text-center mb-30">
                    <div className="topic-content-box">
                        <div className="topic-content_playlist">
                            <div className="d-flex playListBox">
                                <img src={`/userIcon/${subCat.admin_Img}`}  height={70} width={70} className="img-circle" />
                            <h5>{subCat.admin_name}</h5>
                            </div>
                            <h3 className="mt-4 playlistHeading" >{subCat.subCategory_name}</h3>
                            <button className="btn"><Link className="playListLink" to={`/viewPlaylist/${subCat.subCategory_name}`}>View Playlist</Link></button>
                        </div>
                    </div>
                </div>
            </div>
        ))
    )}
</div>
            </div>
        </div>
    );
}

export default SubCategoryView;
