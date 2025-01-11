import express from 'express';
import {
    userPageSignIn,//router: trang chỉ view đăng nhập
    userPageSignInSubmit,//router: Xử lý khi bấm nút đăng nhập

    userPageSignUp,//router: Trang chỉ view đăng ký
    userPageSignUpSubmit,//router: Trang xử lý

    userPageSignOut,//Đăng xuất


    userPageUpdateInfo,//trang Update thong tin chi hien thị
    userPageUpdateInfoXuLy,//XuLy

    userPageChangePassword,//Pass
    userPageChangePasswordXuLy,//xuly pass

} from '../controllers/user';

const router = express.Router();

//Router trang đăng nhập và xử lý đăng nhập
router.get(`/signin`, userPageSignIn);
router.post(`/signin_submit`, userPageSignInSubmit);

//Router trang đăng ký và xử lý đăng ký
router.get(`/signup`, userPageSignUp);
router.post(`/signup_submit`, userPageSignUpSubmit);

//Trang đăng xuất
router.get(`/signout`, userPageSignOut);

//Trang update thong tin chi hien thi
router.get(`/update_info`, userPageUpdateInfo);
router.post(`/update_info_xu_ly`, userPageUpdateInfoXuLy);//xu ly update

//Trang update mat khau
router.get(`/change_password`, userPageChangePassword);
router.post(`/change_password_xu_ly`, userPageChangePasswordXuLy);//xu ly pass
export default router;