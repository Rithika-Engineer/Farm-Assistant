import { useNavigate } from "react-router-dom";
import { useLanguage } from "../LanguageContext";
import logo from "../assets/logo.png";
import bgImage from "../assets/image copy 2.png"; // ✅ BACKGROUND IMAGE

export default function Welcome() {

  const { lang } = useLanguage();
  const t = lang === "ta";
  const navigate = useNavigate();

  return (
    <div style={styles.screen}>

      {/* Green overlay */}
      <div style={styles.overlay}></div>

      {/* Mobile Card */}
      <div style={styles.mobile}>

        {/* LOGO */}
        <div style={styles.logoCircle}>
          <img src={logo} alt="App Logo" style={{ width: 70 }} />
        </div>

        {/* APP NAME */}
        <div style={styles.title}>
          {t ? "விவசாய உதவி" : "Farmer Assistant"}
        </div>

        {/* SUB TEXT */}
        <div style={styles.sub}>
          {t
            ? "இயற்கை வேளாண்மை • வானிலை • வழிகாட்டுதல்"
            : "Natural Farming • Weather • Support"}
        </div>

        {/* BUTTON */}
        <button
          style={styles.btn}
          onClick={() => navigate("/language")}
        >
          {t ? "தொடங்கு" : "Get Started"}
        </button>

      </div>

    </div>
  );
}

/* ================= STYLES ================= */

const styles = {

  /* ✅ FULL SCREEN BACKGROUND */
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

  /* GREEN OVERLAY */
  overlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(0, 90, 40, 0.45)",
    zIndex: 1
  },

  /* MOBILE CARD */
  mobile:{
    position: "relative",
    zIndex: 2,

    width: 380,
    background: "#4be352ff",
    borderRadius: 22,
    boxShadow: "0 18px 45px rgba(0,0,0,.18)",
    padding: 20,
    textAlign: "center"
  },

  logoCircle:{
    width: 90,
    height: 90,
    background: "#2acb32ff",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "20px auto"
  },

  title:{
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10
  },

  sub:{
    color: "#555",
    marginTop: 6,
    marginBottom: 30
  },

  btn:{
    background: "green",
    color: "white",
    padding: 14,
    borderRadius: 16,
    fontSize: 16,
    border: "none",
    width: "100%"
  }
};
