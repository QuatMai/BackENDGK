//Lấy danh sách toàn bộ sản phẩm
export const showHome = async (req, res) =>{
    
    var dUser = null;
    //Lấy thông tin dUser xem có đăng nhập chưa
    if(  req.session && req.session.dUser){
        dUser = req.session.dUser
    }
    res.render('home/index', {"dUser":dUser});
}
