const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');
/* bodyParser는 deprecated 됨*/ 
//const bodyParser = require('body-parser')
//app.use(bodyParser().json())
const multer = require('multer')
//const upload = multer({dest : 'uploads/'})
const Hotel = require('./hotel')
const path = require("path");

app.use(express.urlencoded({extended:true}));
app.use(express.json())


mongoose.connect("mongodb+srv://username:l2j0wo6212@cluster0.pl8yc6b.mongodb.net/?retryWrites=true&w=majority").then(() => console.log("MongoDB connected..."))   //연결잘되면
    .catch((err) => console.log(err)); 

//클라인언트 접속 허용 
const options = {
      origin: "http://localhost:8080", // 접근 권한을 부여하는 도메인
      credentials: true,  // 응답 헤더에 Access-Control-Allow-Credentials 추가
      optionsSuccessStatus: 200, // 응답 상태 200으로 설정
};
    
app.use(cors(options));

// 저장할 파일 경로 설정
const imgStorage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, 'uploads/'); // 저장할 파일 경로
  },
  filename: function(req, file, callback) {
    fName = file.originalname; // 저장할 파일명 = 원래 파일명
    callback(null, fName);
  }
});

const upload = multer({
  storage: imgStorage,
  fileFilter: function(req, file, callback) {
    var ext = path.extname(file.originalname);
    console.log('ext : '+ ext);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.JPG' && ext !== '.PNG') {
      console.log('not png, jpg');
      //return callback(null, false);
    } else {
      console.log('correct png, jpg');
      callback(null, true);
    }
  }
});


// app.use('/add', upload.fields([{name : 'name'},{name:'surname'}]), (req, res, file, next) => {
// 	const {name,surname} = req.body;
//   const {filename} = file.originalname;
//     res.send(req.body);
//     console.log(req.body)
//   });
  app.post('/hotel', upload.single('file'), (req, res, next) => {
    const post = {
        nation : req.body.nation,
        hotelName : req.body.hotelName,
        address : req.body.address,
        tel : req.body.tel,
        roomType : req.body.roomType,
        originalFileName : req.file.originalname
    }
    
    const doc = new Hotel(post)

    doc.save(function(err, result){
        if(err){
          console.log(err)
        }
        else{
          console.log(result)
        }
    });
      res.send(req.file)
      console.log(req.body)
      console.log(req.file)
  });

  
  app.get("/hotel", (req, res)=>{

    Hotel.find(function(err, hotel){
        if(err) return res.status(500).send({error : 'database failure'});
        res.json(hotel);
    })
  })


  app.delete('/hotel/id',(req, res) => {
    console.log(req.body)
    console.log(req.params._id)
    Hotel.deleteOne({_id:req.params.index})
}
)



  // app.use('/add', upload.fields([{name : 'name'},{name:'surname'}]), (req, res, next) => {
  //   const {name,surname} = req.body;
  //     res.send(req.body);
  //     console.log(req.body)
  //   });
  

/* localhost:4000/ 접속시 나올 메시지 */
app.get("/", (request, response) => { 
  response.send(`<h1>Hello</h1>`);
});


/* 4000포트에서 서버 구동 */
app.listen(4000, () => {
  console.log("localhost:4000 에서 서버가 시작됩니다.");
});