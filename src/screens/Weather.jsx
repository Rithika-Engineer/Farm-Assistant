import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../LanguageContext";
import bgImage from "../assets/image copy 3.png"; // ✅ BACKGROUND IMAGE

const API_KEY = "5b5ff156792b20ec190acb8be8302c57";

export default function Weather(){

  const { lang } = useLanguage();
  const t = lang === "ta";
  const navigate = useNavigate();

  const [data,setData] = useState(null);
  const [loading,setLoading] = useState(true);

  // ---------- TEXT TO SPEECH ----------
  function speak(text){
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = t ? "ta-IN" : "en-US";
    window.speechSynthesis.speak(speech);
  }

  // ---------- GET WEATHER ----------
  async function getWeather(lat,lon){
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    return await res.json();
  }

  // ---------- ON LOAD ----------
  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(async(pos)=>{
      const w = await getWeather(pos.coords.latitude,pos.coords.longitude);
      setData(w);
      setLoading(false);

      const msg = t
        ? `இன்றைய வெப்பநிலை ${Math.round(w.main.temp)} டிகிரி செல்சியஸ்`
        : `Today's temperature is ${Math.round(w.main.temp)} degree Celsius`;

      speak(msg);
    });
  },[]);

  if(loading) return (
    <div style={styles.screen}>
      <div style={styles.bgOverlay}></div>
      <div style={styles.box}>Loading...</div>
    </div>
  );

  const temp = Math.round(data.main.temp);
  const hum = data.main.humidity;
  const wind = data.wind.speed;
  const rain = data.weather[0].main === "Rain";

  return(
    <div style={styles.screen}>

      {/* GREEN OVERLAY */}
      <div style={styles.bgOverlay}></div>

      <div style={styles.box}>

        <h2 style={{textAlign:"center",color:"#0a6b2a"}}>
          {t?"வானிலை தகவல்":"Weather Report"}
        </h2>

        <div style={styles.hero}>
          <div style={{fontSize:42}}>🌤</div>
          <h1>{temp}°C</h1>
          <p>{data.weather[0].description}</p>
          <p>📍 {data.name}</p>
        </div>

        <div style={styles.cards}>
          <div style={styles.card}>💧 {t?"ஈரப்பதம்":"Humidity"}: {hum}%</div>
          <div style={styles.card}>🌬 {t?"காற்று":"Wind"}: {wind} km/h</div>
          <div style={styles.card}>🌧 {t?"மழை நிலை":"Rain"}: {rain ? "Yes" : "No"}</div>
        </div>

        {/* WEATHER ADVICE */}
        <div style={styles.advice}>
          {rain
            ? (t?"இன்று தெளிப்பு செய்ய வேண்டாம் — மழை வாய்ப்பு உள்ளது"
                 :"Avoid spraying today — rain expected")
            : (t?"சாகுபடி பணிக்கு நல்ல வானிலை"
                 :"Good weather for field work")}
        </div>

        {/* CROP ADVICE */}
        <div style={styles.advice2}>
          {temp>32
            ? (t?"அதிக வெப்பம் — அதிக நீர்ப்பாய்ச்சி செய்யவும்"
                 :"High heat — Increase irrigation")
            : (t?"சாதாரண வெப்பம் — பயிர் வளர்ச்சிக்கு உகந்தது"
                 :"Normal temperature — good for crops")}
        </div>

        {/* PLAY VOICE */}
        <button style={styles.voice}
          onClick={()=>speak(
            t?`இன்றைய வெப்பநிலை ${temp} டிகிரி, ஈரப்பதம் ${hum} சதவீதம்`
             :`Today's temperature ${temp} degrees and humidity ${hum} percent`
          )}
        >
          🔊 {t?"குரலில் கேட்க":"Play Voice"}
        </button>

        {/* BACK */}
        <button style={styles.back}
          onClick={()=>navigate("/home")}
        >
          ⬅ {t?"முதற்பக்கத்திற்கு":"Back to Home"}
        </button>

      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const styles={

  /* ✅ FULL SCREEN BACKGROUND */
  screen:{
    width:"100vw",
    height:"100vh",
    position:"fixed",
    top:0,
    left:0,

    backgroundImage:`url(${bgImage})`,
    backgroundSize:"cover",
    backgroundPosition:"center",
    backgroundRepeat:"no-repeat",

    display:"flex",
    justifyContent:"center",
    alignItems:"center"
  },

  /* GREEN OVERLAY */
  bgOverlay:{
    position:"absolute",
    inset:0,
    background:"rgba(0,80,30,0.45)",
    zIndex:1
  },

  /* MAIN BOX */
  box:{
    position:"relative",
    zIndex:2,

    width:"100%",
    maxWidth:"500px",
    background:"rgba(91, 237, 96, 0.85)",
    padding:16,
    borderRadius:18,
    boxShadow:"0 12px 35px rgba(0,0,0,.35)"
  },

  hero:{
    textAlign:"center",
    padding:10,
    borderRadius:14,
    background:"rgba(0,0,0,0.35)",
    color:"white"
  },

  cards:{
    marginTop:10
  },

  card:{
    background:"rgba(0,0,0,0.4)",
    padding:8,
    borderRadius:10,
    marginBottom:6,
    color:"white"
  },

  advice:{
    background:"#ffef9e",
    color:"black",
    padding:10,
    borderRadius:12,
    marginTop:10,
    fontWeight:"bold"
  },

  advice2:{
    background:"#12c30fff",
    color:"black",
    padding:10,
    borderRadius:12,
    marginTop:8
  },

  voice:{
    width:"100%",
    padding:10,
    marginTop:10,
    borderRadius:10,
    border:"none",
    background:"rgb(22, 177, 74)",
    color:"white",
    fontWeight:"bold"
  },

  back:{
    width:"100%",
    padding:10,
    marginTop:8,
    borderRadius:10,
    border:"none",
    background:"#10ce43ff",
    color:"white",
    fontWeight:"bold"
  }
};
