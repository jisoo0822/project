const { Result } = require('express-validator');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host:'us-cdbr-east-05.cleardb.net',
    user:'bb6905a6494de8',
    password:'5d430568',
    port:'3306',
    database:'heroku_b34df5cdd0be985',
    dateStrings:'date'//날짜시간 출력
})
//리스트 전체 불러오기
function getAllMemoes(callback){
    connection.query('select * from notice ORDER BY id DESC',
    (err, rows, fields) =>{
        if(err) throw err;
        callback(rows);
    })
}
//
function insertMemo(ntTitle,ntName,ntCont, callback){
    connection.query(`INSERT INTO notice(ntTitle,ntDate,ntUpdate,ntName,ntCont) VALUES
    ('${ntTitle}',NOW(),NOW(),'${ntName}','${ntCont}')`,(err,result) =>{
        if(err) throw err;
        callback();
    })
}
//
function getMemoById(id,callback){
    connection.query(`select * from notice WHERE ID = '${id}'`,
    (err, rows, fields) =>{
        if(err) throw err;
        callback(rows);
    })
}
//리스트를 수정하고 싶을 때 id값이 일치하는 부분을 수정하는 함수
function updatetMemoById(id,ntTitle,ntName,ntCont, callback){
    connection.query(`UPDATE notice set ntTitle ='${ntTitle}', ntUpdate = now(),ntName ='${ntName}',ntCont ='${ntCont}' WHERE 
    id = ${id}`,(err, result)=>{
        if(err) throw err;
        callback();
    })
}
//리스트중 id값이 일치하는 row삭제
function deleteMemoById(id,callback){
    connection.query(`DELETE from notice WHERE ID = ${id}`,
    (err, result) =>{
        if(err) throw err;
        callback();
    })
}
module.exports = {
    getAllMemoes,
    insertMemo,
    getMemoById,
    updatetMemoById,
    deleteMemoById
}
