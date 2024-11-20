import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import WebServise from "../service/WebServise";
import WebAPI from "../service/WebAPI";
import { useSelector } from "react-redux";

function ProductListView() {
    const { sub_category_name } = useParams();
    const data = useSelector(state => state.userCart.value);
    const [productList, setProductList] = useState([]);

    // State to manage comment visibility
    const [visibleCommentIndex, setVisibleCommentIndex] = useState(null);

    useEffect(() => {
        loadProducts();
    }, [sub_category_name]);

    const loadProducts = async () => {
        try {
            const response = await WebServise.postAPICall(WebAPI.viewplayList, data.token, { subcategory: sub_category_name });
            setProductList(response.data.product);
            console.log(response.data.product);
        } catch (error) {
            console.error("Error fetching product list:", error);
        }
    };

    // Toggle comment visibility
    const toggleCommentVisibility = (index) => {
        setVisibleCommentIndex(visibleCommentIndex === index ? null : index);
    };

    return (
        <div className="product-list-area section-padding40">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-7 col-lg-8">
                        <div className="section-tittle text-center mb-2">
                            <h5>{sub_category_name} Playlist Videos</h5>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {productList.length === 0 ? (
                        <h1>No Products Available</h1>
                    ) : (
                        productList.map((product, index) => (
                            <div className="col-lg-3 col-md-4 col-sm-6" key={product._id}>
                                <div className="single-topic text-center mb-30">
                                    <div className="topic-content-box">
                                        <div className="topic-content">
                                            <Link to="/halfPageVideo" state={{
                                                videoUrl: `/lecture/${product.product_image}`,
                                                videoName: product.product_name,
                                                videoDescription: product.product_description,
                                                adminImg: `/userIcon/${product.admin_Img}`,
                                                adminName: product.admin_name,
                                                productId: product._id,
                                                videoLike: product.likes,
                                                subsequentVideos: productList.filter(p => p._id !== product._id)
                                            }}>
                                                <div className="vedeo">
                                                    <video
                                                        src={`/lecture/${product.product_image}`}
                                                        style={{ width: '100%', height: '100%' }}
                                                    />
                                                </div>
                                                <h5 className="p-0 m-0">{product.product_name}</h5>
                                                <p className="p-0 m-0">{product.product_description}</p>
                                            

                                            <div className="d-flex tec-box">
                                                <div className="admin-icon d-flex">
                                                    <img src={`/userIcon/${product.admin_Img}`} width={"30px"} height={"30px"} alt="" />
                                                    <p className="m-0 p-0">{product.admin_name}</p>
                                                </div>

                                                <div className="d-flex">
                                                    <p className="m-0">👍🏻{product.likes}</p>
                                                </div>
                                            </div>

                                           </Link>
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

export default ProductListView;
