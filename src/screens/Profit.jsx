import { useState, useEffect } from "react";
import { useLanguage } from "../LanguageContext";
import BottomNav from "../components/BottomNav";
import { useNavigate } from "react-router-dom";

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

  /* ---------- SAVE SEASON HISTORY ✅ ADDED ---------- */
  const [seasonHistory, setSeasonHistory] = useState({});

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("seasonProfit")) || {};
    setSeasonHistory(saved);
  }, []);

  useEffect(() => {
    if(cost > 0 || income > 0){
      const updated = {
        ...seasonHistory,
        [season]: profit
      };
      setSeasonHistory(updated);
      localStorage.setItem("seasonProfit", JSON.stringify(updated));
    }
  }, [profit]); // only addition

  /* ---------- BENCHMARK DATA ---------- */
  const benchmark = {
    Paddy:18000,
    Maize:15000,
    Cotton:25000,
    Groundnut:22000,
  };

  /* ---------- MARKET PRICE (DEMO) ---------- */
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
    <div style={styles.page}>
      <div style={styles.overlay}>
        <div style={styles.mobile}>

          <BottomNav />

          <h2>💰 {t?"லாப கணக்கீடு":"Profit Analysis"}</h2>

          {/* SELECT CROP */}
          <select style={styles.input} value={crop} onChange={e=>setCrop(e.target.value)}>
            <option>Paddy</option>
            <option>Maize</option>
            <option>Cotton</option>
            <option>Groundnut</option>
          </select>

          <p>📅 {t?"தற்போதைய பருவம்":"Current Season"}: <b>{season}</b></p>

          {/* INPUTS */}
          <input style={styles.input} placeholder={t?"மொத்த செலவு":"Total Cost"}
            onChange={e=>setCost(e.target.value)} />

          <input style={styles.input} placeholder={t?"உற்பத்தி (Kg)":"Yield (Kg)"}
            onChange={e=>setYieldKg(e.target.value)} />

          <input style={styles.input} placeholder={t?"விலை / Kg":"Price per Kg"}
            onChange={e=>setPrice(e.target.value)} />

          {/* RESULT */}
          <div style={styles.card}>
            <p>💸 {t?"செலவு":"Cost"}: ₹{cost}</p>
            <p>📈 {t?"வருமானம்":"Income"}: ₹{income}</p>
            <h2 style={{color:profit>=0?"green":"red"}}>₹{profit}</h2>
            <button style={styles.voice} onClick={speak}>🔊 Tamil Voice</button>
          </div>

          {/* SEASON-WISE HISTORY ✅ ADDED */}
          <div style={styles.card}>
            <h3>📊 {t?"பருவ வாரியான அறிக்கை":"Season-wise Report"}</h3>

            {Object.keys(seasonHistory).length === 0 && (
              <p>{t?"முந்தைய தகவல் இல்லை":"No previous data"}</p>
            )}

            {Object.entries(seasonHistory).map(([s,val])=>(
              <p key={s} style={{color:val>=0?"green":"red"}}>
                🌾 {s} :
                ₹{val} {val>=0 ? (t?"(லாபம்)":"(Profit)") : (t?"(இழப்பு)":"(Loss)")}
              </p>
            ))}

            <p style={{fontSize:12,opacity:.7}}>
              {t
                ? "அடுத்த பருவத்தில் சென்றாலும் முந்தைய பருவ அறிக்கை காணப்படும்"
                : "Previous season report will remain visible"}
            </p>
          </div>

          {/* MARKET PRICE */}
          <div style={styles.card}>
            <h3>🏪 {t?"இன்றைய சந்தை விலை":"Today Market Price"}</h3>
            <p>Min ₹{marketPrice[crop].min} | Max ₹{marketPrice[crop].max}</p>

            
            {profit<0 && (
              <p style={{color:"red"}}>
                🛡 {t?"இழப்பு இருப்பதால் காப்பீடு பெற வாய்ப்பு உள்ளது"
                    :"Loss detected – Insurance eligible"}
              </p>
            )}
          </div>

          {/* BACK */}
          <button style={styles.back} onClick={()=>navigate("/home")}>
            ⬅ {t?"முகப்பு":"Back to Home"}
          </button>

        </div>
      </div>
    </div>
  );
}

/* ---------- STYLES (BACKGROUND IMAGE ONLY ADDED) ---------- */
const styles={
  page:{
    minHeight:"100vh",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1598515214211-89d3c73ae83b')",
    backgroundSize:"cover",
    backgroundPosition:"center"
  },
  overlay:{
    minHeight:"100vh",
    background:"rgba(0,100,0,0.75)",
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
  },
  mobile:{
    width:"100%",
    maxWidth:420,
    background:"#1f8f3f",
    borderRadius:22,
    padding:16,
    boxShadow:"0 18px 40px rgba(0,0,0,.2)"
  },
  input:{
    width:"90%",
    padding:10,
    borderRadius:10,
    marginBottom:8
  },
  card:{
    background:"#f7fff7",
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
  back:{
    width:"100%",
    padding:10,
    borderRadius:12,
    background:"#145a32",
    color:"white",
    border:"none",
    marginTop:10
  }
};
