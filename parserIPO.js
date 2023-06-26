console.log("hello rates");
const puppeteer =  require('puppeteer-extra');
var kill  = require('tree-kill');



async function getIPO (){
    let currencies

    try{

    const browser = await puppeteer.launch({"headless": 'new' ,"args": ["--fast-start", "--disable-extensions", "--no-sandbox"], 'ignoreDefaultArgs': [ '--enable-automation'] })
    const newPage = await browser.newPage();
    await newPage.goto('https://stockanalysis.com/ipos/2023/',{timeout: 0})

   
        let allNums = await newPage.evaluate( ()=>{
            const nums = document.querySelector('.flex-1 ').innerText
            return nums
        })
        
        // console.log(allNums.slice(0,8))
        
        currencies = allNums
    

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



module.exports = {getIPO}