console.log("helloCommod");
const puppeteer = require('puppeteer-extra');

async function getCrypto (){
    let crypto={
        price:'',
        changes:''
    }
  
  try{
    const browser = await puppeteer.launch({headless:'new', 'ignoreDefaultArgs': [ '--enable-automation'] })
    const newPage = await browser.newPage();
    await newPage.goto('https://tradingeconomics.com/crypto',{timeout: 0})


    // await newPage.click('didomi-notice-agree-button')

        let allCrypto = await newPage.evaluate( ()=>{
            const stockArray = Array.from(document.querySelectorAll('#p.datatable-item'), e => e.innerText)
            
            return stockArray
        })
        crypto.price = allCrypto.slice(0,2)
    
        
        let allday = await newPage.evaluate( ()=>{
            const nums = Array.from(document.querySelectorAll('#pch'), e => e.innerText)
            return nums
        })
        // console.log(allday)

        crypto.changes = allday.slice(0,2)
       

        let allChanges = await newPage.evaluate( ()=>{
            const cryptoArray = Array.from(document.querySelectorAll('.datatable-item.datatable-heatmap'), e => e.innerText)
            
            return cryptoArray
        })
        crypto.changes.push(...allChanges.slice(0,6))

  
    await browser.close()

    console.log(crypto)

}catch(e){
    console.log(e)
}


    return crypto
    
}


// getCrypto()

module.exports = {getCrypto}