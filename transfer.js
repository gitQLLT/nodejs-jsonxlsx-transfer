const fs = require('fs')
const json2xls = require('json2xls');

fs.readFile('suihao2.json','utf8',(err,data)=>{
  if (err) throw err;
  const json = JSON.parse(data);
  const jsonArray = [];
  json.forEach(function(item){
    let temp = {
      '公司名称' : item['公司名称'],
      '公司税号' : item['公司税号']
    }
    jsonArray.push(temp);
  });
  
  let xls = json2xls(jsonArray);
  
  fs.writeFileSync('result.xlsx', xls, 'binary');
})