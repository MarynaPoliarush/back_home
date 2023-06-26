console.log("helloIndex");
const puppeteer =  require('puppeteer-extra');
var kill  = require('tree-kill');

async function getIndex (){
    let stock={
        price:'0',
        daily:'0',
        weekly:'0'
    }
  
    try{
  
        const browser = await puppeteer.launch({headless:'new', 'ignoreDefaultArgs': [ '--enable-automation'] })
        const newPage = await browser.newPage();
        await newPage.goto('https://tradingeconomics.com/stocks',{timeout: 0})


        // await newPage.click('didomi-notice-agree-button')

            let allStock = await newPage.evaluate( ()=>{
                const stockArray = Array.from(document.querySelectorAll('#p'), e => e.innerText)
                
                return stockArray
            })
            stock.price = allStock.slice(0,3)

        
            let allday = await newPage.evaluate( ()=>{
                const nums = Array.from(document.querySelectorAll('#pch'), e => e.innerText)
                return nums
            })
          

            stock.daily = allday.slice(0,3)



            let allweek = await newPage.evaluate( ()=>{
                const nums = Array.from(document.querySelectorAll('.datatable-item.datatable-heatmap '), e => e.innerText)
            
                return nums
            })
            stock.weekly = allweek.slice(0,9)

            // console.log(stock)

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

  
    console.log(stock)
    return stock
    
}

getIndex()

module.exports = {getIndex}