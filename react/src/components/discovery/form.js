/* eslint-disable no-unused-vars */
import React, { useState }  from 'react'

export const Form= ()=> {

    // eslint-disable-next-line no-unused-vars
    var [name,setName]=useState()
    var [ques,setQues]=useState()
    var [mob,setMob]=useState()
    
    const nameUpdate=(event)=>{ // Dealing with name field changes to update our state
        setName(event.target.value)
        setQues(event.target.value)
        setMob(event.target.value)
    }


    return (
        <div>
            <form action="http://localhost:8080/createUser" method="post" body= "name, ques,mob">
                <label>Full Name:</label>
                <input type="text" name="name" required onChange={nameUpdate}></input>
                <label>Questions:</label>
                <input  type="text" name="ques" required onChange={nameUpdate}></input>
                <label>Mob No.:</label>
                <input  type="text" name="mob " required onChange={nameUpdate}></input>
                <button type="submit"> Submit</button>
            </form>
        </div>
    )
    
}

export default Form;