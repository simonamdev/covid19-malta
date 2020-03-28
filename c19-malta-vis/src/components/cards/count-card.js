import React from "react"

import CountUp from "react-countup"

const CountCard = ({ count, text }) => (
  <div
    style={{
      background: "#fff",
      borderRadius: "2px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      margin: "0.5rem",
      position: "relative",
      height: 100,
      minWidth: 200,
      padding: "0.5rem",
      boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
      transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
    }}
  >
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <h2 style={{ margin: 0 }}>
        <CountUp end={count} separator="," />
      </h2>
      <h5 style={{ margin: 0 }}>{text}</h5>
    </div>
  </div>
)

export default CountCard
