import express from 'express';
import homeRouter from './routers/home';
import userPage from './routers/user';
import { connectDB } from './config/db';
import dotenv from 'dotenv';
import session from 'express-session';//thêm thư viện express-session

const app = express();
//middleware chạy trước tất cả router nên cần load lên trước => mục đích lấy biến từ file .env ra để sử dụng;
dotenv.config();

//middleware => mục đích là parse dữ liệu ra json khi nhận request;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Thêm session vào app

// Thêm session vào app
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: '12345ABCDE',
    cookie: { maxAge: 6000000000 }
}));

app
    .set('views', 'src/views')
    .set('view engine', 'ejs')
    .use(express.static('src/public'))

//phải đặt trước router
connectDB(process.env.DB_URI);

//router
app.use('/', homeRouter);
app.use('/', userPage);

export const viteNodeApp = app;