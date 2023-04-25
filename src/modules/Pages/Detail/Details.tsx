import React, { useEffect, useState } from "react";
import "./detail.css";

const Detail = () => {
  const [data, setData] = useState();

  useEffect(() => {
    fetch(
      "http://api.training.div3.pgtest.co/api/v1/product/"
    )
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.log("error", error));
  }, []);

  console.log(data);

  const dataa = [
    {
      id: 1,
      name: "John",
      age: 30,
      email: "john@gmail.com",
      phone: "555-1234",
    },
    {
      id: 2,
      name: "Jane",
      age: 25,
      email: "jane@gmail.com",
      phone: "555-5678",
    },
    {
      id: 3,
      name: "Bob",
      age: 40,
      email: "bob@gmail.com",
      phone: "555-4321",
    },
  ];

  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            <th>Status</th>
            <th>Date</th>
            <th>Currency</th>
            <th>Total</th>
            <th>ViewDetail</th>
          </tr>
        </thead>
        <tbody>
          {dataa.map((item) => (
            <tr key={item.id} className="table-row">
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.age}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Detail;
