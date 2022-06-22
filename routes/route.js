const express = require('express')
var expressLayouts = require('express-ejs-layouts');
const router = express.Router();

const { check,validationResult} = require('express-validator')

const db = require('./../db')

router.use(expressLayouts);
router.get('/',(req ,res) => {
  res.render('index');
  //서문시장 야시장의 메인페이지 지정
  });
router.get('/intro',(req ,res) => {
    res.render("intro");
  });
router.get('/noticelist',(req ,res) => {
  db.getAllMemoes((rows) => {
  res.render('noticelist',{rows:rows})
  });
});

router.get('/notice_write',(req ,res) => {
  res.render("notice_write");
});
//공지사항 작성
router.post('/store', 
  [check('ntCont').isByteLength({min: 1, max: 3000})],
  function(req,res, next){
    let errs = validationResult(req);
    console.log(errs);
    if(errs['errors'].length>0){
      res.render('notice_write',{errs:errs['errors']})
    }else{
      let param = JSON.parse(JSON.stringify(req.body));
      let ntTitle = param['ntTitle'];
      let ntName = param['ntName'];
      let ntCont = param['ntCont'];
      db.insertMemo(ntTitle,ntName,ntCont,function(){
        res.redirect('/noticelist');
      });
    }
  });
//공지사항 상세
router.get('/notice',(req,res) =>{
  let id = req.query.id;

  db.getMemoById(id,(row)=>{
    if(typeof id ==='undefined' || row.length <= 0){
      res.status(404).json({error:'undefind memo'});
    }else{
    res.render('notice',{row:row[0]})
    }
  })
});
//공지사항업데이트
router.get('/notice_rewrite',(req,res) =>{
  let id = req.query.id;

  db.getMemoById(id,(row)=>{
    if(typeof id ==='undefined' || row.length <= 0){
      res.status(404).json({error:'undefind memo'});
    }else{
    res.render('notice_rewrite',{row:row[0]})
    }
  })
});

router.post('/notice_rewrite', 
[check('ntCont').isByteLength({min: 1, max: 3000})],
(req,res) => {
  let errs = validationResult(req);
  let param = JSON.parse(JSON.stringify(req.body));
  let id = param['id'];
  let ntTitle = param['ntTitle'];
  let ntName = param['ntName'];
  let ntCont = param['ntCont'];
  if(errs['errors'].length>0){
    db.getMemoById(id, (row)=>{
      res.render('notice_rewrite',{row:row[0],errs:errs['errors']})
    })
  }else{
    db.updatetMemoById(id,ntTitle,ntName,ntCont,()=> {
      res.redirect('/noticelist');
    })
  }
});

router.get('/deletememo',(req,res) =>{
  let id = req.query.id;
  db.deleteMemoById(id,()=>{
    res.redirect('/noticelist');
  })
})


router.get('/login',(req ,res) => {
    res.render("login");
  });
router.get('/join',(req ,res) => {
    res.render("join");
  });

module.exports = router;