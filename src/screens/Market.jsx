import { useState, useEffect } from "react";
import { useLanguage } from "../LanguageContext";
import BottomNav from "../components/BottomNav";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/image copy 7.png";

export default function Market(){

  const { lang } = useLanguage();
  const t = lang === "ta";
  const navigate = useNavigate();

  const [crop, setCrop] = useState("");
  const [market, setMarket] = useState("");
  const [alertPrice, setAlertPrice] = useState("");
  const [weekly, setWeekly] = useState([]);
  const [monthly, setMonthly] = useState([]);
  const [topDistrict, setTopDistrict] = useState(null);

  /* ---------------- DEMO PRICE DATA ---------------- */
  const prices = {
    Paddy:{
      Chennai:{min:18,max:26},
      Madurai:{min:17,max:25},
      Trichy:{min:19,max:27},
      Coimbatore:{min:18,max:26},
      Salem:{min:17,max:24},
      Thanjavur:{min:20,max:28},
      Erode:{min:18,max:26},
      Tirunelveli:{min:17,max:25},
      Villupuram:{min:19,max:27},
      Dindigul:{min:18,max:26}
    },
    Banana:{
      Chennai:{min:12,max:18},
      Madurai:{min:10,max:16},
      Trichy:{min:11,max:17},
      Coimbatore:{min:13,max:19},
      Salem:{min:12,max:18}
    },
    Groundnut:{
      Chennai:{min:50,max:72},
      Madurai:{min:48,max:70},
      Trichy:{min:52,max:75}
    }
  };

  /* ---------------- DERIVED VALUE ---------------- */
  const selected =
    crop && market && prices[crop] && prices[crop][market]
      ? prices[crop][market]
      : null;

  /* ---------------- PRICE ALERT (SAFE) ---------------- */
  useEffect(()=>{
    if(!selected || !alertPrice) return;

    if(selected.max >= Number(alertPrice)){
      alert(
        t
          ? `🔔 விலை எச்சரிக்கை! ₹${selected.max} கிடைத்துள்ளது`
          : `🔔 Price Alert! ₹${selected.max} reached`
      );
    }
  },[alertPrice]);   // ✅ primitive only

  /* ---------------- WEEK / MONTH TREND (FIXED) ---------------- */
  useEffect(()=>{
    if(!crop || !market) return;

    setWeekly([20,22,21,23,24,25,26]);
    setMonthly([18,19,20,21,22,23,24,25,26,24,23,22]);

  },[crop, market]);   // ✅ no object dependency

  /* ---------------- TOP DISTRICT (SAFE) ---------------- */
  useEffect(()=>{
    if(!crop) return;

    let max = 0;
    let best = "";

    Object.keys(prices[crop]).forEach(d=>{
      if(prices[crop][d].max > max){
        max = prices[crop][d].max;
        best = d;
      }
    });

    setTopDistrict({ district: best, price: max });
  },[crop]);

  return(
    <div style={styles.screen}>

      {/* OVERLAY */}
      <div style={styles.overlay}></div>

      {/* CENTER CARD */}
      <div style={styles.box}>

        <BottomNav />

        <h2 style={{ textAlign:"center", color:"green" }}>
          {t ? "இன்றைய சந்தை விலை" : "Today Market Price"}
        </h2>

        {/* SELECT CROP */}
        <select style={styles.input} value={crop} onChange={e=>setCrop(e.target.value)}>
          <option value="">{t?"பயிர்":"Crop"}</option>
          {Object.keys(prices).map(c=>(
            <option key={c}>{c}</option>
          ))}
        </select>

        {/* SELECT DISTRICT */}
        {crop && (
          <select style={styles.input} value={market} onChange={e=>setMarket(e.target.value)}>
            <option value="">{t?"மாவட்டம்":"District"}</option>
            {Object.keys(prices[crop]).map(m=>(
              <option key={m}>{m}</option>
            ))}
          </select>
        )}

        {/* PRICE CARD */}
        {selected && (
          <div style={styles.card}>
            <p>🟡 {t?"குறைந்த விலை":"Min"}: ₹{selected.min}</p>
            <p>🟢 {t?"அதிக விலை":"Max"}: ₹{selected.max}</p>
            <p>📊 {t?"சராசரி":"Average"}: ₹{Math.round((selected.min+selected.max)/2)}</p>
          </div>
        )}

        {/* TOP DISTRICT */}
        {topDistrict && (
          <div style={styles.card}>
            <h4>🔥 {t?"இன்று அதிக விலை":"Highest Selling Today"}</h4>
            <p>🏆 {topDistrict.district} – ₹{topDistrict.price}</p>
          </div>
        )}

        {/* WEEKLY TREND */}
        {weekly.length > 0 && (
          <div style={styles.card}>
            <h4>📈 {t?"வார போக்கு":"Weekly Trend"}</h4>
            {weekly.map((v,i)=>(
              <div key={i}
                style={{ height:8, width:v*3, background:"green", marginBottom:4 }} />
            ))}
          </div>
        )}

        {/* MONTHLY TREND */}
        {monthly.length > 0 && (
          <div style={styles.card}>
            <h4>📊 {t?"மாத போக்கு":"Monthly Trend"}</h4>
            {monthly.map((v,i)=>(
              <div key={i}
                style={{ height:6, width:v*2, background:"#2e8b3d", marginBottom:3 }} />
            ))}
          </div>
        )}

      </div>

      {/* BACK BUTTON */}
      <button style={styles.backBtn} onClick={()=>navigate("/home")}>
        ← {t?"முகப்பு":"Back"}
      </button>

    </div>
  );
}

/* ================= STYLES ================= */

const styles = {

  screen:{
    position:"fixed",
    inset:0,
    backgroundImage:`url(${bgImage})`,
    backgroundSize:"cover",
    backgroundPosition:"center",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    overflow:"hidden"
  },

  overlay:{
    position:"absolute",
    inset:0,
    background:"rgba(0,100,0,0.55)",
    zIndex:1
  },

  box:{
    position:"relative",
    zIndex:2,
    width:550,
    maxHeight:"85vh",
    overflowY:"auto",
    background:"rgba(29, 187, 45, 0.95)",
    borderRadius:22,
    padding:16,
    boxShadow:"0 18px 40px rgba(0,0,0,.3)"
  },

  input:{
    width:"100%",
    padding:10,
    borderRadius:10,
    marginBottom:8
  },

  card:{
    background:"#4ef064",
    borderRadius:14,
    padding:12,
    marginBottom:10
  },

  backBtn:{
    position:"fixed",
    bottom:50,
    left:"50%",
    transform:"translateX(-50%)",
    padding:"10px 22px",
    borderRadius:24,
    background:"white",
    fontWeight:"bold",
    zIndex:3
  }
};
