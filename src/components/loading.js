import React from "react"

const Loading = props => {
  return (
    <div className="loading">
      <p className={"loading__text"}>{props.text}</p>
      <div className={"loading__cheeseGroup"}>
        <img src={"/items/Cheese.png"} alt={``} className={"loading__cheese"} />
        <img src={"/items/Cheese.png"} alt={``} className={"loading__cheese"} />
        <img src={"/items/Cheese.png"} alt={``} className={"loading__cheese"} />
      </div>
    </div>
  )
}

export default Loading
