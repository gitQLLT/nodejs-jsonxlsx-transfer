// 加载模块
var xlsx = require('node-xlsx')
var request=require("request");
//加载cherrio模块，可以将抓取的网页通过jquery获取节点的方式获取需要的dom
var cheerio=require("cheerio");  
var fs=require('fs');

var arr1 = xlsx.parse('./工作簿1.xlsx')[0].data
for(let i=0;i<arr1.length;i++){
  
  const companyName = encodeURIComponent(arr1[i]) 

  // 1.直接调用request方法请求url,并且通过回调函数获取返回值
  request({
    url: 'https://www.qcc.com/tax_search?key='+companyName,
    method: "GET",
    json: true,
    headers: {
      "content-type": "application/json",
      "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
      "referer": "https://www.qcc.com/tax",
      "cookie": 'QCCSESSID=f89df9e4ef43e82021349714a2; qcc_did=38e1c24c-8009-4a94-82f6-ccd4470e5e21; UM_distinctid=1812210f47e7cc-0173e7b95444dd-17333273-1fa400-1812210f47fefd; acw_tc=dde5d19b16541367688145667e0924a2709893876738d695fb81aed27a; CNZZDATA1254842228=1585308455-1654130537-https%253A%252F%252Fwww.baidu.com%252F%7C1654137737'
    }
  },function(err,res,body){
    const $ = cheerio.load(body);

    let obj = {}
    $('.col-md-6').each(function(index){
      if(index===0){
        const name = $('.clear>span',this).text()
        const number = $('.clear>p',this).prop("lastChild").nodeValue
        obj={
          '公司名称':name,
          '公司税号':number
        }
      }
    })

    fs.appendFile('suihao.json', JSON.stringify(obj), (err) => {
      if (err) throw err;
      console.log('json文件写入成功...')
    })
  })
}

/* const companyName = encodeURIComponent('乳山市振兴铸钢有限公司') 

// 1.直接调用request方法请求url,并且通过回调函数获取返回值
request({
  url: 'https://www.qcc.com/tax_search?key='+companyName,
  method: "GET",
  json: true,
  headers: {
    "accept-encoding": "gzip, deflate, br",
    "content-type": "application/json",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
    "referer": "https://www.qcc.com/tax",
    "cookie": 'QCCSESSID=f89df9e4ef43e82021349714a2; qcc_did=38e1c24c-8009-4a94-82f6-ccd4470e5e21; UM_distinctid=1812210f47e7cc-0173e7b95444dd-17333273-1fa400-1812210f47fefd; acw_tc=dde5d19b16541367688145667e0924a2709893876738d695fb81aed27a; CNZZDATA1254842228=1585308455-1654130537-https%253A%252F%252Fwww.baidu.com%252F%7C1654137737'
  }
},function(err,res,body){
  const $ = cheerio.load(body);
  
  let arr = [];
  $('.col-md-6').each(function(){
    const name = $('.clear>span',this).text()
    const number = $('.clear>p',this).prop("lastChild").nodeValue
    arr.push({
      '公司名称':name,
      '公司税号':number
    })
  })

  fs.writeFile(decodeURIComponent(companyName)+'.json', JSON.stringify(arr), (err) => {
    if (err) throw err;
    console.log('json文件写入成功...')
  })
}) */
