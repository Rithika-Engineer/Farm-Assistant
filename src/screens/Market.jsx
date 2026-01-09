import { useState, useEffect } from "react";
import { useLanguage } from "../LanguageContext";
import BottomNav from "../components/BottomNav";
import { useNavigate } from "react-router-dom";

export default function Market(){

  const { lang } = useLanguage();
  const t = lang === "ta";
  const navigate = useNavigate();

  const [crop, setCrop] = useState("");
  const [market, setMarket] = useState("");
  const [alertPrice, setAlertPrice] = useState("");
  const [weekly, setWeekly] = useState([]);
  const [monthly, setMonthly] = useState([]);

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
    },
    Maize:{
      Chennai:{min:20,max:28},
      Madurai:{min:18,max:26},
      Salem:{min:19,max:27}
    },
    Cotton:{
      Coimbatore:{min:55,max:70},
      Salem:{min:54,max:68}
    },
    Tomato:{
      Chennai:{min:10,max:30},
      Madurai:{min:8,max:25}
    },
    Onion:{
      Chennai:{min:15,max:40},
      Trichy:{min:18,max:45}
    },
    Chilli:{
      Salem:{min:90,max:130},
      Erode:{min:95,max:135}
    },
    Coconut:{
      Coimbatore:{min:22,max:35},
      Pollachi:{min:24,max:38}
    },
    Sugarcane:{
      Erode:{min:290,max:330},
      Thanjavur:{min:300,max:340}
    }
  };

  let selected = null;
  if(crop && market && prices[crop] && prices[crop][market]){
    selected = prices[crop][market];
  }

  /* ---------------- PRICE ALERT ---------------- */
  useEffect(()=>{
    if(selected && alertPrice){
      if(selected.max >= Number(alertPrice)){
        alert(
          t
            ? `🔔 விலை எச்சரிக்கை! ₹${selected.max} கிடைத்துள்ளது`
            : `🔔 Price Alert! ₹${selected.max} reached`
        );
      }
    }
  },[selected, alertPrice]);

  /* ---------------- WEEK / MONTH TREND ---------------- */
  useEffect(()=>{
    if(selected){
      // demo trend (later API)
      setWeekly([20,22,21,23,24,25,26]);
      setMonthly([18,19,20,21,22,23,24,25,26,24,23,22]);
    }
  },[selected]);

  /* ---------------- LIVE GOVT API (READY) ---------------- */
  async function fetchLivePrice(){
    /*
      ❗ REAL API MUST COME FROM YOUR BACKEND ❗

      Example:
      fetch("https://your-backend.com/agmarknet?crop=Paddy&market=Chennai")
    */

    alert(
      t
        ? "🌐 அரசு API இணைப்பு backend மூலம் மட்டுமே இயலும்"
        : "🌐 Govt API requires backend connection"
    );
  }

  return(
    <div style={styles.page}>
      <div style={styles.overlay}>

        <div style={styles.mobile}>
          <BottomNav />

          <h2 style={{color:"white"}}>
            {t ? "இன்றைய சந்தை விலை" : "Today Market Price"}
          </h2>

          {/* SELECT CROP */}
          <select style={styles.input} value={crop} onChange={e=>setCrop(e.target.value)}>
            <option value="">{t?"பயிர்":"Crop"}</option>
            {Object.keys(prices).map(c=>(
              <option key={c}>{c}</option>
            ))}
          </select>

          {/* SELECT MARKET */}
          <select style={styles.input} value={market} onChange={e=>setMarket(e.target.value)}>
            <option value="">{t?"சந்தை":"Market"}</option>
            {crop && Object.keys(prices[crop]).map(m=>(
              <option key={m}>{m}</option>
            ))}
          </select>

          {/* PRICE CARD */}
          {selected && (
            <div style={styles.card}>
              <p>🟡 Min: ₹{selected.min}</p>
              <p>🟢 Max: ₹{selected.max}</p>
              <p>📊 Avg: ₹{Math.round((selected.min+selected.max)/2)}</p>
            </div>
          )}

          {/* PRICE ALERT */}
          {selected && (
            <div style={styles.card}>
              <h4>🔔 {t?"விலை எச்சரிக்கை":"Price Alert"}</h4>
              <input
                style={styles.input}
                placeholder={t?"இலக்கு விலை":"Target Price"}
                onChange={e=>setAlertPrice(e.target.value)}
              />
            </div>
          )}

          {/* WEEKLY TREND */}
          {weekly.length>0 && (
            <div style={styles.card}>
              <h4>📈 {t?"வார விலை":"Weekly Trend"}</h4>
              {weekly.map((v,i)=>(
                <div key={i} style={{height:8,width:v*3,background:"green",marginBottom:4}} />
              ))}
            </div>
          )}

          {/* MONTHLY TREND */}
          {monthly.length>0 && (
            <div style={styles.card}>
              <h4>📊 {t?"மாத விலை":"Monthly Trend"}</h4>
              {monthly.map((v,i)=>(
                <div key={i} style={{height:6,width:v*2,background:"#2e8b3d",marginBottom:3}} />
              ))}
            </div>
          )}

          {/* GOVT API */}
          <button style={styles.api} onClick={fetchLivePrice}>
            🌐 {t?"அரசு API விலை":"Govt Live Price"}
          </button>

          {/* BACK */}
          <button style={styles.back} onClick={()=>navigate("/home")}>
            ⬅ {t?"முகப்பு":"Back"}
          </button>

        </div>
      </div>
    </div>
  );
}

/* ---------------- STYLES ---------------- */
const styles={
  page:{
    minHeight:"100vh",
    backgroundImage:"url('https://images.unsplash.com/photo-1501004318641-b39e6451bec6')",
    backgroundSize:"cover",
    backgroundPosition:"center"
  },
  overlay:{
    minHeight:"100vh",
    background:"rgba(0,100,0,.75)",
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
  },
  mobile:{
    width:"100%",
    maxWidth:420,
    background:"#1f8f3f",
    borderRadius:22,
    padding:18
  },
  input:{
    width:"100%",
    padding:10,
    borderRadius:10,
    marginBottom:8
  },
  card:{
    background:"#f7fff7",
    borderRadius:14,
    padding:12,
    marginBottom:10
  },
  api:{
    width:"100%",
    padding:10,
    background:"#0b5",
    color:"white",
    border:"none",
    borderRadius:10
  },
  back:{
    width:"100%",
    padding:10,
    background:"#145a32",
    color:"white",
    border:"none",
    borderRadius:10,
    marginTop:10
  }
};
