const express = require('express')
const router = express.Router()

// const path = require('path')
// const multer= require('multer')
const db = require('./data')
const mongodb = require('mongodb')
const finnhub = require('finnhub');
const stockAPI = process.env.STOCK_API

const {getRate}= require('./parserRate')
const {getForeign} = require('./parserForeign')
const {getCommod} = require('./parserCommodities')
const {getIndex} = require('./parserIndex')

const {getCrypto} = require('./parserCrypto')
const {getIPO} = require('./parserIPO')

const { getDb } = require('./data')
const e = require('express')
const ObjectId = mongodb.ObjectId




router.get('/uahrates', async (req,res)=>{
    console.log('request UAH')
    const fetchedRates = await getRate();
    // console.log(fetchedRates)
    
    let currencies = {
        "EUR":[],
        "USD":[]
    }

    try{
    currencies.USD.push(fetchedRates[0].slice(0,fetchedRates[1].length-4))
    currencies.USD.push(fetchedRates[2].slice(0,fetchedRates[1].length-4))
    currencies.EUR.push(fetchedRates[1].slice(0,fetchedRates[1].length-4))
    currencies.EUR.push(fetchedRates[3].slice(0,fetchedRates[1].length-4))

    
}catch(e){
    console.log(e)
}

    res.send(currencies)
})



router.get('/foreignrates', async (req,res)=>{
    console.log('request got TRY RUB')

    let foreign = {
            TRY:[], 
            RUB:[],
            EUR:[],
    }

    try{

    const fetchedTRY = await getForeign();
    // console.log(fetchedTRY)
    foreign.TRY.push( Number(fetchedTRY.rates[4]).toFixed(2) )
    foreign.TRY.push( fetchedTRY.daily[4] )
    foreign.TRY.push(fetchedTRY.weekly[12] ) 
    foreign.TRY.push(fetchedTRY.weekly[13] ) 
    foreign.TRY.push(fetchedTRY.weekly[14] ) 

    foreign.RUB.push( Number(fetchedTRY.rates[3]).toFixed(2) )
    foreign.RUB.push( fetchedTRY.daily[3] )
    foreign.RUB.push( fetchedTRY.weekly[9] ) 
    foreign.RUB.push( fetchedTRY.weekly[10] ) 
    foreign.RUB.push( fetchedTRY.weekly[11] ) 

    foreign.EUR.push( Number(fetchedTRY.rates[0]).toFixed(2) )
    foreign.EUR.push( fetchedTRY.daily[0] )
    foreign.EUR.push( fetchedTRY.weekly[0] ) 
    foreign.EUR.push( fetchedTRY.weekly[1] ) 
    foreign.EUR.push( fetchedTRY.weekly[2] ) 

   

    console.log(foreign)
}catch(e){
    console.log(e)
}

    res.send(foreign)

})



// router.get('/commodities', async (req,res)=>{
//     console.log('request got commod')

//     let commoditiesPrice = {
//         prices:{
//             'Crude Oil':'', 
//             'Brent Oil':'',
//             'Urals Oil':'',
//             'Natural gas':'',
//             "Coal":'',
//             'TTF Gas':'', 
//             'Gold':'', 
//             'Electricity GER':''
//         },
//         dailyChanges:{
//             'Crude Oil':'', 
//             'Brent Oil':'', 
//             'Urals Oil':'',
//             'Natural gas':'',
//             "Coal":'',
//             'TTF Gas':'', 
//             'Gold':'',
//             'Electricity GER':''
//         },
//         weeklyChanges:{
//             'Crude Oil':'', 
//             'Brent Oil':'', 
//             'Urals Oil':'',
//             'Natural gas':'',
//             "Coal":'',
//             'TTF Gas':'', 
//             'Gold':'',
//             'Electricity GER':''
//         },
//         longerChanges:{
//             'Crude Oil':'', 
//             'Brent Oil':'', 
//             'Urals Oil':'',
//             'Natural gas':'',
//             "Coal":'',
//             'TTF Gas':'', 
//             'Gold':'',
//             'Electricity GER':''
//         }
//     }
        

//    try{ 
//     const commoditiesdata = await getCommod();
//     console.log(commoditiesdata)

