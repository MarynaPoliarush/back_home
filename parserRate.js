console.log("hello rates");
const puppeteer =  require('puppeteer-extra');
var kill  = require('tree-kill');


async function getRate (){
    let currencies

try{
    const browser = await puppeteer.launch({"headless": 'new' ,"args": ["--fast-start", "--disable-extensions", "--no-sandbox"], 'ignoreDefaultArgs': [ '--enable-automation'] })
    const newPage = await browser.newPage();
    await newPage.goto('https://kurs.com.ua/')

   
        let allNums = await newPage.evaluate( ()=>{
            const nums = Array.from(document.querySelectorAll('.course '), e => e.innerText)
            return nums
        })
        
        // console.log(allNums.slice(0,8))
        
        currencies = allNums.slice(0,8)
    

    console.log(currencies)

    await browser.close()
}catch(e){
    console.log(e)
}

process.on('exit', (code) => {
    kill(child.pid, 'SIGTERM', function(err){
      kill(child.pid, 'SIGKILL', function(err){
        process.kill(-child.pid);
      });
    });
  });

    return currencies
    
}





module.exports = {getRate}