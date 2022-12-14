var user_ownModel = require('../models/user_ownModel');
var express = require('express');
const { json } = require('express');
const CODE = require('../modules/statusCode');

exports.get보유List=(req, res, next)=>{    //이용자 보유주식 조회
    var ID = req.session.ID;
    if(!ID)
    {
        return res.send("<script>alert('로그인이 필요한 서비스입니다.'); window.location.replace('/user/login'); </script>");
    }
    try{
        user_ownModel.get_ownlist(ID, (rows)=>{
            if(!rows[0])
                return res.send("<script>alert('보유 주식이 없습니다.'); window.location.replace('/board'); </script>");
                //return res.json({ statusCode: CODE.FAIL, msg: "No data in DB" });

            console.log('data : '+JSON.stringify(rows));
            res.render('own', {rows: rows, session : ID});
            //return res.json({ statusCode: CODE.SUCCESS, msg: "getList Success"});
        });
    }catch(err){
        console.log(err);
        next(err);
        return res.json({ statusCode: CODE.DB_CONNECTION_ERROR, msg: "DB connection error"});
    }
}

exports.sellStock=(req, res, next)=>{    //주식매도
    var ID = req.session.ID;

    var TIME_ZONE = 3240 * 10000;
    var today = new Date();
    var date = new Date(+today + TIME_ZONE).toISOString().split('T')[0];
    
    var datas = {
        "종목코드": req.body.종목코드,
        "매도주식수": req.body.매도주식수,
        "매도가": req.body.매도가,
        "매도일": date
    }
    
    user_sellModel.deleteData(datas, ID, (rows)=>{
        console.log('data : '+JSON.stringify(rows));
        return res.json({ statusCode: CODE.SUCCESS, datas});
    });
}
