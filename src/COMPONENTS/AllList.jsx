import React, { useState, useEffect } from "react";
import axios from "axios";
import { useScrollBy } from "react-use-window-scroll";
import { useContext, Suspense } from "react";
import { context } from "../App";
import "../App.css";
import ReactPaginate from "react-paginate";
import { AnimatePresence, motion } from "framer-motion";

const AllList = (props) => {
  const [Flex, setFlex] = useState(true);
  const [Page, setPage] = useState(true);
  const [searching, setSearching] = useState(false);
  const [heading, setHeading] = useState("JOBS\xA0SITES");
  const [visit, setVisit] = useState(true);
  const [searchval, setSearchVal] = useState("");
  const scrollBy = useScrollBy();
  const COURSES =
    "https://script.googleusercontent.com/macros/echo?user_content_key=aAXr4l7EkA4WaifO3aNZs1XJY-y2o2oEKBcnI2AJaYq7O9vtcbEAGJtJkRn8W7T2ZwiV6iXQdylBMha96aZTYX9KuKkIbLJUOJmA1Yb3SEsKFZqtv3DaNYcMrmhZHmUMWojr9NvTBuBLhyHCd5hHa7PhnkVLCa_hukIbDoyMSFsSKj7JOo4IwzSVNv24TdjPvsGq6DHehugH3B1zc8mNfURE_MetAYBrgQ5IRBhqfbjzUZuNCXeoHwXIuFltvcj9bVKn3MpuO19m_4qgmdpvDQ&lib=M_c9ESy5svgJSzLc4nFE_wixfEmHMXltD";
  const JOBS =
    "https://script.googleusercontent.com/macros/echo?user_content_key=1RYtvRd1Bi_5TGNzZmZBDYoJstxy54WdcXSIMmRefMChYUlfChKKQ5Yr43D6vXzFYDWQOFUOOdVzUnuVhkHaTU5wZE5Eq9wzOJmA1Yb3SEsKFZqtv3DaNYcMrmhZHmUMWojr9NvTBuBLhyHCd5hHawRLx4o1Lld_M_GfLau5yx3fJJRy-wh38zOUrDhYKkSueTuG3RR0Gd6Do9FBkMowGWypou7H8LoZXowUxADxiH1brWfEa79xmwtBHn44AOQP9fnK6RNm5-Q&lib=MnZsSb_wHCcwrxc2V7sb5scsAxIjQUtdv";
  const SALARY =
    "https://script.googleusercontent.com/macros/echo?user_content_key=x7pR0UYuJGXKVtq1rLYrGq7rc0QQHOuLz7FYAhxQo9Le_KTxRvGaShzoKztl3oiOGs5tRdDp_TgaK436yMCYJkJyGZjCHMoQOJmA1Yb3SEsKFZqtv3DaNYcMrmhZHmUMWojr9NvTBuBLhyHCd5hHa9eSrT6Ksgw1VMrGhJ-ro9GomFDOug2OWhakMSWaUqXWb888iJBsPmaUlqGO798XO4-bZlvsS-VBxx5hPwKkgSV2k_hpdhmdzwtBHn44AOQP9fnK6RNm5-Q&lib=MtNiaslndCwi1-8dhlm1gPssAxIjQUtdv";

  const [salary, setSalary] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [datas, setDatas] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isActive, setIsActive] = useState("JOBS");
  const [sm, setSM] = useState("Discover the world's top");
  const filters = [
    { val: "JOBS", link: JOBS, i: <i className="fa-solid fa-briefcase"></i> },

    {
      val: "COURSES",
      link: COURSES,
      i: <i className="fa-solid fa-graduation-cap"></i>,
    },

    {
      val: "SALARIES",
      link: SALARY,
      i: <i className="fa-solid fa-money-bill-wave"></i>,
    },
  ];

  const usersPerPage = 8;
  const pagesVisited = pageNumber * usersPerPage;

  const dataCount = datas.filter((data) => !(data.TITLE.length === 0));
  const pageCount = Math.ceil(dataCount.length / usersPerPage);

  const changePage = ({ selected }) => {
    window.location.href = "#id";
    setPageNumber(selected);
  };

  const handleSearch = (e) => {
    setSearchVal(e.target.value);

    if (e.target.value.length === 0) {
      return setSearching(false), setFlex(true), setPage(true);
    }
    setSearching(true);
    setFlex(false);
    setPage(false);
  };

  const fetchData = async (link) => {
    await axios.get(link).then((res) => setDatas(res.data));
    setLoading(false);
  };

  useEffect(() => {
    fetchData(JOBS);
  }, []);

  const refetchData = async (link) => {
    setPageNumber(0);
    if (link == JOBS) {
      setHeading("JOBS\xA0SITES");
      setSM("Discover the world's top");
      setIsActive("JOBS");
      setVisit(true);
      setSalary(false);
    } else if (link == COURSES) {
      setHeading("COURSES");
      setSM("Discover the world's top");
      setIsActive("COURSES");
      setVisit(true);
      setSalary(false);
    } else if (link == SALARY) {
      setHeading("SALARIES");
      setSM("Discover the world's highest");
      setIsActive("SALARIES");
      setVisit(false);
      setSalary(true);
    }

    setLoading(true);
    await axios.get(link).then((res) => setDatas(res.data));
    setLoading(false);
  };

  const displayUsers = datas
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .filter((data) =>
      data.TITLE.toLowerCase().includes(searchval.toLowerCase())
    )
    .map((data, index) => {
      return (
        <motion.div
          key={index}
          style={{ display: data.TITLE.length === 0 ? "none" : "block" }}
          className="container"
          onClick={() =>
            data.LINK.length === 0
              ? ""
              : setTimeout(function () {
                  window.open(data.LINK);
                }, 1000)
          }
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div
            className="forImg"
            style={{ height: data.DESC.length === 0 ? "240px" : "" }}
          >
            <img src={data.IMAGE} />
          </div>
          <div
            className="title"
            style={{
              zIndex: "55",
            }}
          >
            <span>{salary ? `$${data.SALARY}` : data.TITLE}</span>
          </div>
          <div
            className="desc"
            style={{
              display: data.DESC.length === 0 ? "none" : "-webkit-box",
            }}
          >
            <h1
              style={{
                display: salary ? "block" : "none",
                fontSize: "20px",
                marginTop: "5px",
                fontWeight: 400,
              }}
              className="desc2"
            >
              {salary && data.TITLE}
            </h1>

            {data.DESC}
          </div>

          {visit && (
            <div
              style={{ display: data.DESC.length === 0 ? "none" : "block" }}
              className="visit"
              onClick={() =>
                data.DESC.length === 0
                  ? ""
                  : setTimeout(function () {
                      window.open(data.LINK);
                    }, 1000)
              }
            >
              <i className="fa-solid fa-paper-plane"></i>
            </div>
          )}
        </motion.div>
      );
    });

  return (
    <div>
      <div id="id"></div>
      <div className="sm">{sm}</div>
      <div className="h1">{heading}</div>

      <input
        type="text"
        placeholder="Search here"
        onChange={(e) => handleSearch(e)}
      />
      <br />

      {filters.map((filt, index) => (
        <button
          key={index}
          className={isActive == filt.val ? "active" : ""}
          onClick={() => refetchData(filt.link)}
        >
          {filt.i} {filt.val}
        </button>
      ))}

      {isLoading ? (
        <>
          <div className="banter-loader loader">
            <div className="banter-loader__box"></div>
            <div className="banter-loader__box"></div>
            <div className="banter-loader__box"></div>
            <div className="banter-loader__box"></div>
            <div className="banter-loader__box"></div>
            <div className="banter-loader__box"></div>
            <div className="banter-loader__box"></div>
            <div className="banter-loader__box"></div>
            <div className="banter-loader__box"></div>
          </div>
        </>
      ) : (
        <>
          <div className="disflex">
            <AnimatePresence>
              {Flex && displayUsers}

              {searching &&
                datas
                  .filter((data) =>
                    data.TITLE.toLowerCase().includes(searchval.toLowerCase())
                  )
                  .map((data, index) => {
                    return (
                      <motion.div
                        key={index}
                        style={{
                          display: data.TITLE.length === 0 ? "none" : "block",
                        }}
                        className="container"
                        onClick={() =>
                          data.LINK.length === 0
                            ? ""
                            : setTimeout(function () {
                                window.open(data.LINK);
                              }, 1000)
                        }
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div
                          className="forImg"
                          style={{
                            height: data.DESC.length === 0 ? "240px" : "",
                          }}
                        >
                          <img src={data.IMAGE} />
                        </div>
                        <div className="title">
                          <span>{salary ? `$${data.SALARY}` : data.TITLE}</span>
                        </div>
                        <div
                          className="desc"
                          style={{
                            display:
                              data.DESC.length === 0 ? "none" : "-webkit-box",
                          }}
                        >
                          <h1
                            style={{
                              display: salary ? "block" : "none",
                              fontSize: "20px",
                              marginTop: "5px",
                              fontWeight: 400,
                            }}
                            className="desc2"
                          >
                            {salary && data.TITLE}
                          </h1>

                          {data.DESC}
                        </div>

                        {visit && (
                          <div
                            style={{
                              display:
                                data.DESC.length === 0 ? "none" : "block",
                            }}
                            className="visit"
                            onClick={() =>
                              data.DESC.length === 0
                                ? ""
                                : setTimeout(function () {
                                    window.open(data.LINK);
                                  }, 1000)
                            }
                          >
                            <i className="fa-solid fa-paper-plane"></i>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
            </AnimatePresence>
          </div>

          {Page && (
            <ReactPaginate
              className="paginationBttns"
              previousLabel={"Prev"}
              nextLabel={"Next"}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"paginationBttns"}
              previousLinkClassName={"previousBttn"}
              nextLinkClassName={"nextBttn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
            />
          )}

          <div className="footer">
            Made with&nbsp;
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              width="22"
              height="22"
              className="sol-icon"
            >
              <g id="icon-heart">
                <path
                  id="Vector"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.54154 5.54154C5.59693 3.48615 8.92938 3.48615 10.9848 5.54154L12 6.55677L13.0152 5.54154C15.0706 3.48615 18.4031 3.48615 20.4585 5.54154C22.5138 7.59693 22.5138 10.9294 20.4585 12.9848L12.3536 21.0897C12.1583 21.2849 11.8417 21.2849 11.6464 21.0897L3.54154 12.9848C1.48615 10.9294 1.48615 7.59693 3.54154 5.54154Z"
                  fill=" #FF0000"
                ></path>
              </g>
            </svg>
            &nbsp;by &nbsp;
            <span className="sl-footer-links__marked-text">
              Bryan G | © 2022
            </span>
            <br />
            Invest in your future.
            <br />
            <button
              className="button2"
              onClick={() => (window.location.href = "/add")}
            >
              ADD DATA <i class="fa-solid fa-plus"></i>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AllList;
