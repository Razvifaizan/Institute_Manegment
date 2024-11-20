
import { deleteSubCategory, updateSubCategory, viewSubCategoryList, viewSubCategoryListbyAdmin, viewSubCategoryListbyTeacher } from "../../../api/controller/SubCategaryController";
// import TeacherRegistration from "../components/TeacheRajistation";

export default{
    registerAPI:"http://localhost:4019/saveUser",
    TeacherRegister :"http://localhost:4019/admin/saveAdmin",
    teacherLogin:"http://localhost:4019/admin/loginAdmin",
    // approveTeacher
    // viewPandingTeacher

    aprovedTeachers:"http://localhost:4019/admin/approveTeacher",
    deletTecher:"http://localhost:4019/admin/deleteAdmin",
    viewPandingTeacher:"http://localhost:4019/admin/viewPandingTeacher",
    viewActiveTeacher:"http://localhost:4019/admin/viewActiveTeacher",
    viewMainAdmin:"http://localhost:4019/admin/viewMainAdmin",
   
    loginAPI:'http://localhost:4019/loginUser',
    saveCategory:"http://localhost:4019/category/saveCategory",
    savSubCategory:'http://localhost:4019/subCategory/saveSubCategory',
    viewAllCategory:"http://localhost:4019/category/viewAllCategoryList",
    saveProduct:'http://localhost:4019/product/saveProduct',
    viewAllLecture:"http://localhost:4019/product/viewAllProductDetailsList",
    viewAllSubCategory:"http://localhost:4019/subCategory/viewAllSubCategoryList",
    viewSubCategoryList:'http://localhost:4019/subCategory/viewSubCategoryList',
    viewplayList:'http://localhost:4019/product/viewProduct',
    registeradmin:'http://localhost:4019/saveAdmin',
    //==============================================================================================
    viewSubCategoryListbyAdmin:"http://localhost:4019/subCategory/viewSubCategoryListbyAdmin",
    viewSubCategoryListbyTeacher:"http://localhost:4019/subCategory/viewSubCategoryListbyTeacher",
    deleteSubCategory:"http://localhost:4019/subCategory/deleteSubCategory",
    updateSubCategory:"http://localhost:4019/subCategory/updateSubCategory",
    // ===============================================================================================
    LoginUserInfo:'http://localhost:4019/loginUserInfo',
    LoginTeacherInfo:'http://localhost:4019/admin/loginAdminInfo',
    UpdateUser:'http://localhost:4019/updateUser',
    UploadUserPic:"http://localhost:4019/userUploadPic",
    ChangeUserPic:"http://localhost:4019/changeIcon",
    ChangeAdminPic:"http://localhost:4019/admin/changeIcon",
    likeProduct: "http://localhost:4019/product",
    addCumment:"http://localhost:4019/product/addComment",
    viewCumment:"http://localhost:4019/product/viewComment",
    deleteCategory:"http://localhost:4019/category/deleteCategory",
    updateCategory:"http://localhost:4019/category/updateCategory",

    // deleteCategory
 


    getMessages:"http://localhost:4019/admin/getMessages",
    sendMessage:"http://localhost:4019/admin/sendmessage"


    
}