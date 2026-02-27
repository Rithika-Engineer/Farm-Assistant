import { useState } from "react";
import { useLanguage } from "../LanguageContext";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import bgImage from "../assets/agricultureimg.png";

export default function NaturalFarming(){

  const { lang } = useLanguage();
  const t = lang === "ta";
  const navigate = useNavigate();

  const [crop, setCrop] = useState("");

  const data = {

    paddy:{
      fert: t?"ஜீவாமிருதம்":"Jeevamrutham",
      prep: t
        ? ["மாட்டு சாணம் 10 கிலோ", "மாட்டு சிறுநீர் 10 லிட்டர்", "கருப்பட்டி சேர்க்கவும்", "24 மணி நேரம் ஊறவிடவும்"]
        : ["Cow dung 10kg", "Cow urine 10L", "Add jaggery", "Ferment for 24 hours"],
      apply: t?"15 நாட்களுக்கு ஒருமுறை தெளிக்கவும்":"Spray once every 15 days",
      safety: t?"கையுறை அணிந்து தெளிக்கவும்":"Wear gloves while spraying",
      benefit: t?"மண் வளம் அதிகரிக்கும்":"Improves soil fertility"
    },

    banana:{
      fert: t?"பஞ்சகவ்யம்":"Panchagavya",
      prep: t
        ? ["பால், தயிர், நெய் சேர்க்கவும்", "7 நாட்கள் ஊறவிடவும்"]
        : ["Add milk, curd, ghee", "Ferment for 7 days"],
      apply: t?"20 நாட்களுக்கு ஒருமுறை":"Every 20 days",
      safety: t?"நிழலில் வைத்துப் பயன்படுத்தவும்":"Store and use in shade",
      benefit: t?"பழ அளவும் தரமும் உயரும்":"Improves fruit size & quality"
    },

    tomato:{
      fert: t?"ஜீவாமிருதம்":"Jeevamrutham",
      prep: t
        ? ["24 மணி நேரம் ஊறவிடவும்"]
        : ["Ferment for 24 hours"],
      apply: t?"10 நாட்களுக்கு ஒருமுறை":"Every 10 days",
      safety: t?"முக கவசம் அணியவும்":"Use mask",
      benefit: t?"மகசூல் அதிகரிக்கும்":"Higher yield"
    },

    chilli:{
      fert: t?"பஞ்சகவ்யம்":"Panchagavya",
      prep: t
        ? ["7 நாட்கள் ஊறவிடவும்"]
        : ["Ferment for 7 days"],
      apply: t?"15 நாட்களுக்கு ஒருமுறை":"Every 15 days",
      safety: t?"மூக்கு, கண்ணை பாதுகாக்கவும்":"Protect nose & eyes",
      benefit: t?"காய் தரம் மேம்படும்":"Better pod quality"
    },

    groundnut:{
      fert: t?"வெர்மி கம்போஸ்ட்":"Vermicompost",
      prep: t
        ? ["மண்ணுடன் கலந்து பயன்படுத்தவும்"]
        : ["Mix with soil before sowing"],
      apply: t?"விதைப்பு முன்":"Before sowing",
      safety: t?"ஈரப்பதம் பராமரிக்கவும்":"Maintain soil moisture",
      benefit: t?"வேர் வளர்ச்சி சிறப்பு":"Strong root growth"
    },

    cotton:{
      fert: t?"ஜீவாமிருதம்":"Jeevamrutham",
      prep: t
        ? ["24 மணி நேரம் ஊறவிடவும்"]
        : ["Ferment for 24 hours"],
      apply: t?"15 நாட்களுக்கு ஒருமுறை":"Every 15 days",
      safety: t?"நேரடி வெயிலில் வைக்காதீர்கள்":"Avoid direct sunlight",
      benefit: t?"செலவு குறையும்":"Reduces cost"
    },

    sugarcane:{
      fert: t?"பஞ்சகவ்யம்":"Panchagavya",
      prep: t
        ? ["7 நாட்கள் ஊறவிடவும்"]
        : ["Ferment for 7 days"],
      apply: t?"20 நாட்களுக்கு ஒருமுறை":"Every 20 days",
      safety: t?"குழந்தைகள் அருகில் வைக்காதீர்கள்":"Keep away from children",
      benefit: t?"இனிப்பு அளவு உயரும்":"Increases sweetness"
    }

  };

  return (
  <div style={styles.screen}>   {/* ✅ FULL SCREEN */}

    <div style={styles.content}> {/* ✅ SCROLLABLE AREA */}

      <div style={styles.mobile}>

        <BottomNav />

        <h2 style={{ textAlign: "center" }}>
          {t ? "இயற்கை வேளாண்மை ஆலோசனை" : "Natural Farming Advisor"}
        </h2>

        <select
          style={styles.input}
          value={crop}
          onChange={e => setCrop(e.target.value)}
        >
          <option value="">
            {t ? "பயிரை தேர்வு செய்க" : "Select Crop"}
          </option>
          {Object.keys(data).map(c => (
            <option key={c} value={c}>{c.toUpperCase()}</option>
          ))}
        </select>

        {crop && (
          <>
            <div style={styles.card}>
              <h3>🌿 Fertilizer</h3>
              <p>{data[crop].fert}</p>
            </div>

            <div style={styles.card}>
              <h3>🧪 Preparation</h3>
              <ul>
                {data[crop].prep.map((p,i)=>(
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>

            <div style={styles.card}>
              <h3>📏 Usage</h3>
              <p>{data[crop].apply}</p>
            </div>

            <div style={styles.card}>
              <h3>⚠ Safety</h3>
              <p>{data[crop].safety}</p>
            </div>

            <div style={styles.card}>
              <h3>⚖ Natural vs Chemical</h3>
              <p>✅ Improves soil health</p>
              <p>❌ No chemical residue</p>
            </div>
          </>
        )}

        <button style={styles.back} onClick={()=>navigate("/home")}>
          ⬅ {t ? "முகப்பு" : "Home"}
        </button>

      </div>
    </div>
  </div>
);
}
/* ================= STYLES ================= */


  /* ✅ THIS ENABLES FULL PAGE SCROLL */
 const styles = {

  /* ✅ FULL SCREEN (NOT PAGE) */
  screen:{
    position:"fixed",
    inset:0,                     // top, right, bottom, left = 0
    backgroundImage:`url(${bgImage})`,
    backgroundSize:"cover",
    backgroundPosition:"center",
    backgroundRepeat:"no-repeat",
    minHeight:"85vh",
    display:"flex",
    justifyContent:"center"
  },

  /* ✅ ONLY CONTENT SCROLLS */
  content:{
    width:"100%",
    height:"100vh",              // screen height
    overflowY:"auto",            // ✅ SCROLL ENABLED
    padding:"30px 0"
  },

  mobile:{
    width:"100%",
    maxWidth:650,

    margin:"0 auto",
    background:"rgba(255,255,255,0.92)",
    borderRadius:20,
    padding:22,
    boxShadow:"0 15px 40px rgba(0,0,0,.25)"
  },

  input:{
    width:"100%",
    padding:12,
    borderRadius:10,
    marginBottom:10
  },

  card:{
    background:"#5df65dff",
    padding:14,
    borderRadius:14,
    marginBottom:12
  },

  back:{
    width:"100%",
    padding:12,
    border:"none",
    borderRadius:12,
    background:"#2e7d32",
    color:"white",
    fontWeight:"bold",
    marginTop:10
  }
};
