const express=require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const {greet,els,good}=require('./mind/da.json');

const moods=[greet,good];
const app=express();
app.use(cors());
app.use(bodyParser.json());

const start=async function(){await app.listen(3005,()=>console.log("Listening on 3001"));}()

//testing pinging server
app.get('/',(req,res)=>{res.send("<b>Hello there, i'm Veela, up and running.</b>")})

app.post('/veela',function(req,res){
  const stop=["is","of","are","i","so","and","the","them"];const d=/\d/g;const char=/\W/g;let result=[];let found=[];let notfound=[];let values=req.body.value.split(' ');
    function log(x){console.log(x)}; // for console debugging
    values=values.filter(x=>!stop.includes(x));values=values.filter(xz=>!d.test(xz));values=values.filter(xy=>!char.test(xy));// remove stop words and numbers and characters
    values=[...new Set(values)];// remove dublicates
    values.map(x=>log(x));
    moods.forEach((mood,k)=>{
      values.forEach((x)=>{
       // let x1=x.split('');x1=x1.filter(xa=>!char.test(xa));x1=x1.filter(xb=>!d.test(xb));x1=x1.join('')//remove numbers and special characters from value
       const re=RegExp(mood.keys1);
       if(x.search(re)!=-1&&re.test(x)&&re.test(x)){result=[...result,1];found=[...found,x]}// if found
        else{result=[...result,0];notfound=[...notfound,x]}// if not found
      });// loop through user input values
      decide(mood,req.body.value);log(found);result=[];found=[];notfound=[];
    });// loop through moods 
  
    function decide(m,value){ // fx to determine and predict the closest response
      const fsize=result.length;result=result.filter(x=>x);const clen=result.length;// get full size=>remove 0(not found)=>get remaining length
      if(clen>=0.5*fsize){log("Req: "+value+"\nSuccess rate: "+clen/fsize);res.send({rp:m.rp[Math.floor(Math.random()*m.rp.length)],sug:m.sug})}// if current size is more than fullsize/2 then correct
      else{
          if(clen>0.1*fsize){log("Req: "+value+"\nSuccess rate: "+clen/fsize);res.send({rp:m.rp[Math.floor(Math.random()*m.rp.length)],sug:m.sug})}//if at least one size is more than fullsize/2 then correct
          else{log("Req: "+value+"Failed with: "+clen/fsize);res.send({rp:els.rp[Math.floor(Math.random()*els.rp.length)],sug:els.sug})}
        }
    }
})
