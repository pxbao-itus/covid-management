const userRouter = require('express').Router();
const userModel = require('../../models/manager/user.model');
const paymentModel = require('../../models/manager/payment.model');



userRouter.get('/profile',async (req,res) => {
    const userId=req.user.userId;
    const profileUser=await userModel.get(userId);
    var DOB=profileUser.NgaySinh;
    var dd=String(DOB.getDate()).padStart(2,'0');
    var mm=String(DOB.getMonth()+1).padStart(2,'0'); //January is 0!
    var yyyy=DOB.getFullYear();
    DOB=mm+'/'+dd+'/'+yyyy;
    profileUser.NgaySinh=DOB;
    const isolationPlaceInfor=await userModel.place(profileUser.NoiDieuTri);
    const isoAddress=isolationPlaceInfor.TenNoiDTCL+', '+isolationPlaceInfor.DiaChi;
    profileUser.NoiDieuTri=isoAddress;
    res.render('user/profile', {
        layout: 'user',
        profile: profileUser,
        style: 'profile',
        title: 'Thông tin cá nhân',
    });
});

userRouter.get('/history-managed', async (req, res) => {
    const remind=req.cookies.remind;
    const userId = req.user.userId;
    const historyManaged=await userModel.history(userId);
    for(var i=0;i<historyManaged.length;i++) {
        const time=(historyManaged[i].ThoiGian).toLocaleString('vi');
        const isolationPlaceBefore=await userModel.place(historyManaged[i].NoiDTCLTruoc);
        isolationPlaceBefore? historyManaged[i].NoiDTCLTruoc=isolationPlaceBefore.TenNoiDTCL:historyManaged[i].NoiDTCLTruoc=null;
        if(historyManaged[i].NoiDTCLSau) {
            const isolationPlaceAfter=await userModel.place(historyManaged[i].NoiDTCLSau);
            isolationPlaceAfter? historyManaged[i].NoiDTCLSau=isolationPlaceAfter.TenNoiDTCL:historyManaged[i].NoiDTCLSau=null;
        }
        historyManaged[i].ThoiGian=time;
    }

    res.render('user/historyManaged',{
        history: historyManaged,
        layout: 'user',
        style: 'historyManaged',
    })
});


userRouter.get('/history-payment', async (req, res) => {
    const remind=req.cookies.remind;
    const userId = req.user.userId;
    const historyPayment=await paymentModel.list(userId);
    for(var i=0;i<historyPayment.length;i++) {
        const time=(historyPayment[i].ThoiGian).toLocaleString('vi');
        historyPayment[i].ThoiGian=time;
    }
    return res.render('user/historyPayment',{
        payment: historyPayment,
        layout: 'user',
        style: 'historyPayment',
        title: 'Lịch sử thanh toán',
        balance: parseInt(historyPayment[historyPayment.length-1].SoDuNo),

    });
});

userRouter.get('/announce-payment', async (req, res) => {
    const remind=req.cookies.remind;
    var announcement='';
    try {
        if(remind) announcement='Hiện tại dư nợ của bạn đang lớn hơn hạn mức cho phép vùi lòng thanh toán';
        else announcement='Hiện tại không có thông báo nhắc thanh toán nào';
        res.render('user/announcePayment',{
            announce: announcement,
            layout: 'user',
            style: 'announcePayment',
            title: 'Xem thông báo nhắc thanh toán',

        });
    } catch(error) {
        console.log(error);
    }

});

userRouter.get('/payment',(req,res)=>{

    res.send(process.env.PORT);
});

module.exports = userRouter;