import { saveAs } from "file-saver"
import canvas2image from "canvas2image-2";
import React from "react"

import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';


var url; // fixed the url bug by defining this url variable globally so it can be used outside and inside functions

var canvas = document.createElement("canvas")







export default function Meme() {
 
  
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg" 
    })
    const [allMemes, setAllMemes] = React.useState([])
      React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then(data => setAllMemes(data.data.memes))
        
    }, [])
    
   
    function getMemeImage() {
        
        const randomNumber = Math.floor(Math.random() * allMemes.length)
         url = allMemes[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
            
        }))
      
    }
   

      
    
    console.log(url)
    
    function handleChange(event) {
        const {name, value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }
    var node = document.getElementById('my-node');

    function handleDL(){
        htmlToImage.toPng(document.getElementById('my-node'))
  .then(function (dataUrl) {
    saveAs(dataUrl, 'my-meme.png');
  });
    }
  

 



   
    
    return (
        <main>
            <div className="form">
                <input 
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input 
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                <button 
                    className="form--button"
                    onClick={getMemeImage}
                >
                    Get a new meme image 🖼
                </button>
                <button 
                className="form--button"
                onClick={handleDL}
            >
                Download your meme 🖼
            </button>
            </div>
           
            <div id="my-node"className="meme">
                <img src={meme.randomImage} className="meme--image" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}