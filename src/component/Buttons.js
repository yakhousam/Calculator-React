import React from 'react'

const arrayButtons = [
    {id:'clear', content:'AC' , data:'clear'},
    {id:'back', content:'⌫' , data:'back'},
    {id:'divide', content:'÷' , data:'÷'},    
    
    {id:'seven', content:'7' , data:'7'},
    {id:'eight', content:'8' , data:'8'},
    {id:'nine', content:'9' , data:'9'},
    {id:'multiply', content:'×' , data:'×'},
    
    {id:'four', content:'4' , data:'4'},
    {id:'five', content:'5' , data:'5'},
    {id:'six', content:'6' , data:'6'},
    {id:'subtract', content:'-' , data:'-'},
   
    {id:'one', content:'1' , data:'1'},
    {id:'two', content:'2' , data:'2'},
    {id:'three', content:'3' , data:'3'},
    {id:'add', content:'+' , data:'+'},
        
    {id:'zero', content:'0' , data:'0'},
    {id:'decimal', content:'.' , data:'.'},
    {id:'equals', content:'=' , data:'equals'},
]

const Buttons = (props) => {
  return (
      <React.Fragment>
      {arrayButtons.map((btn, i) => <button className="btn" key={i} id={btn.id} data-val={btn.data} onClick={props.onClick}>{btn.content}</button>)}
      </React.Fragment>
    
  )
}

export default Buttons
