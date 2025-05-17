import { Component, useState, useEffect } from 'react'
import './App.css'
import { AiFillTwitterCircle } from "react-icons/ai"
import { FaQuoteLeft } from "react-icons/fa";
import { IconContext } from 'react-icons';


const url = 'https://api.realinspire.live/v1/quotes/random?minLength=100&maxLength=150';
const tweeturl = 'https://twitter.com/intent/tweet'

function App() {
  const colors = [
  "#6495ED",
  "#FFC080",
  "#8B9467",
  "#4B0082",
  "#FF69B4",
  "#3CB371",
  "#FFA07A",
  "#7A288A",
  "#2E865F",
  "#CD5C5C"
  ];

  const [bgColor, setbgColor] = useState(colors[Math.floor(Math.random()*10)]);
  const [author, setauthor] = useState('');
  const [content, setcontent] = useState('');
  const [tweet, settweet] = useState('')

  const fetchApi = async () => {
    const result = await fetch(url);
    result.json().then(json=>{
      setauthor(json[0].author)
      setcontent(json[0].content)
      settweet(tweeturl+json[0].content)
    })
  }

  useEffect(()=>{
    fetchApi()
  },[])

  const randomColor = () => {
    let newColor = colors[Math.floor(Math.random()*10)]
    setbgColor(newColor)
    fetchApi()
  }

  return (
    <>
    <div className='body' style={{backgroundColor: bgColor}}>
      <div id="quote-box">
        <p id="text" style={{color: bgColor}}><FaQuoteLeft /> {content}
        </p>
        <div className="author">
          <span id='author' style={{color: bgColor}}>-{author}</span>
        </div>
        <div className='lower'>
          <a href={tweet} target='_blank'>
            <IconContext.Provider value={{size: 50}}>
            <AiFillTwitterCircle />
            </IconContext.Provider>
          </a>
          <button id='new-quote' style={{backgroundColor: bgColor, color: 'white'}} onClick={randomColor}>New Quote</button>
        </div>
      </div>

    </div>
      
    </>
  )
}

export default App