//     commoditiesPrice.prices['Crude Oil'] = Number(commoditiesdata.goods[0]).toFixed(2)
//     commoditiesPrice.prices['Brent Oil'] = Number(commoditiesdata.goods[1]).toFixed(2)
//     commoditiesPrice.prices['Urals Oil'] = Number(commoditiesdata.goods[13]).toFixed(2)
//     commoditiesPrice.prices['Natural gas'] = Number(commoditiesdata.goods[2]).toFixed(2)
//     commoditiesPrice.prices['Coal'] = Number(commoditiesdata.goods[5]).toFixed(2)
//     commoditiesPrice.prices['TTF Gas'] = Number(commoditiesdata.goods[6]).toFixed(2)
//     commoditiesPrice.prices['Gold'] = Number(commoditiesdata.goods[14]).toFixed(2)
//     commoditiesPrice.prices['Electricity GER'] = Number(commoditiesdata.goods[commoditiesdata.goods.length-1]).toFixed(2)

//     commoditiesPrice.weeklyChanges['Crude Oil'] = commoditiesdata.changes[0]
//     commoditiesPrice.weeklyChanges['Brent Oil'] = commoditiesdata.changes[3]
//     commoditiesPrice.weeklyChanges['Urals Oil'] = commoditiesdata.changes[39]
//     commoditiesPrice.weeklyChanges['Natural gas'] = commoditiesdata.changes[6]
//     commoditiesPrice.weeklyChanges['Coal'] = commoditiesdata.changes[15]
//     commoditiesPrice.weeklyChanges['TTF Gas'] = commoditiesdata.changes[18]
//     commoditiesPrice.weeklyChanges['Gold'] = commoditiesdata.changes[42]
//     commoditiesPrice.weeklyChanges['Electricity GER'] = commoditiesdata.changes[commoditiesdata.changes.length-3]

//     commoditiesPrice.dailyChanges['Crude Oil'] = commoditiesdata.dailyChanges[0]
//     commoditiesPrice.dailyChanges['Brent Oil'] = commoditiesdata.dailyChanges[1]
//     commoditiesPrice.dailyChanges['Urals Oil'] = commoditiesdata.dailyChanges[13]
//     commoditiesPrice.dailyChanges['Natural gas'] = commoditiesdata.dailyChanges[2]
//     commoditiesPrice.dailyChanges['Coal'] = commoditiesdata.dailyChanges[5]
//     commoditiesPrice.dailyChanges['TTF Gas'] = commoditiesdata.dailyChanges[6]
//     commoditiesPrice.dailyChanges['Gold'] = commoditiesdata.dailyChanges[14]
//     commoditiesPrice.dailyChanges['Electricity GER'] = commoditiesdata.dailyChanges[commoditiesdata.dailyChanges.length-1]

  

//     commoditiesPrice.longerChanges['Crude Oil'] = [commoditiesdata.changes[1],commoditiesdata.changes[2]]
//     commoditiesPrice.longerChanges['Brent Oil'] = [commoditiesdata.changes[4],commoditiesdata.changes[5] ]
//     commoditiesPrice.longerChanges['Urals Oil'] = [commoditiesdata.changes[40],commoditiesdata.changes[41] ]
//     commoditiesPrice.longerChanges['Natural gas'] = [commoditiesdata.changes[7],commoditiesdata.changes[8] ]
//     commoditiesPrice.longerChanges['Coal'] = [commoditiesdata.changes[16],commoditiesdata.changes[17] ]
//     commoditiesPrice.longerChanges['TTF Gas'] = [commoditiesdata.changes[19],commoditiesdata.changes[20] ]
//     commoditiesPrice.longerChanges['Gold'] = [commoditiesdata.changes[43],commoditiesdata.changes[44] ]
//     commoditiesPrice.longerChanges['Electricity GER'] =  [commoditiesdata.changes[commoditiesdata.changes.length-2],commoditiesdata.changes[commoditiesdata.changes.length-1] ]

   
//     console.log(commoditiesPrice)
// }catch(e){
//     console.log(e)
// }
//     res.send(commoditiesPrice)

// })




// router.get('/index', async (req,res)=>{
//     console.log('request got index')

//     let stock={
//         price:'',
//         daily:'',
//         weekly:''
//     }
// try{
//     const fetchedStock = await getIndex();
    
//     console.log(fetchedStock)
//     stock.price = fetchedStock.price
//     stock.daily = fetchedStock.daily
//     stock.weekly = fetchedStock.weekly

   

// }catch(e){
//     console.log(e)
// }

//     res.send(stock)

// })



// router.get('/crypto', async (req,res)=>{
//     console.log('request got crypto')
//     let crypto={
//         price:'',
//         changes:''
//     }

// try{

//     const fetchedcCypto = await getCrypto();
//     console.log(fetchedcCypto)

//     crypto.price = fetchedcCypto.price
//     crypto.changes = fetchedcCypto.changes
// }catch(e){
//     console.log(e)
// }

