const express = require("express");
const Web3 = require("web3");
const bodyParser = require('body-parser')

const contract = require("./contract");

const app = express();
const web3 = new Web3();

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));


app.use(function (req, res, next) {
  [
    'http://localhost:3000',
  ].forEach(origin=>{
    if (req.headers.origin.indexOf(origin) > -1)
      res.header('Access-Control-Allow-Origin', req.headers.origin);
  })
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


const { eth } = web3; // const eth = web3.eth;

web3.setProvider(new web3.providers.HttpProvider("http://localhost:8545"));

const helloContract = eth.contract(contract.ABI).at(contract.address);


app.post('/add_start_time', (req, res)=>{
  const { personal } = web3;
  console.log(req.body);
  personal.unlockAccount(req.body.account, req.body.password, 1000);
  res.send(helloContract.setTimeStart.sendTransaction(req.body.firstTime, { from: req.body.account }));
});
app.post('/add_end_time', (req, res)=>{
  const { personal } = web3;
  console.log(req.body);
  personal.unlockAccount(req.body.account, req.body.password, 1000);
  res.send(helloContract.setTimeTo.sendTransaction(req.body.secondTime, { from: req.body.account }));
});

app.get('/get_contract_data', (req, res) =>{
  const { personal } = web3;
  //console.log(req.body);
  personal.unlockAccount('0xfc25b164424678e293b4d5c451f021b5a03095e2', '123', 1000);
  //res.send(helloContract.getUser);//докапаться, чтоб сделали транзакцию получения открытого массива 
  // console.log(helloContract.size().c[0]);
  var active = 0;
  var i = 0;
  var acID = [];
  while(active < helloContract.size().c[0])
  {
    if(!helloContract.keys(i)[1]){
      acID[active] = helloContract.keys(i)[0];
      active++;
    }
    i++;
  }
  response = [];
  for(var i = 0; i<acID.length; i++){
    response.push({id: acID[i], unpaidTime: helloContract.exe(acID[i])[2].c[0]});
  }
  res.json(response);
});

app.get("/")
  
app.post("/", (req, res)=>{
  const { personal } = web3;
  console.log(req.body);
  personal.unlockAccount(req.body.account, req.body.password, 1000);

  res.send(helloContract.setData.sendTransaction(req.body.message, { from: req.body.account }));
});

app.listen(8000, ()=>{
  console.log("Our server on 8000 port");
});
