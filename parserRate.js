console.log("hello rates");
const puppeteer =  require('puppeteer-extra');
var kill  = require('tree-kill');


async function getRate (){
    let currencies

  try{
      const browser = await puppeteer.launch({"headless": 'new' ,"args": ["--fast-start", "--disable-extensions", "--no-sandbox"], 'ignoreDefaultArgs': [ '--enable-automation'] })
      const newPage = await browser.newPage();
      await newPage.goto('https://finance.ua/ua/currency')

    
          let allNums = await newPage.evaluate( ()=>{
              const nums = Array.from(document.querySelectorAll('.c2 '), e => e.innerText)
              return nums
          })
          
          
          currencies = allNums.slice(2,4)

          let allNums2 = await newPage.evaluate( ()=>{
            const nums = Array.from(document.querySelectorAll('.c3 '), e => e.innerText)
            return nums
        })
        
        
        currencies.push(...allNums2.slice(2,4))
      

      

      await browser.close()
  }catch(e){
      console.log(e)
  }

 
  console.log(currencies)
    return currencies
    
}





module.exports = {getRate}
