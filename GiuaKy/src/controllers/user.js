import e from 'express';
import User from '../model/user';
import bcryptjs from "bcryptjs";

//view for sign in
export const userPageSignIn = async (req, res) => {
    // res.send('Hello World');
    res.render('user/signin');
}

//sign in submit
export const userPageSignInSubmit = async (req, res) => {
    const { username, password } = req.body;

    try {

        console.log("username:" + username);
        // console.log("password:" + password);
        const dUser = await User.findOne({ "username": username });

        if (!dUser) {
            res.render('home/failed', { 'msg': "Username không tồn tại!" });
        } else {
            console.log("flag lỗi 1");

            const isValidePassWord = await bcryptjs.compare(password, dUser.password);
            if (isValidePassWord) {

                req.session.dUser = dUser;

                res.render('home/success', { "msg": username + ` đã đăng nhập thành công!`, "username": username });
            } else {
                res.render('home/failed', { 'msg': "Sai mật khẩu đăng nhập!" });
            }
        }

    } catch (error) {
        console.log(error);
        res.render('home/failed', { 'msg': "Lỗi kết nối cơ sở dữ liệu!" });
    }

}

//sign up submit
export const userPageSignUp = async (req, res) => {
    // res.send('Hello World');
    res.render('user/signup');
}

//sign in submit
export const userPageSignUpSubmit = async (req, res) => {
    const { password } = req.body;

    console.log("Thử nghiệm 5");
    try {
        console.log("password:" + password);

        const _hashPassword = await bcryptjs.hash(password, 10);
        req.body.password = _hashPassword;
        const data = await User(req.body).save();
        res.render('home/success', { 'msg': "Đăng ký thành công!", "data": data });

    } catch (error) {
        console.log(error);
        res.render('home/failed', { 'msg': "Lỗi kết nối cơ sở dữ liệu!" });
    }

}

//signOut
export const userPageSignOut = async (req, res) => {
    req.session.destroy(function (err) {
        return res.redirect('/');
    })
}

// xử lý hiển thị trang update thông tin
export const userPageUpdateInfo = async (req, res) => {
    if (req.session
        && req.session.dUser
        && req.session.dUser.username
        && req.session.dUser.username != ''
    ) {
        // Cho phép truy cập trang cập nhật thông tin
        let age = '';
        let brithday = '';

        age = req.session.dUser.age;
        brithday = req.session.dUser.brithday;
        res.render('user/update_info.ejs', { age, brithday });
    } else {
        // Không cho phép truy cập
        res.render('home/failed', { 'msg': "Lỗi! Bạn chưa đăng nhập!" });
    }
}
// Xử lý: update thông tin
export const userPageUpdateInfoXuLy = async (req, res) => {
    if (
        req.session
        && req.session.dUser
        && req.session.dUser.username
        && req.session.dUser.username != ''
    ) {
        // Đã đăng nhập => lưu thông tin
        const { age, brithday } = req.body;
        const dUser = await User.findOne({ "username": username });
        if (dUser) {
            // Nếu user tồn tại thì cho lưu thông tin mới
            dUser.age = age;
            dUser.birthday = birthday;
            //update sessiopn
            req.session.dUser.age = age;
            req.session.dUser.brithday = brithday;

            await dUser.save();
            res.render('home/success', { 'msg': "Cập nhật thông tin thành công!" });
        } else {
            // Báo lỗi
            res.render('home/failed', { 'msg': "Lỗi! Không tìm thấy user!" });
        }

    } else {
        // Chưa đăng nhập không cho phép lưu thông tin
        res.render('home/failed', { 'msg': "Lỗi! Bạn chưa đăng nhập!" });
    }
};

//Hiện Trang Update Mật khẩu
export const userPageChangePassword = async (req, res) => {
    if (req.session
        && req.session.dUser
        && req.session.dUser.username
        && req.session.dUser.username != ''
    ) {
        // Cho phép truy cập trang cập nhật thông tin

        res.render('user/update_info.ejs', { age, brithday });
    } else {
        // Không cho phép truy cập
        res.render('home/failed', { 'msg': "Lỗi! Bạn chưa đăng nhập!" });
    }
}
//XuLyPass
export const userPageChangePasswordXuLy = async (req, res) => {
    if (req.session
        && req.session.dUser
        && req.session.dUser.username
        && req.session.dUser.username != ''
    ) {
        // Đã đăng nhập => lưu thông tin
        const { old_password, new_password, confirm_new_password } = req.body;

        if (new_password != confirm_new_password) {
            return res.render('home/failed', { 'msg': "Lỗi! Mật khẩu không trùng khớp!" });
        }

        const dUser = await User.findOne({ "username": req.session.dUser.username });

        if (dUser) {
            const isValidPassword = await bcryptjs.compare(old_password, dUser.password);

            if (!isValidPassword) {
                // Lỗi mật khẩu cũ không đúng
                return res.render('home/failed', { 'msg': "Lỗi! Mật khẩu cũ không đúng!" });
            }

            const _hashNewPassword = await bcryptjs.hash(new_password, 10);
            dUser.password = _hashNewPassword;
            await dUser.save();

            req.session.dUser = dUser;
            return res.render('home/success', { 'msg': "Cập nhật mật khẩu thành công!" });
        } else {
            // Báo lỗi không tìm thấy user
            return res.render('home/failed', { 'msg': "Lỗi! Không tìm thấy user!" });
        }
    } else {
        // Chưa đăng nhập không cho phép lưu thông tin
        return res.render('home/failed', { 'msg': "Lỗi! Bạn chưa đăng nhập!" });
    }
}
