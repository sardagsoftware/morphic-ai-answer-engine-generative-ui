"use client";
import React, { useEffect, useState } from "react";

const API_URL = "https://api.exchangerate.host/latest?base=USD&symbols=EUR,TRY";
const GOLD_API = "https://api.genelpara.com/embed/altin.json";
const OIL_API = "https://api.oilpriceapi.com/v1/prices/latest"; // Demo amaçlı, gerçek API anahtarı gerekir
const WEATHER_API = "https://wttr.in/?format=%C+%t";

export default function InfoTicker() {
  const [rates, setRates] = useState({ USD: 0, EUR: 0, TRY: 0 });
  const [gold, setGold] = useState("");
  const [oil, setOil] = useState("");
  const [weather, setWeather] = useState("");

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setRates({ USD: 1, EUR: data.rates.EUR, TRY: data.rates.TRY });
      });
    fetch(GOLD_API)
      .then(res => res.json())
      .then(data => {
        setGold(data.hasOwnProperty("GA") ? data.GA.satis : "");
      });
    fetch(WEATHER_API)
      .then(res => res.text())
      .then(data => setWeather(data));
    // Petrol fiyatı demo, API anahtarı gerektirir
    // setOil("85.20 USD");
  }, []);

  return (
    <div className="w-full flex flex-row items-center justify-center bg-gradient-to-r from-gray-100 to-gray-300 py-2 px-2 text-xs md:text-base font-semibold overflow-x-auto whitespace-nowrap shadow-md rounded mb-2" style={{minHeight:40}}>
      <span className="mx-2">Hava: {weather}</span>
      <span className="mx-2">Dolar: {rates.USD} USD</span>
      <span className="mx-2">Euro: {rates.EUR.toFixed(2)} EUR</span>
      <span className="mx-2">TL: {rates.TRY.toFixed(2)} TL</span>
      <span className="mx-2">Altın: {gold} TL</span>
      <span className="mx-2">Petrol: {oil || "85.20 USD"}</span>
    </div>
  );
}
