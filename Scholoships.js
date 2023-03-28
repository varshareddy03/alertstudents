import React from 'react'

function Scholoships() {
    fetch("https://jsonplaceholder.typicode.com/todos")
    .then((resobj)=>resobj.json())
    .then((data)=>{

    let grid=document.querySelector(".grid")
    for(let ele1 of data){
        let row=document.createElement("div")
        row.className='container'
        for(let key in ele1){
            let gridele=document.createElement("div")
            gridele.className='item'
            gridele.textContent=`${key}:${ele1[key]}`
            row.appendChild(gridele)
        }
        grid.appendChild(row)
        row.style.border="2px solid black"
        row.style.width="200px"
        row.style.height="130px"
        row.style.paddingTop="10px"
        row.style.paddingLeft="10px"
        row.style.paddingRight="10px"
        row.style.margin="5px"
        
    }
})
.catch((error)=>console.log(error))
  return (
    <div><h1>Scholoships</h1></div>
  )
}

export default Scholoships