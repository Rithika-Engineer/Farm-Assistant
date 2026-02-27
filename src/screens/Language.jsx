import { useLanguage } from "../LanguageContext";
import { useNavigate } from "react-router-dom";

/* ✅ WINDOWS PATH NOT USED
   ✅ PROJECT RELATIVE IMPORT USED */
import bgImage from "../assets/agricultureimg.png";

export default function Language() {

  const { lang, changeLang } = useLanguage();
  const navigate = useNavigate();

  function tamil() { changeLang("ta"); }
  function english() { changeLang("en"); }
  function goNext() { navigate("/profile"); }
  function goBack() { navigate(-1); }

  return (
    <div style={styles.screen}>

      <div style={styles.overlay}></div>

      <div style={styles.box}>
        <h2>
          {lang === "ta" ? "மொழியை தேர்வு செய்க" : "Select Language"}
        </h2>

        <button style={styles.btn} onClick={tamil}>தமிழ்</button>
        <button style={styles.btn} onClick={english}>English</button>

        <p style={{ fontWeight: "bold" }}>
          {lang === "ta" ? "தேர்ந்தெடுத்த மொழி: தமிழ்" : "Selected: English"}
        </p>

        <button style={styles.next} onClick={goNext}>
          {lang === "ta" ? "தொடரவும்" : "Continue"}
        </button>
      </div>

      <button style={styles.backBtn} onClick={goBack}>
        ← Back
      </button>

    </div>
  );
}

/* ================= STYLES ================= */

const styles = {

  /* ✅ BACKGROUND IMAGE SET HERE */
  screen: {
  width: "100vw",          // ✅ full desktop width
  height: "100vh",         // ✅ full desktop height

  backgroundImage: `url(${bgImage})`,
  backgroundSize: "cover", // fill screen
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center",

  position: "fixed",       // ✅ IMPORTANT
  top: 0,
  left: 0,

  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}
,

  overlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(0, 90, 40, 0.45)",
    zIndex: 1
  },

  box: {
    position: "relative",
    zIndex: 2,
    background: "#57f581ff",
    padding: 22,
    borderRadius: 18,
    width: 380,
    textAlign: "center",
    boxShadow: "0 12px 30px rgba(0,0,0,.35)"
  },

  btn: {
    width: "100%",
    padding: 12,
    marginBottom: 10,
    borderRadius: 12,
    fontWeight: "bold",
    background: "rgb(14, 130, 45)"
  },

  next: {
    width: "100%",
    padding: 12,
    marginTop: 10,
    borderRadius: 12,
    fontWeight: "bold",
    background: "rgb(12, 130, 43)",
    color: "white"
  },

  backBtn: {
    position: "fixed",
    bottom: 100,
    left: "50%",
    transform: "translateX(-50%)",
    padding: "10px 22px",
    borderRadius: 24,
    border: "none",
    fontWeight: "bold",
    background: "white",
    cursor: "pointer",
    zIndex: 3
  }
};
