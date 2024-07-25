import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Finder from "./finder";

const Mainpage = () => {
  const location = useLocation();
  const [username, setUsername] = useState(
    localStorage.getItem("username") || location.state?.name || "이용자"
  );
  const [standardWeight, setStandardWeight] = useState(
    localStorage.getItem("weight") ||
      location.state?.standard_weight ||
      "(error)"
  );
  const [requiredIntake, setRequiredIntake] = useState(
    localStorage.getItem("intake") ||
      location.state?.requiredIntake ||
      "(error)"
  );
  const [requiredCarbs, setRequiredCarbs] = useState(
    localStorage.getItem("re_carbs") ||
      ((parseFloat(requiredIntake) * 0.5) / 4).toFixed(1)
  );
  const [requiredProtein, setRequiredProtein] = useState(
    localStorage.getItem("re_prot") ||
      ((parseFloat(requiredIntake) * 0.15) / 4).toFixed(1)
  );
  const [requiredFat, setRequiredFat] = useState(
    localStorage.getItem("re_fat") ||
      ((parseFloat(requiredIntake) * 0.22) / 9).toFixed(1)
  );

  useEffect(() => {
    // localStorage에 값이 없으면 저장
    if (!localStorage.getItem("username")) {
      localStorage.setItem("username", username);
      localStorage.setItem("weight", standardWeight);
      localStorage.setItem("intake", requiredIntake);
      localStorage.setItem("re_carbs", requiredCarbs);
      localStorage.setItem("re_prot", requiredProtein);
      localStorage.setItem("re_fat", requiredFat);
    }
  }, [
    username,
    standardWeight,
    requiredIntake,
    requiredCarbs,
    requiredProtein,
    requiredFat,
  ]);
  return (
    <div>
      <h1>{username}님의</h1>
      <h2>표준체중: {standardWeight} Kg</h2>
      <h2>권장섭취량: 총 {requiredIntake}cal</h2>
      <div>
        <span>탄수화물: {requiredCarbs}g </span>
        <span>단백질: {requiredProtein}g </span>
        <span>지방: {requiredFat}g </span>
      </div>
      <Link to="/finder">식단 입력하기</Link>
    </div>
  );
};
export default Mainpage;
