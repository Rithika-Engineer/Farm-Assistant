import { useState } from "react";
import { useLanguage } from "../LanguageContext";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/agricultureimg.png";

export default function VoiceAssistant(){

  const { lang } = useLanguage();
  const t = lang === "ta";
  const navigate = useNavigate();

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  let recognition = null;

  if("webkitSpeechRecognition" in window){
    let SpeechRecognition = window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.lang = t ? "ta-IN" : "en-US";
    recognition.continuous = false;
  }

  function speak(text){
    let msg = new SpeechSynthesisUtterance(text);
    msg.lang = t ? "ta-IN" : "en-US";
    window.speechSynthesis.speak(msg);
  }

  function reply(q){
    const text = q.toLowerCase();
    let res = "";

    if(t){
      if(text.includes("மழை") || text.includes("வானிலை"))
        res = "இன்று மழை வாய்ப்பு உள்ளது. இன்று தெளிப்பு செய்ய வேண்டாம்.";
      else if(text.includes("உரம்"))
        res = "மண் பரிசோதனை செய்து தேவையான உரம் மட்டும் பயன்படுத்தவும்.";
      else if(text.includes("நீர்"))
        res = "காலை அல்லது மாலை நேரத்தில் பாசனம் செய்வது சிறந்தது.";
      else if(text.includes("பூச்சி"))
        res = "வேம்பெண்ணெய் தெளிப்பு இயற்கையான பூச்சி கட்டுப்பாடு ஆகும்.";
      else if(text.includes("விதை"))
        res = "சான்றளிக்கப்பட்ட தரமான விதைகள் பயன்படுத்தவும்.";
      else if(text.includes("அரசு"))
        res = "அருகிலுள்ள விவசாய அலுவலகத்தை தொடர்பு கொள்ளவும்.";
      else if(text.includes("லாபம்"))
        res = "செலவு மற்றும் வருமானத்தை பதிவு செய்து கணக்கிடுங்கள்.";
      else
        res = "உங்கள் கேள்வி புரிந்தது. தெளிவாக மீண்டும் கேளுங்கள்.";
    } else {
      if(text.includes("rain") || text.includes("weather"))
        res = "There is a chance of rain today. Avoid spraying.";
      else if(text.includes("fertilizer"))
        res = "Do soil testing and apply only required fertilizer.";
      else if(text.includes("water"))
        res = "Water crops in the morning or evening.";
      else if(text.includes("pest"))
        res = "Neem oil spray is a safe natural solution.";
      else if(text.includes("seed"))
        res = "Use certified quality seeds.";
      else if(text.includes("scheme"))
        res = "Please contact your nearest agriculture office.";
      else
        res = "I understand. Please ask clearly.";
    }

    setAnswer(res);
    speak(res);
  }

  function startListening(){
    if(!recognition){
      alert("Speech not supported in this browser");
      return;
    }

    recognition.start();
    recognition.onresult = (e)=>{
      let text = e.results[0][0].transcript;
      setQuestion(text);
      reply(text);
    };
  }

  return(
    <div style={styles.screen}>

      <div style={styles.overlay}></div>

      <div style={styles.container}>

        <h2 style={{textAlign:"center"}}>
          {t ? "விவசாய குரல் உதவியாளர்" : "Farmer Voice Assistant"}
        </h2>

        <p style={{textAlign:"center",opacity:.7}}>
          {t ? "உங்கள் கேள்வியை பேசுங்கள்" : "Speak your question"}
        </p>

        <button style={styles.micBtn} onClick={startListening}>
          🎤 {t ? "பேச ஆரம்பியுங்கள்" : "Start Talking"}
        </button>

        <div style={styles.card}>
          <h4>{t ? "உங்கள் கேள்வி" : "Your Question"}</h4>
          <p>{question || (t?"இங்கே தோன்றும்":"Will appear here")}</p>
        </div>

        <div style={styles.card}>
          <h4>{t ? "பதில்" : "Answer"}</h4>
          <p>{answer || (t?"இங்கே தோன்றும்":"Will appear here")}</p>
        </div>

        <button
          style={styles.backBtn}
          onClick={()=>navigate("/home")}
        >
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
    maxWidth:520,
    maxHeight:"85vh",
    overflowY:"auto",
    background:"rgba(38, 219, 65, 0.95)",
    borderRadius:22,
    padding:20,
    boxShadow:"0 18px 40px rgba(0,0,0,.35)"
  },

  card:{
    background:"#f6fff6",
    padding:12,
    borderRadius:14,
    marginTop:10,
    border:"1px solid #cfeccc"
  },

  micBtn:{
    width:"100%",
    padding:14,
    background:"#0f8c28",
    color:"white",
    fontSize:18,
    border:"none",
    borderRadius:14,
    margin:"12px 0"
  },

  backBtn:{
    width:"100%",
    padding:12,
    background:"#145a32",
    color:"white",
    fontSize:16,
    border:"none",
    borderRadius:14,
    marginTop:12
  }
};
