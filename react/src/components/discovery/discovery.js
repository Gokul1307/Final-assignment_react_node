
import React,{useState} from "react";
import { useHistory } from "react-router-dom";
import { Button } from 'react-bootstrap';






import "./style.js";


export default function App({match}) {
// react Hook For State Handler
  const [data , setData]=useState(null)
  const history = useHistory();
 

// Fetch Function   
  fetch("./data.json").then(
    function(res){
    return res.json()
  }).then(function(data){
  // store Data in State Data Variable
    setData(data)
  }).catch(
    function(err){
      console.log(err, ' error')
    }
  )



 





  return (
    <div className="App">
      {
        // use data State Variable For Get Data Use JavaScript Map Mathod
       data? data.map(
          function(data){
                  return (<div className="card" key={data.name}>
                 
                 <h1><b><u>{data.name}</u></b></h1>
                  <h3> {data.location}</h3>
                  <h4> {data.priceForTwo}</h4>
                  <h4> {data.veg_nonVeg}</h4>
                  <h4> {data.ratingFor5}</h4>
                  <button className="btn btn-primary" onClick={()=>{


                   
                    history.push(`${match.url}${data.name}`)}}>
                      
                      vist</button>


                  <Button variant="btn btn-success" onClick={() =>{


                    history.push(`${data.name}`)
                    history.push('/form')}}>
                    
                    Click button to ask questions</Button>
          
              </div>)
          }
        ):""
      }
    </div>
  );
}