import React, { useState } from "react";
import { useEffect } from "react/cjs/react.production.min";
import "./InfoPagination.scss";

const InfoPagination = (props) => {
  console.log(props);
  const initDataShow = props.limit
    ? props.bodyData.slice(0, Number(props.limit))
    : props.bodyData;
  console.log();
  const [dataShow, setDataShow] = useState(initDataShow);
  let pages = 1;
  let range = [];

  if (props.limit !== undefined) {
    let page = Math.floor(props.bodyData.length / Number(props.limit));
    pages = props.bodyData.length % Number(props.limit) === 0 ? page : page + 1;
    range = [...Array(pages).keys()];
  }

  const [currPage, setCurrPage] = useState(0);

  const selectPage = (page) => {
    const start = Number(props.limit) * page;
    const end = start + Number(props.limit);

    setDataShow(props.bodyData.slice(start, end));
    setCurrPage(page);
  };
  useEffect(() => {}, [props]);
  const renderWork = (item, index) => {
    console.log(dataShow);
    return props.renderBody(item, index);
  };

  return (
    <div className="info-pagination">
      {pages > 1 ? (
        <div className="pagination margin-bottom">
          {range.map((item, index) => (
            <div
              key={index}
              className={`pagination-item ${
                currPage === index ? "active" : ""
              }`}
              onClick={() => selectPage(index)}
            >
              {item + 1}
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
      {props.bodyData && props.renderBody ? (
        <>{dataShow.map((item, index) => renderWork(item, index))}</>
      ) : null}
      {pages > 1 ? (
        <div className="pagination">
          {range.map((item, index) => (
            <div
              key={index}
              className={`pagination-item ${
                currPage === index ? "active" : ""
              }`}
              onClick={() => selectPage(index)}
            >
              {item + 1}
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default InfoPagination;
