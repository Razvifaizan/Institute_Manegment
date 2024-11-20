import { useEffect } from 'react';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Menu from './components/Menu';
import Home from './components/Home';
import Login from './components/Login';
import Registration from './components/Registrasion';
import UserHome from './components/UserHome';
import { useSelector } from 'react-redux';
import UserMenu from './components/UserMenu';
import AdminMenu from './components/AdminMenu';
import AdminHome from './components/AdminHome';
import AdminSidebar from './components/AdminSidebar';
import AddCategory from './components/AddCourse';
// import AddProduct from './components/AddProduct';
import ViewAllLecture from './components/ViewAllLecture';
import RoleProtectedRoute from './components/RoleProtectedRoute'; // Role-based ProtectedRoute
import SubCategoryView from './components/SubcategoryView';
import ViewPlaylist from './components/ViewPlaylist';
import MyProfile from './components/MyProfile';
import UserProfile from './components/Userprofile';
import HalfPageVideo from './components/HalfPageVideo';
// import Filter from './components/Filter';
import TeacherRegistration from './components/TeacheRajistation';
import PendingTeachers from './components/PendingTeachers';
import TeacherLogin from './components/TeacherLogin';
import ActiveTecher from './components/ActiveTeacher';
import About from './components/About';
import Team from './components/Team';
import MainAdminHome from './components/MainAdminHome';
import MainAdminSidebar from './components/MainAdminSideBar';
import ViewLecture from './components/ViewLecture';
import ViewTeacherPlaylist from './components/ViewTeacherPlaylist';
import Addplaylist from './components/Addplaylist';
import MainAdminProfile from './components/MainAdminProfile';
import MainAdminMenu from './components/MainAdminMenu';
import AdminMessage from './components/AdminMessage';
import AddVideo from './components/AddVideo';
import AddCourse from './components/AddCourse';
// import AdminMessage from './components/AdminMessage';


function App() {
  const data = useSelector(state => state.userCart.value);

  useEffect(() => {
    console.log("Data is: " + JSON.stringify(data));
  }, [data]);

  return (
    <>
       {(data.role === "main-admin") ? <><MainAdminMenu/> </> : (data.role === "admin") ? <> <AdminSidebar/> <AdminMenu/> </> : (data.role === "user") ? <UserMenu/> : <Menu/>}

      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Registration/>}></Route>
        
        <Route path="/registration" element={<TeacherRegistration/>}></Route>
        <Route path="/teacherLogin" element={<TeacherLogin/>}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route path="/team" element={<Team/>}></Route>

        {/* registration */}
        {/* pandingTecher */}
        
        
        <Route path="/userHome" element={
          <RoleProtectedRoute requiredRole="user">
            <UserHome />
          </RoleProtectedRoute>
        } />
        <Route path="/MyProfile" element={
          <RoleProtectedRoute requiredRole="admin">
            <MyProfile />
          </RoleProtectedRoute>
        } />
        <Route path="/activeTecher" element={
          <RoleProtectedRoute requiredRole="main-admin">
            <ActiveTecher />
          </RoleProtectedRoute>
        } />


         <Route path="/pandingTecher" element={
          <RoleProtectedRoute requiredRole="main-admin">
            <PendingTeachers />
          </RoleProtectedRoute>
        } />

        
        <Route path="/userProfile" element={
          <RoleProtectedRoute requiredRole="user">
            <UserProfile/>
          </RoleProtectedRoute>
        } />
        
        <Route path="/viewPlaylist/:sub_category_name" element={
          <RoleProtectedRoute requiredRole="user">
            <ViewPlaylist/>
          </RoleProtectedRoute>
        } />
        <Route path="/halfPageVideo" element={
          <RoleProtectedRoute requiredRole="user">
            <HalfPageVideo/>
          </RoleProtectedRoute>
        } />
         <Route path="/Addplaylist" element={
          <RoleProtectedRoute requiredRole="admin">
            <Addplaylist/>
          </RoleProtectedRoute>
        } />
        <Route path="/viewSubCat/:category_name" element={<RoleProtectedRoute requiredRole="user">
            <SubCategoryView />
          </RoleProtectedRoute>} />  

          <Route path="/teacher/:teacherId/subcategories" element={<RoleProtectedRoute requiredRole="main-admin">
            <ViewTeacherPlaylist />
          </RoleProtectedRoute>} />           
        
        <Route path="/adminHome" element={
          <RoleProtectedRoute requiredRole="admin">
            <AdminHome/>
          </RoleProtectedRoute>
        } />
       

        {/* adminmessage */}
        
        <Route path="/MainAdminHome" element={
          <RoleProtectedRoute requiredRole="main-admin">
            <MainAdminHome/>
          </RoleProtectedRoute>
        } />

         <Route path="/MainAdminProfile" element={
          <RoleProtectedRoute requiredRole="main-admin">
            <MainAdminProfile/>
          </RoleProtectedRoute>
        } />

        {/* MainAdminProfile */}
        <Route path="/addCategory" element={
          <RoleProtectedRoute requiredRole="main-admin">
            <AddCourse/>
          </RoleProtectedRoute>
        } />
         <Route path="/ViewLecture" element={
          <RoleProtectedRoute requiredRole="main-admin">
            <ViewLecture/>
          </RoleProtectedRoute>
        } />

        <Route path="/adminmessage" element={
          <RoleProtectedRoute requiredRole="admin">
            <AdminMessage/>
          </RoleProtectedRoute>
        } />
        
        <Route path="/addProduct" element={
          <RoleProtectedRoute requiredRole="admin">
            <AddVideo/>
          </RoleProtectedRoute>
        } />
        
        <Route path="/viewAllLecture" element={
          <RoleProtectedRoute requiredRole="admin">
            <ViewAllLecture/>
          </RoleProtectedRoute>
        } />
      </Routes>
    </>
  );
}

export default App;
