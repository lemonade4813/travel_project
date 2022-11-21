const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');



mongoose.connect("mongodb+srv://username:l2j0wo6212@cluster0.pl8yc6b.mongodb.net/?retryWrites=true&w=majority").then(() => console.log("MongoDB connected..."))   //연결잘되면
    .catch((err) => console.log(err)); 


//특정 도메인
const options = {
      origin: "http://localhost:8080", // 접근 권한을 부여하는 도메인
      credentials: true, // 응답 헤더에 Access-Control-Allow-Credentials 추가
      optionsSuccessStatus: 200, // 응답 상태 200으로 설정
};
    
app.use(cors(options));

app.post("/add",(req, res)=>{
  console.log(req)
  res.status(200).send('ok')
})


/* localhost:4000/ 접속시 나올 메시지 */
app.get("/", (request, response) => { 
  response.send(`<h1>Hello</h1>`);
});


/* 4000포트에서 서버 구동 */
app.listen(4000, () => {
  console.log("localhost:4000 에서 서버가 시작됩니다.");
});