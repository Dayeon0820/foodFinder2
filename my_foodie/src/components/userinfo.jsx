import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Userinfo = () => {
  const [name, setName] = useState(0);
  const [gender, setGender] = useState("female");
  const [height, setHeight] = useState(0);
  const [range, setRange] = useState(0);
  const getName = (e) => setName(e.target.value);
  const getHeight = (e) => setHeight(e.target.value);
  const getGender = (e) => setGender(e.target.value);
  const getRange = (e) => setRange(e.target.value);
  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();
    const savedInfo = [
      { name: name },
      { gender: gender },
      { height: height },
      { range: range },
    ];
    console.log(savedInfo);

    if (!name || !gender || !height || !range) {
      alert("모든 입력칸을 채워주십시오");
      return;
    } else {
      if (gender === "female") {
        const standard_weight = (
          Math.pow(parseInt(height) / 100, 2) * 21
        ).toFixed(2);
        const requiredIntake = (standard_weight * parseInt(range)).toFixed(2);
        console.log(`표준체중: ${standard_weight}`);
        console.log(`권장섭취량: ${requiredIntake}`);
        navigate("/main", {
          state: { standard_weight, requiredIntake, name },
        });
      } else if (gender === "male") {
        const standard_weight = (
          Math.pow(parseInt(height) / 100, 2) * 22
        ).toFixed(2);
        const requiredIntake = (standard_weight * parseInt(range)).toFixed(2);
        console.log(standard_weight);
        console.log(requiredIntake);
        navigate("/main", {
          state: { standard_weight, requiredIntake, name },
        });
      } else {
        alert("권장 섭취량을 계산할 수 없습니다");
      }
    }
  };

  return (
    <div>
      <h4>정보를 입력해주세요</h4>
      <form action="" className="formContainer" onSubmit={onSubmit}>
        <div className="nameBox">
          <label className="nameTxt">이름</label>
          <div className="outlineBox outlineAge">
            <input type="text" className="nameInput" onChange={getName} /> 님
          </div>
        </div>
        <div className="genderBox">
          <label className="genderTxt">성별</label>
          <div className="outlineBox outlineGender">
            여자{" "}
            <input
              type="radio"
              name="gender"
              id="female"
              onChange={getGender}
              value="female"
            />
            남자{" "}
            <input
              type="radio"
              name="gender"
              id="male"
              onChange={getGender}
              value="male"
            />
          </div>
        </div>
        <div className="heightBox">
          <label className="heightTxt">키</label>
          <div className="outlineBox">
            <input
              type="number"
              className="heightInput"
              min={100}
              max={200}
              onChange={getHeight}
            />{" "}
            cm
          </div>
        </div>
        <div className="lightContent contentBox">
          <input
            type="radio"
            name="activity"
            id="light"
            value={25}
            onChange={getRange}
          />
          <label className="lightTxt">가벼운 활동</label>
        </div>
        <div className="contentBox">
          <input
            type="radio"
            name="activity"
            id="moderate"
            value={30}
            onChange={getRange}
          />
          <label className="moderateTxt">중등도 활동</label>
        </div>
        <div className="contentBox">
          <input
            type="radio"
            name="activity"
            id="strong"
            value={35}
            onChange={getRange}
          />
          <label className="strongTxt">강한 활동</label>
        </div>
        <div className="contentBox">
          <input
            type="radio"
            name="activity"
            id="veryStrong"
            value={40}
            onChange={getRange}
          />
          <label className="veryStrongTxt">아주 강한 활동</label>
        </div>
        <input type="submit" value="등록" />
      </form>
    </div>
  );
};

export default Userinfo;
