import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../LanguageContext";

export default function SeasonCrops(){

  const { lang } = useLanguage();
  const t = lang === "ta";

  const navigate = useNavigate();

  const [season, setSeason] = useState("");
  const [crop, setCrop] = useState("");
  const [lastCrop, setLastCrop] = useState("");

  function T(en, ta){
    return t ? ta : en;
  }

  function cropName(n){
    const ta = {
      Paddy:"நெல்",
      Maize:"சோளம்",
      Groundnut:"நிலக்கடலை",
      Soybean:"சோயாபீன்",
      Cotton:"பருத்தி",
      Chilli:"மிளகாய்",
      Wheat:"கோதுமை",
      Mustard:"கடுகு",
      Watermelon:"தர்பூசணி",
      Sesame:"எள்",
      Onion:"வெங்காயம்",
      Peas:"பட்டாணி"
    };
    return t ? (ta[n] || n) : n;
  }

  useEffect(()=>{
    const m = new Date().getMonth()+1;
    if(m>=6 && m<=10) setSeason("kharif");
    else if(m>=11 || m<=2) setSeason("rabi");
    else setSeason("summer");

    const last = localStorage.getItem("lastCrop");
    if(last) setLastCrop(last);
  },[]);


  const crops={
    kharif:["Paddy","Maize","Groundnut","Cotton","Soybean","Chilli"],
    rabi:["Wheat","Mustard","Onion","Peas","Gram"],
    summer:["Watermelon","Sesame","Green gram","Cowpea"]
  };


  const cropInfo={

    Paddy:{
      img:"https://images.unsplash.com/photo-1592921870957-0e6c87d0d79d",
      soil:T("Clay / Loamy","மண்ணாறு / கரிமண்"),
      water:T("High","அதிகம்"),
      days:T("120–150 days","120–150 நாட்கள்"),
      fert:T("Nitrogen important","நைட்ரஜன் முக்கியம்"),
      next:T("Pulses / Sesame","பருப்பு / எள்"),
      speak:T("நெல் பயிருக்கு அதிக நீர் தேவைப்படுகிறது")
    },

    Maize:{
      img:"https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
      soil:T("Well drained soil","நன்றாக வடிகாலம் உள்ள மண்"),
      water:T("Medium","மிதமானது"),
      days:T("90–110 days","90–110 நாட்கள்"),
      fert:T("Balanced NPK","NPK சமநிலை"),
      next:T("Green gram / Cowpea","பச்சைப்பயறு / கவர்பீன்"),
      speak:T("சோளம் நல்ல வருமானம் தரும் பயிர்")
    },

    Groundnut:{
      img:"https://images.unsplash.com/photo-1603039289970-7e9ff9e3ea51",
      soil:T("Sandy loam","மணல் கலந்த மண்"),
      water:T("Low","குறைவு"),
      days:T("100–120 days","100–120 நாட்கள்"),
      fert:T("Gypsum useful","ஜிப்சம் உதவும்"),
      next:T("Maize / Paddy","சோளம் / நெல்"),
      speak:T("நிலக்கடலை குறைந்த செலவு பயிர்")
    },

    Soybean:{
      img:"https://images.unsplash.com/photo-1599313589823-46c3c2598b33",
      soil:T("Loamy soil","கரிமண்"),
      water:T("Medium","மிதமான நீர்"),
      days:T("100–130 days","100–130 நாட்கள்"),
      fert:T("Phosphate needed","பாஸ்பேட் முக்கியம்"),
      next:T("Wheat / Maize","கோதுமை / சோளம்"),
      speak:T("சோயாபீன் புரதம் அதிகமுள்ள பயிர்")
    },

    Cotton:{
      img:"https://images.unsplash.com/photo-1506808547685-e2ba962ded58",
      soil:T("Black soil","கரிமண் / கருப்பு மண்"),
      water:T("Medium","மிதமானது"),
      days:T("150–180 days","150–180 நாட்கள்"),
      fert:T("Potash required","பொட்டாசியம் அவசியம்"),
      next:T("Vegetables / Pulses","காய்கறி / பருப்பு"),
      speak:T("பருத்தி நல்ல சந்தை விலையுள்ள பயிர்")
    },

    Chilli:{
      img:"https://images.unsplash.com/photo-1592924357228-91a6f63a64f4",
      soil:T("Well drained","நன்றாக வடிகாலம் உள்ள மண்"),
      water:T("Medium","மிதமானது"),
      days:T("150–200 days","150–200 நாட்கள்"),
      fert:T("Organic manure helps","ஆர்கானிக் உரம் உதவும்"),
      next:T("Pulses","பருப்பு வகைகள்"),
      speak:T("மிளகாய் நோய் தாக்குதலுக்கு ஆளாகும் பயிர்")
    },

    Wheat:{
      img:"https://images.unsplash.com/photo-1606326608690-4e4ab813a2e8",
      soil:T("Loamy","கரிமண்"),
      water:T("Low","குறைவு"),
      days:T("120–140 days","120–140 நாட்கள்"),
      fert:T("Nitrogen early","ஆரம்பத்தில் நைட்ரஜன்"),
      next:T("Mustard / Pulses","கடுகு / பருப்பு"),
      speak:T("கோதுமை குளிர் கால பயிர் ஆகும்")
    },

    Mustard:{
      img:"https://images.unsplash.com/photo-1563201515-adbe35c669c5",
      soil:T("Loamy","கரிமண்"),
      water:T("Low","குறைவு"),
      days:T("90–120 days","90–120 நாட்கள்"),
      fert:T("Sulphur needed","சல்பர் அவசியம்"),
      next:T("Wheat / Vegetables","கோதுமை / காய்கறிகள்"),
      speak:T("கடுகு எண்ணெய் பயிர் ஆகும்")
    },

    Watermelon:{
      img:"https://images.unsplash.com/photo-1528825871115-3581a5387919",
      soil:T("Sandy loam","மணல் கலந்த மண்"),
      water:T("Medium","மிதமானது"),
      days:T("80–100 days","80–100 நாட்கள்"),
      fert:T("Organic manure good","ஆர்கானிக் உரம் நல்லது"),
      next:T("Pulses","பருப்பு வகைகள்"),
      speak:T("தர்பூசணி கோடை கால பயிர்")
    },

    Sesame:{
      img:"https://images.unsplash.com/photo-1615485296237-03d32a7eceae",
      soil:T("Well drained","வடிகாலம் உள்ள மண்"),
      water:T("Low","குறைவு"),
      days:T("90–120 days","90–120 நாட்கள்"),
      fert:T("Less fertilizer needed","குறைந்த உரம் போதுமானது"),
      next:T("Paddy / Vegetables","நெல் / காய்கறி"),
      speak:T("எள் ஒரு ஆரோக்கியமான எண்ணெய் பயிர்")
    }
  };


  function speakText(txt){
    if(!window.speechSynthesis) return;
    const msg = new SpeechSynthesisUtterance(txt);
    msg.lang = t ? "ta-IN" : "en-IN";
    window.speechSynthesis.speak(msg);
  }


  return(
    <div style={styles.page}>
      <div style={styles.box}>

        <h2>{T("Season-wise Crop Guide","பருவப்படி பயிர் வழிகாட்டி")}</h2>

        <select style={styles.input} value={season} onChange={e=>setSeason(e.target.value)}>
          <option value="kharif">{T("Kharif (Jun–Oct)","காரிஃப் (ஜூன்–அக்)")}</option>
          <option value="rabi">{T("Rabi (Nov–Feb)","ரபி (நவ–பிப்)")}</option>
          <option value="summer">{T("Summer (Mar–May)","வெயில் (மார்–மே)")}</option>
        </select>


        <div style={styles.card}>
          <h3>{T("Recommended Crops","பரிந்துரைக்கப்பட்ட பயிர்கள்")}</h3>

          {crops[season]?.map(c=>(
            <div key={c} style={styles.crop}
              onClick={()=>{ setCrop(c); localStorage.setItem("lastCrop",c); setLastCrop(c); }}>

              <img src={cropInfo[c]?.img} style={{width:55,height:55,borderRadius:10,marginRight:10}}/>
              {cropName(c)}
            </div>
          ))}
        </div>


        {crop && (
          <div style={styles.card}>

            <img src={cropInfo[crop]?.img} style={{width:"100%",borderRadius:12}}/>

            <h3 style={{textAlign:"center"}}>🌾 {cropName(crop)}</h3>

            <p>🌍 {T("Soil","உகந்த மண்")}: {cropInfo[crop]?.soil}</p>
            <p>💧 {T("Water Need","நீர் தேவைகள்")}: {cropInfo[crop]?.water}</p>
            <p>⏳ {T("Growing Days","வளரும் நாட்கள்")}: {cropInfo[crop]?.days}</p>
            <p>🧴 {T("Fertilizer Suggestion","உரம் பரிந்துரை")}: {cropInfo[crop]?.fert}</p>
            <p>🌱 {T("Next Crop","அடுத்த பயிர்")}: {cropInfo[crop]?.next}</p>

            {lastCrop===crop && (
              <p style={{color:"red"}}>
                ⚠ {T("Warning: Same crop reduces soil nutrients","எச்சரிக்கை: ஒரே பயிர் மண் சக்தியை குறைக்கும்")}
              </p>
            )}

            <button style={styles.voice}
              onClick={()=>speakText(cropInfo[crop]?.speak)}>
              🎤 {T("Play Voice","ஒலி கேட்க")}
            </button>

          </div>
        )}


        <button style={styles.back} onClick={()=>navigate("/home")}>
          ⬅ {T("Back to Home","முதற்பக்கத்திற்கு")}
        </button>

      </div>
    </div>
  );
}



const styles={

  page:{minHeight:"100vh",display:"flex",justifyContent:"center",alignItems:"center",
    background:"#e5ffe6"},

  box:{width:"100%",maxWidth:480,background:"#1fdf52ff",padding:18,borderRadius:20,
    boxShadow:"0 15px 40px rgba(0,0,0,.15)"},

  input:{width:"100%",padding:10,borderRadius:10,marginBottom:12},

  card:{background:"#f5fff5",padding:12,borderRadius:14,marginBottom:12},

  crop:{display:"flex",alignItems:"center",background:"#dfffdc",
    padding:10,borderRadius:12,marginBottom:8,cursor:"pointer"},

  voice:{width:"100%",padding:10,borderRadius:10,border:"none",
    background:"#2196f3",color:"white",fontWeight:"bold"},

  back:{width:"100%",padding:10,borderRadius:12,border:"none",
    background:"#0a8d2c",color:"white",fontWeight:"bold"}
};
