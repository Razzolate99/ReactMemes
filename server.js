const express = require('express');
const download = require('image-downloader')
const app = express();
const cors = require('cors');



  
  // upload endpoint for an url link
  
  app.post('/',(req, res) => {
  
    const url = req.body.url;
    paramArr = url.split('/')
    const fileName = paramArr[paramArr.length-1]
    
    const options = {
      url: url,
      dest: `${__dirname}/client/public/uploads/${Date.now()+fileName}`
    }
     
    async function downloadIMG() {
      try {
        const { filename, image } = await download.image(options)
        console.log('download')
        return filename
        
      } catch (e) {
        console.error(e)
      }
    }
  
  
   downloadIMG()
   .then(r => res.json({fileName: r}))
    
  })