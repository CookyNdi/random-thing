import React, { useEffect, useState } from "react";

const Home = () => {
  let qu = ``;
  const [dataPos, setDataPos] = useState("Tengah");
  // console.log(dataPos);

  const btnKanan = () => {
    setDataPos("Kanan");
  };
  const btnTengah = () => {
    setDataPos("Tengah");
  };
  const btnKiri = () => {
    setDataPos("Kiri");
  };

  if (dataPos === "Kanan") {
    qu = `Select * WHERE D = "kanan"`;
  } else if (dataPos === "Tengah") {
    qu = `Select * WHERE D = "tengah"`;
  } else if (dataPos === "Kiri") {
    qu = `Select * WHERE D = "kiri"`;
  }

  const sheetId = "1tsZ8DsXFLLslKR_4PASJJJNvbml-tW_oWrvZDFinr4A";
  const baseUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
  const sheetName = "Sheet2";
  // console.log(qu);
  const query = encodeURIComponent(qu);
  const url = `${baseUrl}&sheet=${sheetName}&tq=${query}`;
  const data = [];

  const [datas, setData] = useState([]);

  const db = () => {
    fetch(url)
      .then((res) => res.text())
      .then((rep) => {
        const jsData = JSON.parse(rep.substr(47).slice(0, -2));
        const colz = [];
        jsData.table.cols.forEach((heading) => {
          if (heading.label) {
            colz.push(heading.label.toLowerCase().replace(/\s/g, ""));
          }
        });
        jsData.table.rows.forEach((main) => {
          const row = {};
          colz.forEach((element, index) => {
            row[element] = main.c[index] != null ? main.c[index].v : "NULL";
          });
          data.push(row);
        });
        setData(data);
      });
  };

  useEffect(() => {
    db();
  }, [dataPos, datas]);

  // console.log(datas);
  return (
    <>
      <section className="container">
        <div className="button-section">
          <button type="button" onClick={btnKanan}>
            kanan
          </button>
          <button type="button" onClick={btnTengah}>
            tengah
          </button>
          <button type="button" onClick={btnKiri}>
            kiri
          </button>
        </div>
        <div className="content-section">
          {datas.map((data) => (
            <div className="card" key={data.id}>
              <img src={data.image} alt={data.title} />
              <h1>{data.title}</h1>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
