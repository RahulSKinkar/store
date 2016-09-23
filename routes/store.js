var express = require('express');
var router = express.Router();
var fs = require('fs');
const readline = require('readline');

var fields = [];


/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("Hello from store route home");

});

router.get('/:store/purchasepattern', function(req, res, next){
  const rl = readline.createInterface({
    input: fs.createReadStream('./data/erp_dump1.csv')
  });

  rl.on('line', function(line){
    fields = line.split(',');
    console.log(line);
  });

  rl.on('close', function(){
    console.log("stream reading closed");
    res.send("Hello from store route purchase pattern for store " + req.params.store);
  })
});

router.get('/:store/purchasepatternsales', function(req, res, next){

  fs.readFile('./data/erp_dump1.csv', function(err, data){
    if(err) {
      console.error(err);
    }
    console.log("Asynchronous read: "+ data.toString())
    res.send("Hello from store route purchase pattern sales for store " +data.toString());
  })
});

router.get('/:store/saleshistory', function(req, res, next){
  var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./data/erp_dump1.csv')
  });

  lineReader.on('line', function (line) {
    console.log('Line from file:', line);
  });
  res.send("Hello from store route sales history for store " + req.params.store);
});

module.exports = router;
