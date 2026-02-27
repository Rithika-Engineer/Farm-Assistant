import { useState, useEffect } from "react";
import { useLanguage } from "../LanguageContext";
import BottomNav from "../components/BottomNav";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/image copy 6.png";

export default function Profit(){

  const { lang } = useLanguage();
  const t = lang === "ta";
  const navigate = useNavigate();

  const [crop, setCrop] = useState("Paddy");
  const [cost, setCost] = useState(0);
  const [yieldKg, setYieldKg] = useState(0);
  const [price, setPrice] = useState(0);

  /* ---------- CURRENT SEASON ---------- */
  const m = new Date().getMonth()+1;
  const season =
    m>=6 && m<=10 ? "Kharif" :
    m>=11 || m<=2 ? "Rabi" : "Summer";

  /* ---------- CALCULATIONS ---------- */
  const income = price * yieldKg;
  const profit = income - cost;

  /* ---------- SEASON HISTORY ---------- */
  const [seasonHistory, setSeasonHistory] = useState({});

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("seasonProfit")) || {};
    setSeasonHistory(saved);
  }, []);

  useEffect(() => {
    if(cost > 0 || income > 0){
      const updated = { ...seasonHistory, [season]: profit };
      setSeasonHistory(updated);
      localStorage.setItem("seasonProfit", JSON.stringify(updated));
    }
  }, [profit]);

  /* ---------- MARKET PRICE ---------- */
  const marketPrice = {
    Paddy:{min:18,max:24},
    Maize:{min:16,max:22},
    Cotton:{min:55,max:70},
    Groundnut:{min:45,max:60},
  };

  /* ---------- TAMIL VOICE ---------- */
  function speak(){
    const msg = profit>=0
      ? `நீங்கள் லாபம் பெற்றுள்ளீர்கள். லாபம் ரூபாய் ${profit}`
      : `இந்த பருவத்தில் இழப்பு ஏற்பட்டுள்ளது`;

    const speech = new SpeechSynthesisUtterance(msg);
    speech.lang="ta-IN";
    window.speechSynthesis.speak(speech);
  }

  return(
    <div style={styles.screen}>

      {/* GREEN OVERLAY */}
      <div style={styles.overlay}></div>

      {/* CENTER CARD */}
      <div style={styles.box}>

        <BottomNav />

        <h2 style={{textAlign:"center"}}>
          💰 {t?"லாப கணக்கீடு":"Profit Analysis"}
        </h2>

        {/* SELECT CROP */}
        <select style={styles.input} value={crop} onChange={e=>setCrop(e.target.value)}>
          <option>Paddy</option>
          <option>Maize</option>
          <option>Cotton</option>
          <option>Groundnut</option>
        </select>

        <p>📅 {t?"தற்போதைய பருவம்":"Current Season"}: <b>{season}</b></p>

        {/* INPUTS */}
        <input
          style={styles.input}
          placeholder={t?"மொத்த செலவு":"Total Cost"}
          onChange={e=>setCost(e.target.value)}
        />

        <input
          style={styles.input}
          placeholder={t?"உற்பத்தி (Kg)":"Yield (Kg)"}
          onChange={e=>setYieldKg(e.target.value)}
        />

        <input
          style={styles.input}
          placeholder={t?"விலை / Kg":"Price per Kg"}
          onChange={e=>setPrice(e.target.value)}
        />

        {/* RESULT */}
        <div style={styles.card}>
          <p>💸 {t?"செலவு":"Cost"}: ₹{cost}</p>
          <p>📈 {t?"வருமானம்":"Income"}: ₹{income}</p>
          <h2 style={{color:profit>=0?"green":"red"}}>₹{profit}</h2>
          <button style={styles.voice} onClick={speak}>
            🔊 Tamil Voice
          </button>
        </div>

        {/* SEASON HISTORY */}
        <div style={styles.card}>
          <h3>📊 {t?"பருவ வாரியான அறிக்கை":"Season-wise Report"}</h3>

          {Object.keys(seasonHistory).length === 0 && (
            <p>{t?"முந்தைய தகவல் இல்லை":"No previous data"}</p>
          )}

          {Object.entries(seasonHistory).map(([s,val])=>(
            <p key={s} style={{color:val>=0?"green":"red"}}>
              🌾 {s} : ₹{val}
            </p>
          ))}
        </div>

        {/* MARKET PRICE */}
        <div style={styles.card}>
          <h3>🏪 {t?"இன்றைய சந்தை விலை":"Today Market Price"}</h3>
          <p>Min ₹{marketPrice[crop].min} | Max ₹{marketPrice[crop].max}</p>

          {profit<0 && (
            <p style={{color:"red"}}>
              🛡 {t?"இழப்பு – காப்பீடு பெற வாய்ப்பு":"Loss – Insurance eligible"}
            </p>
          )}
        </div>

      </div>

      {/* BACK BUTTON */}
      <button style={styles.backBtn} onClick={()=>navigate("/home")}>
        ← Back
      </button>

    </div>
  );
}

/* ================= STYLES (PEST / LANGUAGE PATTERN) ================= */

const styles = {

 screen:{
  position:"fixed",
  inset:0,                 // ✅ replaces width & height
  backgroundImage:`url(${bgImage})`,
  backgroundSize:"cover",
  backgroundPosition:"center",
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  overflow:"hidden"        // ✅ REMOVES SIDE SCROLL
}
,
  overlay:{
    position:"absolute",
    background:"rgba(0,100,0,0.55)",
    
  },

  box:{
    position:"relative",
    
    width:550,
    maxHeight:"85vh",
    overflowY:"auto",
    background:"rgba(30, 167, 28, 0.95)",
    borderRadius:22,
    padding:18,
    boxShadow:"0 18px 40px rgba(0,0,0,.3)"
  },

  input:{
    width:"80%",
    padding:10,
    borderRadius:10,
    marginBottom:8
  },

  card:{
    background:"#e8f6e8",
    borderRadius:16,
    padding:14,
    marginBottom:10
  },

  voice:{
    width:"100%",
    padding:8,
    borderRadius:10,
    background:"#2e8b3d",
    color:"white",
    border:"none"
  },

  backBtn:{
    position:"fixed",
    bottom:10,
    left:"50%",
    transform:"translateX(-50%)",
    padding:"10px 22px",
    borderRadius:24,
    background:"green",
    fontWeight:"bold",
    zIndex:3
  }
};
