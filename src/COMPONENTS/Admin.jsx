import React, { useEffect, useState } from "react";
import axios from "axios";
import ME from "../ME.jpg";
import { useNavigate } from "react-router-dom";
import { isDisabled } from "@testing-library/user-event/dist/utils";

const Admin = () => {
  const navigate = useNavigate();

  const COURSES =
    "https://script.googleusercontent.com/macros/echo?user_content_key=aAXr4l7EkA4WaifO3aNZs1XJY-y2o2oEKBcnI2AJaYq7O9vtcbEAGJtJkRn8W7T2ZwiV6iXQdylBMha96aZTYX9KuKkIbLJUOJmA1Yb3SEsKFZqtv3DaNYcMrmhZHmUMWojr9NvTBuBLhyHCd5hHa7PhnkVLCa_hukIbDoyMSFsSKj7JOo4IwzSVNv24TdjPvsGq6DHehugH3B1zc8mNfURE_MetAYBrgQ5IRBhqfbjzUZuNCXeoHwXIuFltvcj9bVKn3MpuO19m_4qgmdpvDQ&lib=M_c9ESy5svgJSzLc4nFE_wixfEmHMXltD";
  const JOBS =
    "https://script.googleusercontent.com/macros/echo?user_content_key=1RYtvRd1Bi_5TGNzZmZBDYoJstxy54WdcXSIMmRefMChYUlfChKKQ5Yr43D6vXzFYDWQOFUOOdVzUnuVhkHaTU5wZE5Eq9wzOJmA1Yb3SEsKFZqtv3DaNYcMrmhZHmUMWojr9NvTBuBLhyHCd5hHawRLx4o1Lld_M_GfLau5yx3fJJRy-wh38zOUrDhYKkSueTuG3RR0Gd6Do9FBkMowGWypou7H8LoZXowUxADxiH1brWfEa79xmwtBHn44AOQP9fnK6RNm5-Q&lib=MnZsSb_wHCcwrxc2V7sb5scsAxIjQUtdv";
  const SALARY =
    "https://script.googleusercontent.com/macros/echo?user_content_key=x7pR0UYuJGXKVtq1rLYrGq7rc0QQHOuLz7FYAhxQo9Le_KTxRvGaShzoKztl3oiOGs5tRdDp_TgaK436yMCYJkJyGZjCHMoQOJmA1Yb3SEsKFZqtv3DaNYcMrmhZHmUMWojr9NvTBuBLhyHCd5hHa9eSrT6Ksgw1VMrGhJ-ro9GomFDOug2OWhakMSWaUqXWb888iJBsPmaUlqGO798XO4-bZlvsS-VBxx5hPwKkgSV2k_hpdhmdzwtBHn44AOQP9fnK6RNm5-Q&lib=MtNiaslndCwi1-8dhlm1gPssAxIjQUtdv";

  const SENDJOBS =
    "https://script.google.com/macros/s/AKfycbyCWNF5vQ_l9k29_wv29JPN56LJ14xXeB_DV6Ko6arH_nGPOYChPO3l6b8p6qpDYV92/exec";

  const SENDCOURSES =
    "https://script.google.com/macros/s/AKfycbxD0T_vO2aPB2bpgZRCQa3geHsOansMPH5-9XRul-3hCuOFO2m_6Zr8MkA05suPNHP7ow/exec";

  const SENDSALARY =
    "https://script.google.com/macros/s/AKfycbx4jeETm_KqZcnkg4qLYe4axxqrp_HYnR0d_GbgfZ_PsFWpmBGq03ywF0XgPTHYYV5N/exec";

  const [sendTo, setSendTo] = useState(SENDJOBS);
  const [btnbot, setBtnBot] = useState(true);

  const [jobs, setJobs] = useState([]);
  const [courses, setCourses] = useState([]);
  const [salaries, setSalaries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJOBS = async () => {
    await axios.get(JOBS).then((res) => setJobs(res.data));
    setLoading(false);
  };

  const fetchCOURSES = async () => {
    await axios.get(COURSES).then((res) => setCourses(res.data));
    setLoading(false);
  };

  const fetchSALARY = async () => {
    await axios.get(SALARY).then((res) => setSalaries(res.data));
    setLoading(false);
  };

  useEffect(() => {
    fetchJOBS();
    fetchCOURSES();
    fetchSALARY();
  }, []);

  const [isActive, setIsActive] = useState("JOBS");
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

  const [countSalary, setCountSalary] = useState(0);
  const [countCourse, setCountCourses] = useState(0);
  const [countJob, setCountJobs] = useState(0);
  const [forsalary, setForSalary] = useState(false);
  const [forlink, setForLink] = useState(true);

  // open center login
  const [ifopen, setOpen] = useState(false);

  const countSalaries = salaries.filter(
    (salary) => !(salary.DESC.length == 0)
  ).length;

  const countCourses = courses.filter(
    (course) => !(course.DESC.length == 0)
  ).length;

  const countJobs = jobs.filter((job) => !(job.DESC.length == 0)).length;

  useEffect(() => {
    setTimeout(() => {
      setCountSalary(countSalary + 1);
      setCountCourses(countCourse + 1);
      setCountJobs(countJob + 1);

      if (countSalary == countSalaries) {
        setCountSalary(countSalaries);
      }
      if (countCourse == countCourses) {
        setCountCourses(countCourses);
      }
      if (countJob == countJobs) {
        setCountJobs(countJobs);
      }
    }, 50);
  });

  const sendData = (link) => {
    setWhatype("button");
    if (link == JOBS) {
      setForSalary(false);
      setForLink(true);
      setSendTo(SENDJOBS);
      setIsActive("JOBS");
    } else if (link == COURSES) {
      setForSalary(false);
      setForLink(true);
      setSendTo(SENDCOURSES);
      setIsActive("COURSES");
    } else if (link == SALARY) {
      setForSalary(true);
      setForLink(false);
      setSendTo(SENDSALARY);
      setIsActive("SALARIES");
    }
  };

  const handleClick = () => {
    setOpen(true);
    setBtnBot(false);
  };

  const handleClick2 = () => {
    setOpen(false);
    setBtnBot(true);
  };

  const [isDis, setIsDis] = useState(true);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  useEffect(() => {
    if (user == "Password" && pass == "Username") {
      setIsDis(false);
      setWhatype("submit");
    }
  }, [user, pass]);

  const handleSub = (event) => {
    if (event.keyCode === 13) {
      //13 is the key code for Enter
      event.preventDefault();
      //Here you can even write the logic to select the value from the drop down or something.
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  const [whaType, setWhatype] = useState("button");

  return (
    <>
      <div className="addflex">
        <div className="countflex">
          <div className="countcon">
            <span>{loading ? "0" : countJob}</span> JOBS
          </div>
          <div className="countcon">
            <span>{loading ? "0" : countCourse}</span> COURSES
          </div>
          <div className="countcon">
            <span>{loading ? "0" : countSalary}</span> SALARIES
          </div>
        </div>

        <form
          method="POST"
          action={sendTo}
          autoComplete="off"
          onKeyDown={handleSub}
        >
          <div className="addform">
            {ifopen && (
              <div className="ifopen">
                <div className="center">
                  <div className="circleImg">
                    <img src={ME} />
                  </div>
                  <div className="div">
                    <input
                      placeholder="Username"
                      onChange={(e) => setUser(e.target.value)}
                    />
                  </div>
                  <div className="div">
                    <input
                      placeholder="Password"
                      onChange={(e) => setPass(e.target.value)}
                    />
                  </div>

                  <div>
                    <button
                      type="button"
                      onClick={handleClick2}
                      style={{ background: "red", color: "white" }}
                    >
                      BACK{" "}
                      <i
                        className="fa-solid fa-xmark"
                        style={{ color: "white" }}
                      ></i>
                    </button>
                    <button type={whaType} disabled={isDis} onClick={handleSub}>
                      SUBMIT <i className="fa-solid fa-paper-plane"></i>
                    </button>
                  </div>
                </div>
              </div>
            )}
            <div className="span">ADD DATA TO</div>
            <div className="buttons">
              {filters.map((filt, index) => (
                <button
                  type="button"
                  key={index}
                  className={isActive == filt.val ? "active" : ""}
                  onClick={() => sendData(filt.link)}
                >
                  {filt.i} {filt.val}
                </button>
              ))}
            </div>
            <div className="form">
              <div className="div">
                <label>Title</label>
                <input name="TITLE" />
              </div>
              {forsalary && (
                <div className="div">
                  <label>Salary</label>
                  <input name="SALARY" />
                </div>
              )}

              <div className="div">
                <label>Description</label>
                <input name="DESC" />
              </div>

              {forlink && (
                <div className="div">
                  <label>Link</label>
                  <input name="LINK" />
                </div>
              )}
              <div className="div">
                <label>Image Source</label>
                <input name="IMAGE" />
              </div>
            </div>

            {btnbot && (
              <div className="submit">
                <button className="button1" type="button" onClick={goBack}>
                  BACK <i className="fa-solid fa-xmark"></i>
                </button>
                <button onClick={handleClick} type="button">
                  CONTINUE <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            )}
          </div>
        </form>
      </div>

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
        <span className="sl-footer-links__marked-text">Bryan G </span>
        | © 2022
        <br />
        Invest in your future.
      </div>
    </>
  );
};

export default Admin;
