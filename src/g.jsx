import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

function LikesAndDislikes() {
    let [likes,setLikes]=useState(0);
    let [dislikes,setDisLikes]=useState(0);
    let [quotes,setQuotes]=useState(0);
    useEffect(()=>{
        fetch=("https://dummyjson.com/quotes/random")
       
      .then(res => res.json())
        .then((error)=>console.error("error fetching quotes:",end));
    })
  return (
    <div>LikesAndDislikes</div>
  )
}

export default LikesAndDislikes