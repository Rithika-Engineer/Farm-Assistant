import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../LanguageContext";
import bgImage from "../assets/agricultureimg.png";

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

  return (
    <>
      {/* ✅ FULL SCREEN BACKGROUND IMAGE */}
      <div style={styles.bg}></div>

      {/* ✅ SCROLLABLE CONTENT */}
      <div style={styles.content}>

        <div style={styles.container}>

          <div style={styles.title}>
            {t ? "விவசாயி உதவியாளர்" : "Farmer Assistant"}
          </div>

          <div style={styles.profile}>
            <h3>
              {t ? "வணக்கம்" : "Hello"}{" "}
              {farmerName || (t ? "விவசாயி" : "Farmer")} 🙂
            </h3>
            <p>🏡 {t?"கிராமம்":"Village"} : {village || "-"}</p>
            <p>🌾 {t?"நில அளவு":"Land Size"} : {land || "-"}</p>
            <p>🌱 {t?"பயிர்":"Crop"} : {crop || "-"}</p>

            <button style={styles.editBtn} onClick={()=>navigate("/profile")}>
              {t?"விவரத்தை மாற்ற":"Edit Details"}
            </button>
          </div>

          <div style={styles.grid}>
            <button style={styles.btn} onClick={()=>navigate("/weather")}>🌥 Weather</button>
            <button style={styles.btn} onClick={()=>navigate("/natural")}>🌾 Natural</button>
            <button style={styles.btn} onClick={()=>navigate("/pesticide")}>🪴 Pest</button>
            <button style={styles.btn} onClick={()=>navigate("/profit")}>💰 Profit</button>
            <button style={styles.btn} onClick={()=>navigate("/market")}>🏪 Market</button>
            <button style={styles.btn} onClick={()=>navigate("/schemes")}>📚 Schemes</button>
            <button style={styles.btn} onClick={()=>navigate("/videos")}>🎥 Videos</button>
            <button style={styles.btn} onClick={()=>navigate("/jobs")}>👨‍🌾 Jobs</button>
            <button style={styles.btn} onClick={()=>navigate("/chat")}>🤖 AI</button>
            <button style={styles.btn} onClick={()=>navigate("/assistant")}>🎙 Voice</button>
            <button style={styles.btn} onClick={()=>navigate("/cropplanner")}>🌱 Planner</button>
            <button style={styles.btn} onClick={()=>navigate("/season")}>📅 Season</button>
          </div>

          <button style={styles.helpBtn} onClick={()=>navigate("/help")}>
            🆘 Help / Helpline
          </button>

          <button style={styles.backBtn} onClick={()=>navigate(-1)}>
            ⬅ {t?"பின்செல்":"Back"}
          </button>

        </div>
      </div>
    </>
  );
}

/* ================= STYLES ================= */

const styles = {

  /* ✅ FULL SCREEN IMAGE */
  bg:{
    position:"fixed",
    inset:0,
    backgroundImage:`url(${bgImage})`,
    backgroundSize:"cover",
    backgroundPosition:"center",
    backgroundRepeat:"no-repeat",
    zIndex:-1,
    
  },

  /* ✅ SCROLL ENABLED */
  content:{
    minHeight:"100vh",
    padding:"20px 0",
    overflowY:"auto"
  },


  mobile:{
    position:"relative",
    zIndex:2,
    width:"100%",
    maxWidth:600,
    height:"85vh",
    overflowY:"auto",
    background:"#19b219",
    borderRadius:22,
    padding:16,
    boxShadow:"0 18px 40px rgba(0,0,0,.25)"
  },

  title:{
    background:"#0b7a2b",
    color:"white",
    padding:12,
    textAlign:"center",
    borderRadius:10,
    fontWeight:"bold",
    fontSize:20
  },

  profile:{
    background:"#0da91f",
    marginTop:12,
    padding:14,
    borderRadius:15
  },

  editBtn:{
    marginTop:8,
    padding:"8px 14px",
    borderRadius:8,
    border:"none",
    background:"#0a8d2c",
    color:"white"
  },

  grid:{
    display:"grid",
    gridTemplateColumns:"1fr 1fr",
    gap:12,
    marginTop:14
  },

  btn:{
    padding:10,
    borderRadius:12,
    border:"none",
    background:"#179d26",
    fontWeight:"bold"
  },

  helpBtn:{
    width:"100%",
    marginTop:12,
    padding:12,
    borderRadius:14,
    background:"#147914",
    color:"white",
    fontWeight:"bold",
    border:"none"
  },

  backBtn:{
    width:"100%",
    marginTop:14,
    padding:12,
    borderRadius:14,
    background:"#0a8d2c",
    color:"white",
    fontWeight:"bold",
    border:"none"
  }
};
