import React from "react";
import { useLanguage } from "../LanguageContext";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/agricultureimg.png";

export default function Help() {

  const { lang } = useLanguage();
  const t = lang === "ta";
  const navigate = useNavigate();

  return (
    <div style={styles.screen}>

      {/* 🌫 Overlay */}
      <div style={styles.overlay}></div>

      {/* 📦 CENTER CARD (SCROLLABLE) */}
      <div style={styles.mobile}>

        {/* ⭐ FOR FARMERS WITHOUT SMARTPHONE ⭐ */}
        <div style={styles.infoBox}>
          <h3>
            {t
              ? "💚 ஸ்மார்ட்போன் இல்லாத விவசாயிகளும் உதவி பெறலாம்"
              : "💚 Farmers without smartphones can also get help"}
          </h3>

          <p style={styles.text}>
            {t
              ? "இந்த எண்ணை உங்கள் கைப்பேசியில் சேமித்து வையுங்கள்:"
              : "Save this number in your phone:"}
          </p>

          <h2>📞 1800-180-1551</h2>

          <p style={styles.text}>
            {t
              ? "இணையம் இல்லாமலும் எந்த கைப்பேசியில் இருந்தும் அழைக்கலாம்"
              : "You can call from any phone — even without internet"}
          </p>

          <a href="tel:18001801551" style={styles.callBtn}>
            {t ? "இப்போதே அழைக்கவும்" : "Call Now"}
          </a>

          <div style={styles.menuBox}>
            <p style={styles.text}>
              {t
                ? "அழைத்த பிறகு நீங்கள் தேர்வு செய்யலாம்:"
                : "After calling, you can choose:"}
            </p>

            <ul>
              <li>{t ? "1 — வானிலை தகவல்" : "1 — Weather Info"}</li>
              <li>{t ? "2 — இயற்கை வேளாண்மை ஆலோசனை" : "2 — Natural Farming Guide"}</li>
              <li>{t ? "3 — சந்தை விலை" : "3 — Market Prices"}</li>
              <li>{t ? "4 — அரசு திட்டங்கள்" : "4 — Government Schemes"}</li>
            </ul>
          </div>
        </div>

        {/* ⭐ GOVERNMENT HELPLINE ⭐ */}
        <div style={styles.card}>
          <h3>{t ? "🎯 அரசு விவசாயி ஹெல்ப்லைன்" : "🎯 Farmer Government Helpline"}</h3>

          <p style={styles.text}>
            {t
              ? "விவசாய ஆலோசனை, பயிர் பிரச்சினைகள், திட்ட உதவி"
              : "Crop help, guidance & scheme support"}
          </p>

          <h2>📞 1800-180-1551</h2>

          <a href="tel:18001801551" style={styles.callBtnSmall}>
            {t ? "அழைக்கவும்" : "Call"}
          </a>
        </div>

        {/* ⭐ DISTRICT OFFICE ⭐ */}
        <div style={styles.card}>
          <h3>{t ? "🏛 மாவட்ட விவசாய அலுவலகம்" : "🏛 District Agriculture Office"}</h3>

          <p style={styles.text}>
            {t
              ? "உங்கள் பகுதியில் உள்ள அதிகாரிகளை தொடர்பு கொள்ளுங்கள்"
              : "Contact agriculture officers near you"}
          </p>

          <a href="tel:1967" style={styles.callBtnSmall}>
            📞 1967
          </a>
        </div>

        {/* 🔙 BACK BUTTON (BOTTOM – FIXED INSIDE SCROLL) */}
        <button
          style={styles.back}
          onClick={() => navigate("/home")}
        >
          ⬅ {t ? "முகப்பு" : "Back to Home"}
        </button>

      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {

  screen:{
    width:"100vw",
    height:"100vh",
    backgroundImage:`url(${bgImage})`,
    backgroundSize:"cover",
    backgroundPosition:"center",
    backgroundRepeat:"no-repeat",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    position:"fixed",
    top:0,
    left:0
  },

  overlay:{
    position:"absolute",
    inset:0,
    background:"rgba(0,90,40,0.55)",
    zIndex:1
  },

  mobile:{
    position:"relative",
    zIndex:2,
    width:"100%",
    maxWidth:600,
    height:"90vh",
    overflowY:"auto",
    background:"#19b219",
    borderRadius:22,
    padding:16,
    boxShadow:"0 18px 40px rgba(0,0,0,.25)"
  },

  infoBox:{
    background:"#ffffff",
    padding:16,
    borderRadius:16,
    marginBottom:14
  },

  card:{
    background:"#ffffff",
    padding:16,
    borderRadius:16,
    marginBottom:12
  },

  text:{
    opacity:.85,
    lineHeight:"22px"
  },

  callBtn:{
    display:"block",
    marginTop:12,
    textAlign:"center",
    background:"#259125ff",
    color:"white",
    padding:12,
    borderRadius:12,
    fontWeight:"bold",
    textDecoration:"none"
  },

  callBtnSmall:{
    display:"inline-block",
    marginTop:8,
    background:"#259125ff",
    color:"white",
    padding:"8px 12px",
    borderRadius:10,
    textDecoration:"none"
  },

  menuBox:{
    marginTop:10
  },

  back:{
    width:"100%",
    marginTop:10,
    padding:12,
    borderRadius:14,
    border:"none",
    background:"#145a32",
    color:"white",
    fontWeight:"bold",
    cursor:"pointer"
  }
};
