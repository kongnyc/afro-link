import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Results = () => {
  const { id } = useParams();
  const [results, setResults] = useState([]);
  const [bizType, setBizType] = useState("");

  useEffect(() => {
    const getResults = async () => {
      try {
        let res = await axios.get(`http://localhost:3000/categories/${id}`);
        setResults(res.data.payload);
        setBizType(res.data.payload[0].type_name)
      } catch (err) {
        console.log(err);
      }
    };
    getResults();
  }, );
  console.log(results)

  let resultDisplay = results.map((biz, i) => {
    let notAvl = "Not Available"
    let noAdd = ""
    let bizz = biz.street ===  null ? biz.street = noAdd : biz.street
    let hrsSub = biz.hours ===  "" ? biz.hours = notAvl : biz.hours
    return (
      <div>
      <h3 key={i} value={biz.biz_name}>
        {biz.biz_name}
      </h3>
      <li key={i} value={biz.hours}>
        Hours: {hrsSub}
      </li>      
      <li key={i} value={biz.street}>
        {bizz} {biz.city} {biz.state} {biz.zip}
      </li>
      <li key={i} value={biz.website}>
        <a href={biz.website}>{biz.website}</a>
      </li>
      <br/>
      </div>
    );
  });

  return (
    <div style={{ color: "white" }}>
      <h1>{bizType}</h1>
      <ul style={{listStyleType:"none"}}>{resultDisplay}</ul>
    </div>
  );
};

export default Results;
