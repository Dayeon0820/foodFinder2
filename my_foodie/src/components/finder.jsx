import React from "react";
import SumFood from "./sum";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Finder = () => {
  const base_url =
    "http://apis.data.go.kr/1471000/FoodNtrIrdntInfoService1/getFoodNtrItdntList1";
  const service_key =
    "F0ujwILUgFVtwYhJG8RKhlh0Zne1fV7drPAZN1CbFqshZ4o%2BfztKpNhGadkKL%2FKCGIaHfw8iPJ7K4%2FU8CgnDBg%3D%3D";
  const url_with_service_key = `${base_url}?ServiceKey=${service_key}&type=json`;

  const query_by_food_name = async (food_name) => {
    const url_with_food_name = `${url_with_service_key}&desc_kor=${food_name}`;
    let result_json = await fetch(url_with_food_name)
      .then((res) => res.json())
      .then((json) => json.body);

    return result_json;
  };
  const navigate = useNavigate();
  const [food, setFood] = useState("");
  const [foods, setfoods] = useState([]);
  const [select, setSelect] = useState("");
  const [gram, setGram] = useState(0);
  const getGram = (e) => setGram(e.target.value);
  const getFood = (e) => setFood(e.target.value);
  const getselect = (e) => {
    setSelect(e.target.value);
  };
  const [carbs, setCarbs] = useState(0);
  const [protein, setProtein] = useState(0);
  const [fat, setFat] = useState(0);
  const [cal, setCal] = useState(0);
  const [Fname, setFname] = useState("");
  const [time, setTime] = useState("");
  const [meal, setmeal] = useState({});
  const [savedMeals, setSavedMeals] = useState([]);
  const getTime = (e) => setTime(e.target.value);
  const onsubmit = (e) => {
    e.preventDefault();
    query_by_food_name(food).then((data) => {
      if (data) {
        console.log(data);
        if (data.items && data.items.length > 0) {
          setfoods(data.items);
        } else {
          console.log("no item foound");
        }
      } else {
        console.log("No data received");
      }
    });
  };
  const onselect = (e) => {
    e.preventDefault();
    const parsedValue = JSON.parse(select);

    console.log(parsedValue);
    console.log(gram);
    setFname(parsedValue[0]);
    setCal(parsedValue[1]);
    setCarbs(parsedValue[2]);
    setProtein(parsedValue[3]);
    setFat(parsedValue[4]);
  };

  const setItems = () => {
    setSavedMeals((prevMeals) => {
      const updatedMeals = [...prevMeals, meal];
      localStorage.setItem("savedMeals", JSON.stringify(updatedMeals));
      return updatedMeals;
    });
  };
  //이부분 이해 하기
  useEffect(() => {
    const newMeal = {
      time: time,
      calories: ((parseFloat(cal) * parseFloat(gram)) / 100).toFixed(2),
      carbs: ((parseFloat(carbs) * parseFloat(gram)) / 100).toFixed(2),
      protein: ((parseFloat(protein) * parseFloat(gram)) / 100).toFixed(2),
      fat: ((parseFloat(fat) * parseFloat(gram)) / 100).toFixed(2),
    };
    setmeal(newMeal);
  }, [time, cal, carbs, protein, fat, gram]);

  useEffect(() => {
    const loadedMeals = JSON.parse(localStorage.getItem("savedMeals")) || []; // <-- 변경된 부분
    setSavedMeals(loadedMeals);
  }, []);

  return (
    <div>
      <h1>식단을 입력하세요</h1>
      <form id="finder_form" onSubmit={onsubmit}>
        <input
          id="finder"
          type="text"
          placeholder="오늘의 식단"
          onChange={getFood}
        />
        <input type="submit" value="음식 검색" id="searchBtn" />
      </form>

      <form id="selectForm" onSubmit={onselect}>
        <select id="select" onChange={getselect}>
          {foods &&
            foods.map((item, index) => (
              <option
                value={JSON.stringify([
                  item.DESC_KOR,
                  item.NUTR_CONT1,
                  item.NUTR_CONT2,
                  item.NUTR_CONT3,
                  item.NUTR_CONT4,
                ])}
              >
                {item.DESC_KOR}
              </option>
            ))}
        </select>
        <input
          id="foodGram"
          type="number"
          placeholder="그램(g)"
          min="100"
          max="1000"
          step="50"
          onChange={getGram}
        />

        <select onChange={getTime}>
          <option value="breakfast">아침</option>
          <option value="lunch">점심</option>
          <option value="dinner">저녁</option>
          <option value="snacks">간식</option>
          <option value="nights">야식</option>
        </select>
        <input type="submit" value="칼로리 계산" id="gramBtn" />
      </form>
      <div id="infoBox">
        <h1>
          {Fname} ({gram}g)
        </h1>
        <h2>
          칼로리: {((parseFloat(cal) * parseFloat(gram)) / 100).toFixed(2)} cal
        </h2>
        <h2>
          탄수화물:{((parseFloat(carbs) * parseFloat(gram)) / 100).toFixed(2)} g
        </h2>
        <h2>
          단백질:{((parseFloat(protein) * parseFloat(gram)) / 100).toFixed(2)} g
        </h2>
        <h2>
          지방:{((parseFloat(fat) * parseFloat(gram)) / 100).toFixed(2)} g
        </h2>
      </div>

      <form>
        <button type="submit" onClick={setItems}>
          식단 추가
        </button>
      </form>

      <SumFood />
    </div>
  );
};

export default Finder;
