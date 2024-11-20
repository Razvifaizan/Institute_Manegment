import { useEffect, useRef, useState } from "react";
import React from "react";
import "../assets/style/admin.css";
import WebServise from "../service/WebServise";
import WebAPI from "../service/WebAPI";
import { useSelector } from "react-redux";

function Addplaylist() {
    const [categoryList, setCategoryList] = useState([]);
    const [msg, setMsg] = useState('');
    const [msg2, setMsg2] = useState('');
    const [msg3, setMsg3] = useState('');
    const cat_name = useRef();
    const sub_cat_name = useRef();
    const catSelect = useRef();
    const pName = useRef();
    const pDis = useRef();
    const pPrice = useRef();
    const pFile = useRef();

    useEffect(() => {
        loadCatList();
    }, []);

    const data = useSelector(state => state.userCart.value);

    // console.log(data);

    const loadCatList = async () => {
        try {
            const response = await WebServise.getAPICall(WebAPI.viewAllCategory,data.token);
            console.log(response);
            setCategoryList(response.data.subCatList); // Properly setting state
        } catch (error) {
            console.error("Error fetching category list:", error);
        }
    };

    const saveCategory = async (event) => {
        event.preventDefault();
        const c_name = cat_name.current.value;
        const obj = { category_name: c_name };

        try {
            const response = await WebServise.postAPICall(WebAPI.saveCategory,data.token, obj);
            if (response.data.status) {
                setMsg(response.data.message + " ✔");
                loadCatList();
            } else {
                setMsg(response.data.message);
            } 
        } catch (error) {
            console.error("Error during Add Category:", error);
            setMsg("An error occurred during Add Category.");
        }
    };

   const saveSubCat = async (event) => {
    event.preventDefault();
    const cs_name = sub_cat_name.current.value;
    const cName = catSelect.current.value;

    const obj = {
        subCategory_name: cs_name,
        category_name: cName,
        admin_name: data.name,
        admin_Id: data._id,
        admin_Img: data.User_Icon
    };

    try {
        const response = await WebServise.postAPICall(WebAPI.savSubCategory,data.token,obj);
        if (response.data.status) {
            setMsg2(response.data.message + " ✔");
        } else {
            // Display detailed error message from the backend
            setMsg2(response.data.message);
        }
    } catch (error) {
        console.error("Error during Add Sub-Category:", error);
        setMsg2(error.response.data.message);
    }
};


    return (
        <>
           <div className="content">
    <div className="container-fluid pt-4 px-4">
        <div className="row g-4">
            
            <div className="col-sm-12 col-xl-6">
                <div className="bg-light rounded h-100 p-4">
                    <h6 className="mb-4 add-heading">Your Playlist</h6>
                    <form onSubmit={saveSubCat}>
                        <div className="row mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                Select Course:
                            </label>
                            <div className="form-group">
                                <select className="form-control" ref={catSelect}>
                                    <option selected disabled>Please Select Course</option>
                                    {categoryList.map((obj) => (
                                        <option key={obj._id} value={obj.category_name}>
                                            {obj.category_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                Enter playlist Name:
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                ref={sub_cat_name}
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                            />
                        </div>

                        <button type="submit" className="btn">
                            Add
                        </button>
                    </form>

                    {msg2 && <div className="alert alert-danger">{msg2}</div>}
                </div>

                
            </div>
        </div>
              
                                       
                                   
    </div>
</div>

        </>
    );
}

export default Addplaylist;
