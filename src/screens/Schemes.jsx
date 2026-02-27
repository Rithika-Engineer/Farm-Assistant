import { useState } from "react";
import { useLanguage } from "../LanguageContext";
import BottomNav from "../components/BottomNav";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/agricultureimg.png";

export default function Schemes(){

  const { lang } = useLanguage();
  const t = lang === "ta";
  const navigate = useNavigate();

  const [open, setOpen] = useState("");

  return(
    <div style={styles.screen}>

      {/* BACKGROUND OVERLAY */}
      <div style={styles.overlay}></div>

      {/* CONTENT */}
      <div style={styles.mobile}>

        <BottomNav />

        <h2>
          {t ? "அரசு திட்டங்கள் & காப்பீடு"
             : "Government Schemes & Insurance"}
        </h2>

        {/* ========== PM KISAN ========== */}
        <div style={styles.card}>
          <h3 onClick={()=>setOpen(open==="pm" ? "" : "pm")} style={styles.header}>
            🌾 PM-Kisan
          </h3>

          {open==="pm" && (
            <div>
              <p>{t?"ஆண்டுக்கு ரூ.6000 உதவி":"₹6000 yearly income support"}</p>
              <a href="https://pmkisan.gov.in" target="_blank" style={styles.link}>
                pmkisan.gov.in
              </a>
            </div>
          )}
        </div>

        {/* ========== PMFBY ========== */}
        <div style={styles.card}>
          <h3 onClick={()=>setOpen(open==="pmfby" ? "" : "pmfby")} style={styles.header}>
            🛡 PMFBY (Crop Insurance)
          </h3>

          {open==="pmfby" && (
            <div>
              <p>{t?"பயிர் சேதத்திற்கு காப்பீடு":"Insurance for crop loss"}</p>
              <p>{t?"பிரீமியம் குறைவு":"Low premium"}</p>
              <a href="https://pmfby.gov.in" target="_blank" style={styles.link}>
                pmfby.gov.in
              </a>
            </div>
          )}
        </div>

        {/* ========== SOIL HEALTH CARD ========== */}
        <div style={styles.card}>
          <h3 onClick={()=>setOpen(open==="soil" ? "" : "soil")} style={styles.header}>
            🌱 Soil Health Card
          </h3>

          {open==="soil" && (
            <div>
              <p>{t?"மண் பரிசோதனை & உர பரிந்துரை":"Soil test & fertilizer advice"}</p>
              <a href="https://soilhealth.dac.gov.in" target="_blank" style={styles.link}>
                soilhealth.dac.gov.in
              </a>
            </div>
          )}
        </div>

        {/* ========== MICRO IRRIGATION ========== */}
        <div style={styles.card}>
          <h3 onClick={()=>setOpen(open==="irrigation" ? "" : "irrigation")} style={styles.header}>
            💧 Micro Irrigation (PMKSY)
          </h3>

          {open==="irrigation" && (
            <div>
              <p>{t?"டிரிப் & ஸ்பிரிங்க்லர் உதவி":"Drip & sprinkler subsidy"}</p>
              <a href="https://pmksy.gov.in" target="_blank" style={styles.link}>
                pmksy.gov.in
              </a>
            </div>
          )}
        </div>

        {/* ========== ORGANIC FARMING ========== */}
        <div style={styles.card}>
          <h3 onClick={()=>setOpen(open==="organic" ? "" : "organic")} style={styles.header}>
            🌍 Organic Farming (PKVY)
          </h3>

          {open==="organic" && (
            <div>
              <p>{t?"இயற்கை விவசாய ஊக்கத்தொகை":"Support for organic farming"}</p>
              <a href="https://pgsindia-ncof.gov.in" target="_blank" style={styles.link}>
                pgsindia-ncof.gov.in
              </a>
            </div>
          )}
        </div>

        {/* ========== KCC LOAN ========== */}
        <div style={styles.card}>
          <h3 onClick={()=>setOpen(open==="kcc" ? "" : "kcc")} style={styles.header}>
            🏦 Kisan Credit Card (KCC)
          </h3>

          {open==="kcc" && (
            <div>
              <p>{t?"குறைந்த வட்டி கடன்":"Low interest crop loan"}</p>
              <a href="https://www.myscheme.gov.in" target="_blank" style={styles.link}>
                myscheme.gov.in
              </a>
            </div>
          )}
        </div>

        {/* BACK BUTTON */}
        <button style={styles.back} onClick={()=>navigate("/home")}>
          ⬅ {t?"முகப்பு":"Back to Home"}
        </button>

      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const styles={

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
    background:"rgba(0,100,0,0.6)",
    zIndex:1
  },

  mobile:{
    position:"relative",
    zIndex:1,
    width:"100%",
    maxWidth:550,
    maxHeight:"85vh",
    overflowY:"auto",
    background:"rgba(48, 205, 40, 0.95)",
    borderRadius:22,
    padding:16,
    boxShadow:"0 18px 40px rgba(0,0,0,.3)"
  },

  card:{
    background:"#47e147",
    borderRadius:16,
    padding:14,
    marginBottom:10,
    border:"1px solid #d8efd8"
  },

  header:{
    margin:0,
    cursor:"pointer"
  },

  link:{
    color:"#0066cc",
    fontWeight:"bold",
    textDecoration:"none"
  },

  back:{
    width:"100%",
    padding:10,
    borderRadius:12,
    background:"#145a32",
    color:"white",
    border:"none",
    fontWeight:"bold",
    marginTop:10
  }
};
