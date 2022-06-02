import React, { Component } from "react";


export function FormComponent (props:any) {
    var inputFields = props.inputsFields.map((ele:any) => {
        return (<div>
                    <input
                    type={ele.type}
                    name={ele.name}
                    value={ele.value}
                    placeholder={ele.placeholder}
                    onChange={(e) => ele.onChange(e)}>
                    </input>
                    <span>{ele.errorMessage}</span>
                </div>)
    })

   return (
   <form>
       {inputFields}
       <button type="submit">{props.btnName}</button>
   </form>)
}
