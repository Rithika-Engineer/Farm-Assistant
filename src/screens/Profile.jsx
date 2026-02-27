import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../LanguageContext";
import bgImage from "../assets/agricultureimg.png"; // ✅ SAME BG IMAGE

export default function Profile() {

  const { lang } = useLanguage();
  const navigate = useNavigate();

  const [farmerName, setFarmerName] = useState("");
  const [village, setVillage] = useState("");
  const [land, setLand] = useState("");
  const [crop, setCrop] = useState("");
  const [phone, setPhone] = useState("");

  const saveProfile = () => {

    localStorage.setItem("farmerName", farmerName);
    localStorage.setItem("village", village);
    localStorage.setItem("land", land);
    localStorage.setItem("crop", crop);
    localStorage.setItem("phone", phone);

    alert(
      lang === "ta"
        ? "சுயவிவரம் வெற்றிகரமாக சேமிக்கப்பட்டது"
        : "Profile saved successfully"
    );

    navigate("/home");
  };

  return (
    <div style={styles.screen}>   {/* ✅ BACKGROUND IMAGE HERE */}

      {/* GREEN OVERLAY */}
      <div style={styles.bgOverlay}></div>

      {/* CARD */}
      <div style={styles.card}>

        {/* LIGHT WHITE OVERLAY */}
        <div style={styles.overlay}></div>

        <div style={{ position: "relative" }}>

          <h2 style={styles.title}>
            {lang === "ta" ? "விவசாயி சுயவிவரம்" : "Farmer Profile"}
          </h2>

          <label style={styles.label}>
            {lang === "ta" ? "பெயர்" : "Name"}
          </label>
          <input
            style={styles.input}
            value={farmerName}
            onChange={(e) => setFarmerName(e.target.value)}
            placeholder={lang === "ta" ? "உங்கள் பெயர்" : "Enter your name"}
          />

          <label style={styles.label}>
            {lang === "ta" ? "கிராமம் / இடம்" : "Village / Location"}
          </label>
          <input
            style={styles.input}
            value={village}
            onChange={(e) => setVillage(e.target.value)}
            placeholder={lang === "ta" ? "கிராமத்தின் பெயர்" : "Village name"}
          />

          <label style={styles.label}>
            {lang === "ta" ? "நில அளவு (ஏக்கர்)" : "Land Size (acres)"}
          </label>
          <input
            style={styles.input}
            value={land}
            onChange={(e) => setLand(e.target.value)}
            placeholder={lang === "ta" ? "உதா: 2.5" : "Eg: 2.5"}
          />

          <label style={styles.label}>
            {lang === "ta" ? "பயிர் வகை" : "Crop Type"}
          </label>
          <input
            style={styles.input}
            value={crop}
            onChange={(e) => setCrop(e.target.value)}
            placeholder={lang === "ta" ? "உதா: நெல்" : "Eg: Paddy"}
          />

          <label style={styles.label}>
            {lang === "ta" ? "தொலைபேசி எண் (விருப்பம்)" : "Phone (optional)"}
          </label>
          <input
            style={styles.input}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={lang === "ta" ? "உங்கள் எண்" : "Phone number"}
          />

          <button style={styles.button} onClick={saveProfile}>
            {lang === "ta" ? "சேமிக்கவும்" : "Save"}
          </button>

          <button style={styles.back} onClick={() => navigate(-1)}>
            ⬅ {lang === "ta" ? "பின்செல்லவும்" : "Back"}
          </button>

        </div>
      </div>

    </div>
  );
}

/* ================= STYLES ================= */

const styles = {

  /* ✅ FULL SCREEN BACKGROUND IMAGE */
  screen: {
    width: "100vw",
    height: "100vh",
    position: "fixed",
    top: 0,
    left: 0,

    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",

    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  /* GREEN BACKGROUND OVERLAY */
  bgOverlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(0, 80, 30, 0.45)",
    zIndex: 1
  },

  /* CARD WITH IMAGE */
  card:{
    position: "relative",
    zIndex: 2,

    width:"92%",
    maxWidth:"420px",
    borderRadius:"20px",
    padding:"22px",
    boxShadow:"0 8px 28px rgba(246, 233, 53, 0.35)"
  },

  /* WHITE TRANSPARENT LAYER */
  overlay:{
    position:"absolute",
    inset:0,
    borderRadius:"20px",
    background:"rgba(33, 125, 12, 0.75)"
  },

  title:{
    textAlign:"center",
    color:"#e5efe8",
    marginBottom:"12px",
    position:"relative"
  },

  label:{
    fontWeight:"bold",
    marginTop:"12px",
    display:"block",
    position:"relative"
  },

  input:{
    width:"90%",
    padding:"10px",
    borderRadius:"10px",
    border:"1px solid #bbb",
    marginTop:"5px",
    background:"#ffffff",
    position:"relative"
  },

  button:{
    width:"100%",
    marginTop:"18px",
    padding:"12px",
    borderRadius:"12px",
    border:"none",
    background:"#1fa34a",
    color:"white",
    fontWeight:"bold",
    fontSize:"17px",
    cursor:"pointer",
    position:"relative"
  },

  back:{
    width:"100%",
    marginTop:"10px",
    padding:"10px",
    borderRadius:"10px",
    border:"none",
    background:"#2e7d32",
    color:"white",
    fontWeight:"bold",
    cursor:"pointer",
    position:"relative"
  }
};
