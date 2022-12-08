var stock_readModel = require('../models/stock_readModel');
var express = require('express');
const { json } = require('express');
const CODE = require('../modules/statusCode');

exports.readData=(req, res, next)=>{    //종목시세 세부정보 조회
    var code = req.params.code;
    var session = req.session.ID;
    try{
        stock_readModel.getData(code, (data)=>{
            if(!data[0])
                return res.json({ statusCode: CODE.FAIL, msg: "No data in DB" });

            console.log('data : '+JSON.stringify(data));
            //res.render('read',{title: "Top 종목", data: data[0], session : session});
            //return res.json({ statusCode: CODE.SUCCESS, msg: "getList Success" });
        });
    }catch(err){
        console.log(err);
        next(err);
        return res.json({ statusCode: CODE.DB_CONNECTION_ERROR, msg: "DB connection error"});
    }
}