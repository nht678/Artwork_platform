// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// import Homepage from "../HomePage";
// import AboutPage from "../AboutPage";
// import ServicePage from "../ServicePage";
// import ServiceSingle from "../ServiceDetails";
// import CarListingPage from "../CarListingPage";
// import CarBookingPage from "../CarBookingPage";
// import GalleryPage from "../GalleryPage";
// import ProductPage from "../ProductPage";
// import ProductSinglePage from "../ProductSingle";
// import CartPage from "../CartPage";
// import Checkout from "../Checkout";
// import BlogPage from "../BlogPage";
// import BlogSinglePage from "../BlogSinglePage";
// import ErrorPage from "../ErrorPage";
// import LoginPage from "../LoginPage";
// import RegisterPage from "../RegisterPage";
// import ContactPage from "../ContactPage";
// //test
// import ProfilePage from "../ProfilePage";
// import AppView from "../AdminPage/src/sections/overview/view/app-view";
// // import App from "../AdminPage/src/app"
// // import Routert from "../../main-component/AdminPage/src/routes/sections"
// const AllRoute = () => {
//   return (
//     <div>
//       <Router>
//         <Routes>
//           <Route exact path="/" element={<ProductPage />} />
//           <Route path="/home" element={<Homepage />} />
//           <Route path="/about" element={<AboutPage />} />
//           <Route path="/service" element={<ServicePage />} />
//           <Route path="/service-single" element={<ServiceSingle />} />
//           <Route path="/car-listing" element={<CarListingPage />} />
//           <Route path="/car-booking" element={<CarBookingPage />} />
//           <Route path="/gallery" element={<GalleryPage />} />
//           <Route path="/product" element={<ProductPage />} />
//           <Route path="/product-single" element={<ProductSinglePage />} />
//           <Route path="/cart" element={<CartPage />} />
//           <Route path="/checkout" element={<Checkout />} />
//           <Route path="/blog" element={<BlogPage />} />
//           <Route path="/blog-single" element={<BlogSinglePage />} />
//           <Route path="/error" element={<ErrorPage />} />
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/register" element={<RegisterPage />} />
//           <Route path="/contact" element={<ContactPage />} />
//           <Route element={<ErrorPage />} />

//           <Route path="/profile" element={<ProfilePage />} />
//           <Route path="/appview" element={<AppView />} />
//         </Routes>
//       </Router>
//       {/* <Routert /> */}

//     </div>
//   );
// };

// export default AllRoute;
import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Các trang hiện tại
import Homepage from "../HomePage";
import AboutPage from "../AboutPage";
import ServicePage from "../ServicePage";
import ServiceSingle from "../ServiceDetails";
import CarListingPage from "../CarListingPage";
import CarBookingPage from "../CarBookingPage";
import GalleryPage from "../GalleryPage";
import ProductPage from "../ProductPage";
import ProductSinglePage from "../ProductSingle";
import CartPage from "../CartPage";
import Checkout from "../Checkout";
import BlogPage from "../BlogPage";
import BlogSinglePage from "../BlogSinglePage";
import ErrorPage from "../ErrorPage";
import LoginPage from "../LoginPage";
import RegisterPage from "../RegisterPage";
import ContactPage from "../ContactPage";
import ProfilePage from "../ProfilePage";
//test admin
import UserScreen from '../TestAdmin/UserScreen';
// make shop
import MainProduct from '../Creator/MainProduct'
import ProductEditScreen from '../Creator/ProductEditScreen'
import AddProduct from "../Creator/AddProduct"

// Layouts
// import DashboardLayout from "../AdminPage/src/layouts/dashboard";

// // Định nghĩa các trang admin với lazy loading
// const AdminIndexPage = lazy(() => import("../AdminPage/src/pages/app"));
// const AdminUserPage = lazy(() => import("../AdminPage/src/pages/user"));
// const AdminProductsPage = lazy(() => import("../AdminPage/src/pages/products"));
// const AdminBlogPage = lazy(() => import("../AdminPage/src/pages/blog"));
// const AdminLoginPage = lazy(() => import("../AdminPage/src/pages/login"));
// const AdminPage404 = lazy(() => import("../AdminPage/src/pages/page-not-found"));
//

const AllRoute = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<ProductPage />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/service" element={<ServicePage />} />
          <Route path="/service-single" element={<ServiceSingle />} />
          <Route path="/car-listing" element={<CarListingPage />} />
          <Route path="/car-booking" element={<CarBookingPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/product-single/:id" element={<ProductSinglePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog-single" element={<BlogSinglePage />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/shop" element={<MainProduct />} />
          {/* test */}
          <Route path="/users" element={<UserScreen />} />
          {/* <Route path="/dashboard" element={<DashBoardScreen />} />
          <Route path="/shops" element={<ShopScreen />} /> */}

          {/* Tuyến đường cho admin với Lazy Loading và Suspense */}
          {/* <Route path="/admin/*" element={
            <Suspense fallback={<div>Loading...</div>}>
              <DashboardLayout>
                <Routes>
                  <Route index element={<AdminIndexPage />} />
                  <Route path="user" element={<AdminUserPage />} />
                  <Route path="productsss" element={<AdminProductsPage />} />
                  <Route path="blog" element={<AdminBlogPage />} />
                  <Route path="login" element={<AdminLoginPage />} />
                  <Route path="*" element={<AdminPage404 />} />
                </Routes>
              </DashboardLayout>
            </Suspense>
          } />

          {/* Nếu không tìm thấy tuyến đường, hiển thị trang lỗi */}
          {/* <Route path="*" element={<ErrorPage />} />  */}
          {/* <Route path="/admin" element={<DashboardLayout />} /> */}
          {/* <Route path="/manageshop" element={<PrivateRouter component={HomeScreen} />} /> */}
          <Route path="/products" element={<MainProduct />} />
          {/* <Route path="/category" element={<PrivateRouter component={CategoriesScreen} />} />
          <Route path="/orders" element={<PrivateRouter component={OrderScreen} />} />
          <Route path="/order/:id" element={<PrivateRouter component={OrderDetailScreen} />} />
         
          <Route path="/product/:id/edit" element={<PrivateRouter component={ProductEditScreen} />} /> */
          }
          <Route path="/product/:id/edit" element={<ProductEditScreen />} />
          <Route path="/addproduct" element={<AddProduct />} />
          {/* {
            user.role === 'AD' && (
              <>
                <Route path="/users" element={<UserScreen />} />
                <Route path="/dashboard" element={<DashBoardScreen />} />
                <Route path="/shops" element={<ShopScreen />} />
              </>
            )
          } */}
        </Routes>
      </Router>
    </div>
  );
};

export default AllRoute;
