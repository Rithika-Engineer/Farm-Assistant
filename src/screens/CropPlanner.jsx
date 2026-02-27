import { useState } from "react";
import { useLanguage } from "../LanguageContext";
import BottomNav from "../components/BottomNav";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/image copy 11.png";

export default function CropPlanner(){

  const { lang } = useLanguage();
  const t = lang === "ta";
  const navigate = useNavigate();

  const [season, setSeason] = useState("");
  const [crop, setCrop] = useState("");

  const crops = {

    kharif:[
      {name:"Paddy", ta:"நெல்", soil:"Clay / Loamy", water:"High", days:"120–150", gains:"Adds organic matter", next:"Wheat / Pulses", tip:"Avoid water stress during tillering"},
      {name:"Maize", ta:"சோளம்", soil:"Well drained", water:"Medium", days:"90–110", gains:"Improves soil tilth", next:"Potato / Pulses", tip:"Ensure weed control first 30 days"},
      {name:"Cotton", ta:"பருத்தி", soil:"Black soil", water:"Medium", days:"150–180", gains:"Deep root improves soil", next:"Groundnut", tip:"Avoid excess nitrogen"},
      {name:"Groundnut", ta:"வேர்க்கடலை", soil:"Sandy loam", water:"Low", days:"100–120", gains:"Fixes nitrogen", next:"Maize / Sorghum", tip:"Good drainage needed"},
      {name:"Soybean", ta:"சோயாபீன்", soil:"Clay loam", water:"Medium", days:"90–110", gains:"High nitrogen fixing", next:"Wheat", tip:"Do not waterlog"},
    ],

    rabi:[
      {name:"Wheat", ta:"கோதுமை", soil:"Loam", water:"Medium", days:"120–140", gains:"Moderate residue", next:"Paddy / Maize", tip:"Avoid late sowing"},
      {name:"Mustard", ta:"கடுகு", soil:"Loam", water:"Low", days:"100–120", gains:"Improves structure", next:"Pulses", tip:"Needs cool dry weather"},
      {name:"Peas", ta:"பட்டாணி", soil:"Light loam", water:"Low", days:"90–110", gains:"Fixes nitrogen", next:"Wheat / Maize", tip:"Avoid water stagnation"},
      {name:"Garlic", ta:"வெள்ளை பூண்டு", soil:"Loose soil", water:"Medium", days:"150–180", gains:"Light feeder", next:"Vegetables", tip:"Needs well aerated soil"},
    ],

    summer:[
      {name:"Watermelon", ta:"தர்பூஸ்", soil:"Sandy loam", water:"Medium", days:"80–95", gains:"Covers soil surface", next:"Pulses", tip:"Needs high sunlight"},
      {name:"Cowpea", ta:"தட்டைப் பயறு", soil:"Any", water:"Low", days:"70–90", gains:"High nitrogen fixing", next:"Cereals", tip:"Very heat tolerant"},
      {name:"Green gram", ta:"பாசிப்பயறு", soil:"Light soil", water:"Low", days:"60–75", gains:"Restores soil", next:"Wheat", tip:"Good for drylands"},
      {name:"Sesame", ta:"எள்ளு", soil:"Well drained", water:"Low", days:"90–110", gains:"Deep roots loosen soil", next:"Vegetables", tip:"Avoid heavy rains"},
    ]
  };

  const selected =
    season==="kharif" ? crops.kharif :
    season==="rabi" ? crops.rabi :
    season==="summer" ? crops.summer : [];

  return(
    <div style={styles.screen}>

      <div style={styles.overlay}></div>

      <div style={styles.container}>

        <BottomNav />

        <h2 style={{textAlign:"center"}}>
          {t ? "பயிர் திட்டமிடல்" : "Season Crop Planner"}
        </h2>

        <p style={{opacity:.7}}>
          {t ? "காலத்தை தேர்வு செய்க" : "Select a growing season"}
        </p>

        <div style={styles.row}>
          <button style={btn} onClick={()=>{setSeason("kharif");setCrop("")}}>
            🌧 {t?"காரிப் (ஜூன்–அக்)":"Kharif (Jun–Oct)"}
          </button>

          <button style={btn} onClick={()=>{setSeason("rabi");setCrop("")}}>
            ❄ {t?"ரபி (நவ–பிப்)":"Rabi (Nov–Feb)"}
          </button>

          <button style={btn} onClick={()=>{setSeason("summer");setCrop("")}}>
            ☀ {t?"கோடை (மார்–மே)":"Summer (Mar–May)"}
          </button>
        </div>

        {season && (
          <div style={styles.card}>
            <h3>{t?"பயிர் பட்டியல்":"Crop List"}</h3>

            {selected.map((c,i)=>(
              <div key={i} style={styles.crop} onClick={()=>setCrop(c)}>
                🌾 {t?c.ta:c.name}
              </div>
            ))}
          </div>
        )}

        {crop && (
          <div style={styles.card}>
            <h3>🌾 {t?crop.ta:crop.name}</h3>

            <p>🧑‍🌾 {t?"மண் வகை":"Best Soil"}: {crop.soil}</p>
            <p>💧 {t?"நீர் தேவை":"Water Need"}: {crop.water}</p>
            <p>📆 {t?"வளரும் நாட்கள்":"Growing Days"}: {crop.days}</p>
            <p>🌱 {t?"மண்ணுக்கு பயன்":"Soil Benefit"}: {crop.gains}</p>
            <p>🔁 {t?"அடுத்து விதைக்கலாம்":"Next Crop"}: {crop.next}</p>

            <p>💡 {t?"லாப அறிவுரை":"Profit Tip"}:</p>
            <b>{crop.tip}</b>
          </div>
        )}

        <button style={styles.back} onClick={()=>navigate("/home")}>
          ⬅ {t ? "முகப்பு" : "Back to Home"}
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
    alignItems:"center",
    overflow:"hidden"
  },

  overlay:{
    position:"absolute",
    inset:0,
    background:"rgba(0,100,0,0.6)",
    zIndex:1
  },

  container:{
    position:"relative",
    zIndex:2,
    width:"100%",
    maxWidth:620,           // ✅ WEB WIDTH
    maxHeight:"85vh",
    overflowY:"auto",
    background:"rgba(229, 237, 229, 0.95)",
    borderRadius:24,
    padding:20,
    boxShadow:"0 18px 45px rgba(0,0,0,.35)"
  },

  back:{
    border:"none",
    background:"transparent",
    fontSize:16,
    fontWeight:"bold",
    cursor:"pointer",
    marginTop:12,
    color:"#145a32"
  },

  row:{
    display:"grid",
    gridTemplateColumns:"1fr 1fr 1fr",
    gap:8,
    marginBottom:12
  },

  card:{
    background:"rgb(13, 214, 13)",
    padding:12,
    borderRadius:16,
    marginTop:10
  },

  crop:{
    padding:10,
    background:"rgba(195, 246, 221, 0.9)",
    borderRadius:10,
    marginBottom:6,
    cursor:"pointer"
  }
};

const btn ={
  padding:10,
  borderRadius:12,
  border:"none",
  background:"#12d346ff",
  color:"#000",
  fontWeight:"bold"
};
