console.log("helloCommod");
const puppeteer = require('puppeteer-extra');

async function getCommod (){
    let goods={
        goods:'',
        dailyChanges:'',
        changes:'',
    }
  
  try{
    const browser = await puppeteer.launch({headless:'new', 'ignoreDefaultArgs': [ '--enable-automation'] })
    const newPage = await browser.newPage();
    await newPage.goto('https://tradingeconomics.com/commodities',{timeout: 0})


    // await newPage.click('didomi-notice-agree-button')

        let allGoods = await newPage.evaluate( ()=>{
            const goodsArray = Array.from(document.querySelectorAll('#p.datatable-item'), e => e.innerText)
            
            return goodsArray
        })
        goods.goods =allGoods.slice(0,15)
        goods.goods.push(allGoods[allGoods.length-4])
        // console.log(allBrands)

        let allChanges = await newPage.evaluate( ()=>{
            const goodsArray = Array.from(document.querySelectorAll('.datatable-item.datatable-heatmap'), e => e.innerText)
            
            return goodsArray
        })

       
        goods.changes=allChanges.slice(0,50)
        let energy = allChanges.slice( allChanges.length-12,allChanges.length-9 )
        goods.changes.push(...energy)


        let dailyChanges = await newPage.evaluate( ()=>{
            const goodsArray = Array.from(document.querySelectorAll('#pch.datatable-item'), e => e.innerText)
            
            return goodsArray
        })


        goods.dailyChanges = dailyChanges.slice(0,15)
        goods.dailyChanges.push(dailyChanges[dailyChanges.length-4])
       

    await browser.close()

    console.log(goods)

}catch(e){
    console.log(e)
}

    return goods
    
}


// getCommod ()

module.exports = {getCommod}