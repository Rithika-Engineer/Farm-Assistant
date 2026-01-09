import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../LanguageContext";

export default function Home(){

  const { lang } = useLanguage();
  const t = lang === "ta";

  const [farmerName,setFarmerName] = useState("");
  const [village,setVillage] = useState("");
  const [land,setLand] = useState("");
  const [crop,setCrop] = useState("");

  const navigate = useNavigate();

  useEffect(()=>{
    setFarmerName(localStorage.getItem("farmerName") || "");
    setVillage(localStorage.getItem("village") || "");
    setLand(localStorage.getItem("land") || "");
    setCrop(localStorage.getItem("crop") || "");
  },[]);


  return(
    <div style={styles.page}>

      {/* APP CARD */}
      <div style={styles.appBox}>

        {/* TITLE */}
        <div style={styles.title}>
          {t ? "விவசாயி உதவியாளர்" : "Farmer Assistant"}
        </div>

        {/* PROFILE */}
        <div style={styles.profile}>
          <h3>{t ? "வணக்கம்" : "Hello"} {farmerName || (t?"விவசாயி":"Farmer")} 🙂</h3>

          <p>🏡 {t?"கிராமம்":"Village"} : {village || "-"}</p>
          <p>🌾 {t?"நில அளவு":"Land Size"} : {land || "-"}</p>
          <p>🌱 {t?"பயிர்":"Crop"} : {crop || "-"}</p>

          <button style={styles.editBtn} onClick={()=>navigate("/profile")}>
            {t?"விவரத்தை மாற்ற":"Edit Details"}
          </button>
        </div>

        {/* MENU BUTTON GRID */}
        <div style={styles.grid}>

          <button style={styles.btn} onClick={()=>navigate("/weather")}>🌥 {t?"வானிலை":"Weather"}</button>
          <button style={styles.btn} onClick={()=>navigate("/natural")}>🌾 {t?"இயற்கை வேளாண்மை":"Natural Farming"}</button>

          <button style={styles.btn} onClick={()=>navigate("/pesticide")}>🪴 {t?"பூச்சி கட்டுப்பாடு":"Pest Control"}</button>
          <button style={styles.btn} onClick={()=>navigate("/profit")}>💰 {t?"லாபம் கணக்கு":"Profit Calculator"}</button>

          <button style={styles.btn} onClick={()=>navigate("/market")}>🏪 {t?"சந்தை விலை":"Market Price"}</button>
          <button style={styles.btn} onClick={()=>navigate("/schemes")}>📚 {t?"அரசு திட்டங்கள்":"Govt Schemes"}</button>

          <button style={styles.btn} onClick={()=>navigate("/videos")}>🎥 {t?"கற்றல் வீடியோ":"Learning Videos"}</button>
          <button style={styles.btn} onClick={()=>navigate("/jobs")}>👨‍🌾 {t?"வேலை வாய்ப்புகள்":"Job Opportunities"}</button>

          <button style={styles.btn} onClick={()=>navigate("/chat")}>🤖 {t?"AI உதவி":"AI Assistant"}</button>
          <button style={styles.btn} onClick={()=>navigate("/assistant")}>🎙 {t?"குரல் உதவி":"Voice Assistant"}</button>

          <button style={styles.btn} onClick={()=>navigate("/cropplanner")}>🌱 {t?"பயிர் திட்டம்":"Crop Planner"}</button>
          <button style={styles.btn} onClick={()=>navigate("/season")}>📅 {t?"பருவ பயிர் வழிகாட்டி":"Season Crop Guide"}</button>

        </div>

        {/* BOTTOM BACK BUTTON */}
        <button style={styles.bottomBack} onClick={()=>navigate(-1)}>
          ⬅ {t?"பின்செல்":"Back"}
        </button>

      </div>
    </div>
  );
}



const styles={

  page:{
    minHeight:"100vh",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    background:"#e8ffe8"
  },

  appBox:{
    width:"100%",
    maxWidth:"480px",
    borderRadius:"20px",
    padding:"15px",
    boxShadow:"0 15px 35px rgba(0,0,0,.25)",
    backgroundImage:`url("https://images.unsplash.com/photo-1501004318641-b39e6451bec6")`,
    backgroundSize:"cover",
    backgroundPosition:"center"
  },

  title:{
    background:"rgba(0,120,30,.9)",
    color:"white",
    padding:"12px",
    textAlign:"center",
    borderRadius:"10px",
    fontWeight:"bold",
    fontSize:"20px"
  },

  profile:{
    background:"#29cf3c",
    marginTop:"12px",
    padding:"14px",
    borderRadius:"15px"
  },

  editBtn:{
    marginTop:"8px",
    padding:"8px 14px",
    borderRadius:"8px",
    border:"none",
    color:"white",
    background:"#0a8d2c"
  },

  grid:{
    display:"grid",
    gridTemplateColumns:"1fr 1fr",
    gap:"12px",
    marginTop:"14px"
  },

  btn:{
    padding:"10px",
    borderRadius:"12px",
    border:"none",
    background:"#29cf3c",
    fontWeight:"bold",
    fontSize:"13px",
    color:"#000"
  },

  bottomBack:{
    width:"90%",
    margin:"18px auto 5px auto",
    display:"block",
    padding:"12px",
    border:"none",
    borderRadius:"14px",
    background:"#0a8d2c",
    color:"white",
    fontWeight:"bold",
    fontSize:"15px",
    boxShadow:"0 3px 10px rgba(0,0,0,.25)",
    cursor:"pointer"
  }
};
