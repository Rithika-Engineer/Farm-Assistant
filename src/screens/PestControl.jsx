import { useState, useEffect } from "react";
import { useLanguage } from "../LanguageContext";
import BottomNav from "../components/BottomNav";
import { useNavigate } from "react-router-dom";

export default function PestControl() {

  const { lang } = useLanguage();
  const t = lang === "ta";
  const navigate = useNavigate();

  const [pest, setPest] = useState("");
  const [image, setImage] = useState(null);
  const [autoDetect, setAutoDetect] = useState("");
  const [season, setSeason] = useState("");

  /* 🔊 Tamil Voice */
  function speak(text){
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "ta-IN";
    u.rate = 0.9;
    window.speechSynthesis.speak(u);
  }

  /* --------- AUTO DETECT SEASON --------- */
  useEffect(()=>{
    const m = new Date().getMonth() + 1;
    if(m >= 6 && m <= 10) setSeason("kharif");
    else if(m >= 11 || m <= 2) setSeason("rabi");
    else setSeason("summer");
  },[]);

  /* -------- SEASON PEST CALENDAR -------- */
  const seasonCalendar = {
    kharif: t
      ? ["தண்டு துளைப்பான்", "இலை பூச்சிகள்", "பூஞ்சை நோய்"]
      : ["Stem Borer", "Leaf Insects", "Fungal Disease"],

    rabi: t
      ? ["அஃபிட்ஸ்", "திரிப்ஸ்"]
      : ["Aphids", "Thrips"],

    summer: t
      ? ["வேர் பூச்சிகள்", "திரிப்ஸ்"]
      : ["Root Worms", "Thrips"]
  };

  /* ---------------- PEST DATA ---------------- */
  const data = {

    insects:{
      name: t?"இலை தின்று பூச்சிகள்":"Leaf Eating Insects",
      crops: t?"நெல், காய்கறிகள்":"Paddy, Vegetables",
      img:"https://images.unsplash.com/photo-1592921870957-0e6c87d0d79d",
      solution: t?"வேம்பெண்ணெய்":"Neem Oil Spray",
      prepare: t
        ? ["5 மில்லி வேம்பெண்ணெய்","1 லிட்டர் நீர்","2 துளி சோப்பு","நன்றாக கலக்கவும்"]
        : ["5ml neem oil","1L water","2 soap drops","Mix well"],
      apply: t?"7 நாட்களுக்கு ஒருமுறை":"Once in 7 days",
      result: t?"3–5 நாட்கள்":"3–5 days"
    },

    aphids:{
      name: t?"அஃபிட்ஸ்":"Aphids",
      crops: t?"பருத்தி, மிளகாய்":"Cotton, Chilli",
      img:"https://images.unsplash.com/photo-1506808547685-e2ba962ded58",
      solution: t?"சோப்பு நீர்":"Soap Water",
      prepare: t
        ? ["10g சோப்பு","1 லிட்டர் நீர்"]
        : ["10g soap","1L water"],
      apply: t?"இலை அடிப்பகுதி":"Leaf underside",
      result: t?"2–3 நாட்கள்":"2–3 days"
    },

    fungus:{
      name: t?"பூஞ்சை நோய்":"Fungal Disease",
      crops: t?"நெல், வாழை":"Paddy, Banana",
      img:"https://images.unsplash.com/photo-1592924357228-91a6f63a64f4",
      solution: t?"மோர் தெளிப்பு":"Buttermilk Spray",
      prepare: t
        ? ["1 லிட்டர் மோர்","5 லிட்டர் நீர்","48 மணி நேரம் ஊறவிடவும்"]
        : ["1L buttermilk","5L water","Ferment 48 hrs"],
      apply: t?"இலைகளில் தெளிக்கவும்":"Spray on leaves",
      result: t?"5–7 நாட்கள்":"5–7 days"
    },

    stemBorer:{
      name: t?"தண்டு துளைப்பான்":"Stem Borer",
      crops: t?"நெல்":"Paddy",
      img:"https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
      solution: t?"வேப்ப விதை சாரம்":"Neem Seed Extract",
      prepare: t
        ? ["50g வேப்ப விதை","1 லிட்டர் நீர்","12 மணி ஊறவிடவும்"]
        : ["50g neem seed","1L water","Soak 12 hrs"],
      apply: t?"தண்டு அருகில்":"Near stem",
      result: t?"6–8 நாட்கள்":"6–8 days"
    },

    thrips:{
      name: t?"திரிப்ஸ்":"Thrips",
      crops: t?"மிளகாய், வெங்காயம்":"Chilli, Onion",
      img:"https://images.unsplash.com/photo-1528825871115-3581a5387919",
      solution: t?"புளி நீர்":"Tamarind Water",
      prepare: t
        ? ["50g புளி","1 லிட்டர் நீர்"]
        : ["50g tamarind","1L water"],
      apply: t?"மாலை நேரம்":"Evening",
      result: t?"3–4 நாட்கள்":"3–4 days"
    }
  };

  function handleImage(e){
    const f = e.target.files[0];
    if(f) setImage(URL.createObjectURL(f));
  }

  function analyzeImage(){
    if(!image){
      alert(t?"முதலில் படம் பதிவேற்றவும்":"Upload image first");
      return;
    }
    setAutoDetect(t
      ? "AI கணிப்பு: பூச்சி இருக்கலாம்"
      : "AI prediction: Pest likely");
  }

  return(
    <div style={styles.page}>
      <div style={styles.mobile}>

        <BottomNav />

        <h2 style={{color:"#fff",textAlign:"center"}}>
          {t?"இயற்கை பூச்சி கட்டுப்பாடு":"Natural Pest Control"}
        </h2>

        {/* 🌦 SEASON CALENDAR */}
        <div style={styles.card}>
          <h3>🗓 {t?"இந்த பருவத்தில் வரும் பூச்சிகள்":"Season-wise Pest Calendar"}</h3>
          <p style={{fontWeight:"bold"}}>
            {season==="kharif" && (t?"காரிஃப் (மழைக்காலம்)":"Kharif (Monsoon)")}
            {season==="rabi" && (t?"ரபி (குளிர்காலம்)":"Rabi (Winter)")}
            {season==="summer" && (t?"வெயில்காலம்":"Summer")}
          </p>
          <ul>
            {seasonCalendar[season]?.map((p,i)=>(
              <li key={i}>🐛 {p}</li>
            ))}
          </ul>
        </div>

        {/* IMAGE UPLOAD */}
        <div style={styles.card}>
          <input type="file" accept="image/*" onChange={handleImage}/>
          {image && <img src={image} style={styles.preview}/>}
          <button style={styles.button} onClick={analyzeImage}>
            {t?"AI கண்டறி":"Analyze"}
          </button>
          {autoDetect && <p>{autoDetect}</p>}
        </div>

        {/* SELECT */}
        <select style={styles.input} value={pest} onChange={e=>setPest(e.target.value)}>
          <option value="">{t?"பிரச்சனை தேர்வு":"Select Pest"}</option>
          {Object.keys(data).map(k=>(
            <option key={k} value={k}>{data[k].name}</option>
          ))}
        </select>

        {/* DETAILS */}
        {pest && (
          <div style={styles.card}>
            <img src={data[pest].img} style={styles.cropImg}/>
            <h3>🐛 {data[pest].name}</h3>
            <p>🌾 {t?"பாதிக்கும் பயிர்கள்":"Affected Crops"}: {data[pest].crops}</p>
            <p>🌿 {t?"தீர்வு":"Solution"}: {data[pest].solution}</p>

            <h4>🧪 {t?"தயாரிப்பு முறை":"Preparation"}</h4>
            <ol>
              {data[pest].prepare.map((s,i)=>(<li key={i}>{s}</li>))}
            </ol>

            <p>⏳ {t?"விளைவு":"Result"}: {data[pest].result}</p>

            <button
              style={{...styles.button,background:"#1b5e20"}}
              onClick={()=>speak(`${data[pest].name} ${data[pest].solution}`)}
            >
              🔊 {t?"கேட்க":"Listen"}
            </button>
          </div>
        )}

        <button style={styles.back} onClick={()=>navigate("/home")}>
          ⬅ {t?"முகப்பு":"Back to Home"}
        </button>

      </div>
    </div>
  );
}

/* ---------------- STYLES ---------------- */
const styles={
  page:{
    minHeight:"100vh",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1592921870957-0e6c87d0d79d')",
    backgroundSize:"cover",
    backgroundPosition:"center"
  },
  mobile:{
    width:"100%",
    maxWidth:420,
    background:"rgba(0,80,0,0.85)",
    borderRadius:22,
    padding:16
  },
  input:{width:"100%",padding:10,borderRadius:12,marginBottom:12},
  card:{background:"#e8ffe8",borderRadius:16,padding:14,marginBottom:12},
  preview:{width:"100%",borderRadius:12,marginTop:10},
  cropImg:{width:"100%",borderRadius:12,marginBottom:8},
  button:{width:"100%",padding:10,borderRadius:12,background:"#2e8b3d",color:"#fff",border:"none",marginTop:8},
  back:{width:"100%",padding:10,borderRadius:12,background:"#145a32",color:"#fff",border:"none",marginTop:10}
};
