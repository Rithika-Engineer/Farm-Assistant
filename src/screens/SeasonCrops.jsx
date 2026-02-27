import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../LanguageContext";

/* ✅ BACKGROUND IMAGE */
import bgImage from "../assets/agricultureimg.png";

export default function SeasonCrops(){

  const { lang } = useLanguage();
  const t = lang === "ta";

  const navigate = useNavigate();

  const [season, setSeason] = useState("");
  const [crop, setCrop] = useState("");
  const [lastCrop, setLastCrop] = useState("");

  function T(en, ta){
    return t ? ta : en;
  }

  function cropName(n){
    const ta = {
      Paddy:"நெல்",
      Maize:"சோளம்",
      Groundnut:"நிலக்கடலை",
      Soybean:"சோயாபீன்",
      Cotton:"பருத்தி",
      Chilli:"மிளகாய்",
      Wheat:"கோதுமை",
      Mustard:"கடுகு",
      Watermelon:"தர்பூசணி",
      Sesame:"எள்",
      Onion:"வெங்காயம்",
      Peas:"பட்டாணி"
    };
    return t ? (ta[n] || n) : n;
  }

  useEffect(()=>{
    const m = new Date().getMonth()+1;
    if(m>=6 && m<=10) setSeason("kharif");
    else if(m>=11 || m<=2) setSeason("rabi");
    else setSeason("summer");

    const last = localStorage.getItem("lastCrop");
    if(last) setLastCrop(last);
  },[]);

  const crops={
    kharif:["Paddy","Maize","Groundnut","Cotton","Soybean","Chilli"],
    rabi:["Wheat","Mustard","Onion","Peas","Gram"],
    summer:["Watermelon","Sesame","Green gram","Cowpea"]
  };

  const cropInfo={
    Paddy:{soil:T("Clay / Loamy","மண்ணாறு / கரிமண்"),water:T("High","அதிகம்"),days:T("120–150 days","120–150 நாட்கள்"),
      fert:T("Nitrogen important","நைட்ரஜன் முக்கியம்"),next:T("Pulses / Sesame","பருப்பு / எள்"),
      speak:T("நெல் பயிருக்கு அதிக நீர் தேவைப்படுகிறது")},
    Maize:{soil:T("Well drained","நன்றாக வடிகாலம்"),water:T("Medium","மிதமானது"),days:T("90–110 days","90–110 நாட்கள்"),
      fert:T("Balanced NPK","NPK சமநிலை"),next:T("Green gram","பச்சைப்பயறு"),
      speak:T("சோளம் நல்ல வருமானம் தரும் பயிர்")}
  };

  function speakText(txt){
    if(!window.speechSynthesis) return;
    const msg = new SpeechSynthesisUtterance(txt);
    msg.lang = t ? "ta-IN" : "en-IN";
    window.speechSynthesis.speak(msg);
  }

  return(
    <div style={styles.screen}>

      <div style={styles.overlay}></div>

      <div style={styles.box}>

        <h2>{T("Season-wise Crop Guide","பருவப்படி பயிர் வழிகாட்டி")}</h2>

        <select style={styles.input} value={season} onChange={e=>setSeason(e.target.value)}>
          <option value="kharif">{T("Kharif (Jun–Oct)","காரிஃப்")}</option>
          <option value="rabi">{T("Rabi (Nov–Feb)","ரபி")}</option>
          <option value="summer">{T("Summer (Mar–May)","வெயில்")}</option>
        </select>

        <div style={styles.card}>
          <h3>{T("Recommended Crops","பரிந்துரைக்கப்பட்ட பயிர்கள்")}</h3>

          {crops[season]?.map(c=>(
            <div key={c} style={styles.crop}
              onClick={()=>{setCrop(c);localStorage.setItem("lastCrop",c);setLastCrop(c);}}>
              🌾 {cropName(c)}
            </div>
          ))}
        </div>

        {crop && (
          <div style={styles.card}>
            <h3>🌾 {cropName(crop)}</h3>

            <p>🌍 {T("Soil","மண்")}: {cropInfo[crop]?.soil}</p>
            <p>💧 {T("Water","நீர்")}: {cropInfo[crop]?.water}</p>
            <p>⏳ {T("Days","நாட்கள்")}: {cropInfo[crop]?.days}</p>
            <p>🧴 {T("Fertilizer","உரம்")}: {cropInfo[crop]?.fert}</p>
            <p>🌱 {T("Next Crop","அடுத்த பயிர்")}: {cropInfo[crop]?.next}</p>

            {lastCrop===crop && (
              <p style={{color:"red"}}>
                ⚠ {T("Avoid same crop repeatedly","ஒரே பயிர் தவிர்க்கவும்")}
              </p>
            )}

            <button style={styles.voice}
              onClick={()=>speakText(cropInfo[crop]?.speak)}>
              🎤 {T("Play Voice","ஒலி")}
            </button>
          </div>
        )}

        <button style={styles.back} onClick={()=>navigate("/home")}>
          ⬅ {T("Back to Home","முகப்பு")}
        </button>

      </div>
    </div>
  );
}

/* ---------- STYLES ---------- */
const styles={

  /* ✅ FULL SCREEN BACKGROUND */
  screen:{
    position:"fixed",
    inset:0,
    backgroundImage:`url(${bgImage})`,
    backgroundSize:"cover",
    backgroundPosition:"center",
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
  },

  overlay:{
    position:"absolute",
    inset:0,
    background:"rgba(0,100,0,0.6)"
  },

  box:{
    position:"relative",
    zIndex:2,
    width:"100%",
    maxWidth:550,
    maxHeight:"85vh",
    overflowY:"auto",
    background:"rgb(11, 159, 51)",
    padding:18,
    borderRadius:20,
    boxShadow:"0 15px 40px rgba(0,0,0,.15)"
  },

  input:{width:"100%",padding:10,borderRadius:10,marginBottom:12},

  card:{background:"#1ed31e",padding:12,borderRadius:14,marginBottom:12},

  crop:{padding:10,background:"#dfffdc",borderRadius:10,marginBottom:6,cursor:"pointer"},

  voice:{width:"100%",padding:10,borderRadius:10,border:"none",background:"#2196f3",color:"white"},

  back:{width:"100%",padding:10,borderRadius:12,border:"none",
    background:"#0a8d2c",color:"white",fontWeight:"bold"}
};