//     res.send(crypto)



// })


// router.get('/ipo', async (req,res)=>{
//     console.log('request got crypto')

//     let crypto

//     try{

//     const fetchedcIPO = await getIPO();
//     console.log(fetchedcIPO)

//     crypto = fetchedcIPO
   
//     }catch(e){
//         console.log(e)
//     }

//     res.send(crypto)

// })


router.get('/stocks', async (req, res) => {
    const api_key = finnhub.ApiClient.instance.authentications['api_key'];
    api_key.apiKey = stockAPI;
    const finnhubClient = new finnhub.DefaultApi();


    var date = new Date();
    let today = Math.floor(Date.now() / 1000 )
    let yesterday = Math.floor(date.setDate(date.getDate() - 2)/ 1000)
    let week = Math.floor(date.setDate(date.getDate() - 7)/ 1000)
    let month = Math.floor(date.setDate(date.getDate() - 30)/ 1000)
    let year = Math.floor(date.setDate(date.getDate() - 360)/ 1000)

    let stockPrice = [];

    console.log(year,month,week,yesterday,today)
  
    try {
      const stock1Promise = new Promise((resolve, reject) => {
        finnhubClient.stockCandles("EPAM", "D", yesterday, today, (error, data, response) => {
          if (error) {
            reject(error);
          } else {
            resolve(data);
          }
        });
      });
  
      const stock2Promise = new Promise((resolve, reject) => {
        finnhubClient.stockCandles("AAPL", "D", yesterday, today, (error, data, response) => {
          if (error) {
            reject(error);
          } else {
            resolve(data);
          }
        });
      });

      const stock3Promise = new Promise((resolve, reject) => {
        finnhubClient.stockCandles("META", "D", yesterday, today, (error, data, response) => {
          if (error) {
            reject(error);
          } else {
            resolve(data);
          }
        });
      });

      const stock11Promise = new Promise((resolve, reject) => {
        finnhubClient.stockCandles("EPAM", "D", week, week, (error, data, response) => {
          if (error) {
            reject(error);
          } else {
            resolve(data);
          }
        });
      });
  
      const stock22Promise = new Promise((resolve, reject) => {
        finnhubClient.stockCandles("AAPL", "D", week, week, (error, data, response) => {
          if (error) {
            reject(error);
          } else {
            resolve(data);
          }
        });
      });

      const stock33Promise = new Promise((resolve, reject) => {
        finnhubClient.stockCandles("META", "D", week, week, (error, data, response) => {
          if (error) {
            reject(error);
          } else {
            resolve(data);
          }
        });
      });

      const stock111Promise = new Promise((resolve, reject) => {
        finnhubClient.stockCandles("EPAM", "D", month, month, (error, data, response) => {
          if (error) {
            reject(error);
          } else {
            resolve(data);
          }
        });
      });
  
      const stock222Promise = new Promise((resolve, reject) => {
        finnhubClient.stockCandles("AAPL", "D", month, month, (error, data, response) => {
          if (error) {
            reject(error);
          } else {
            resolve(data);
          }
        });
      });

      const stock333Promise = new Promise((resolve, reject) => {
        finnhubClient.stockCandles("META", "D", month, month, (error, data, response) => {
          if (error) {
            reject(error);
          } else {
            resolve(data);
          }
        });
      });

      const stock1111Promise = new Promise((resolve, reject) => {
        finnhubClient.stockCandles("EPAM", "D", year, year, (error, data, response) => {
          if (error) {
            reject(error);
          } else {
            resolve(data);
          }
        });
      });
  
      const stock2222Promise = new Promise((resolve, reject) => {
        finnhubClient.stockCandles("AAPL", "D", year, year, (error, data, response) => {
          if (error) {
            reject(error);
          } else {
            resolve(data);
          }
        });
      });

      const stock3333Promise = new Promise((resolve, reject) => {
        finnhubClient.stockCandles("META", "D", year, year, (error, data, response) => {
          if (error) {
            reject(error);
          } else {
            resolve(data);
          }
        });
      });
  
    let stockPrice = await Promise.all([stock1Promise, stock2Promise, stock3Promise,stock11Promise, stock22Promise, stock33Promise,
        stock111Promise, stock222Promise]);
        
    let secondStockPrices = await Promise.all([stock333Promise,stock1111Promise, stock2222Promise, stock3333Promise])
  

    console.log([...stockPrice, ...secondStockPrices]);

    res.send([...stockPrice, ...secondStockPrices]);

    } catch (error) {
      console.error(error);
    }
  
    
    
  });







module.exports = router
