import { useState } from "react";
import { useLanguage } from "../LanguageContext";
import { useNavigate } from "react-router-dom";

export default function VoiceAssistant(){

  const { lang } = useLanguage();
  const t = lang === "ta";
  const navigate = useNavigate();   // ✅ added

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

    // ------------ TAMIL MODE ------------
    if(t){

      if(text.includes("மழை") || text.includes("வானிலை"))
        res = "இன்று மழை வாய்ப்பு உள்ளது. இன்று தெளிப்பு செய்ய வேண்டாம்.";

      else if(text.includes("உரம்") || text.includes("fertilizer"))
        res = "மண் பரிசோதனை செய்து தேவையான உரம் மட்டும் பயன்படுத்தவும்.";

      else if(text.includes("நீர்") || text.includes("பாசனம்"))
        res = "காலை அல்லது மாலை நேரத்தில் பாசனம் செய்வது சிறந்தது.";

      else if(text.includes("பூச்சி") || text.includes("வண்டு"))
        res = "வேம்பெண்ணெய் தெளிப்பு இயற்கையான பூச்சி கட்டுப்பாடு ஆகும்.";

      else if(text.includes("விதை"))
        res = "சான்றளிக்கப்பட்ட தரமான விதைகள் பயன்படுத்தவும்.";

      else if(text.includes("அரசு திட்டம்"))
        res = "அருகிலுள்ள விவசாய அலுவலகத்தை தொடர்பு கொள்ளவும்.";

      else if(text.includes("லாபம்") || text.includes("இழப்பு"))
        res = "செலவு மற்றும் வருமானத்தை பதிவு செய்து கணக்கிடுங்கள்.";

      else if(text.includes("நன்றி"))
        res = "நன்றி! நான் எப்போதும் உதவ தயாராக இருக்கிறேன்.";

      else
        res = "உங்கள் கேள்வி புரிந்தது. தயவு செய்து தெளிவாக மீண்டும் கேளுங்கள்.";
    }

    // ------------ ENGLISH MODE ------------
    else {

      if(text.includes("rain") || text.includes("weather"))
        res = "There is a chance of rain today. Avoid spraying chemicals.";

      else if(text.includes("fertilizer"))
        res = "Do soil testing first and use only required fertilizer.";

      else if(text.includes("water") || text.includes("irrigation"))
        res = "Water crops in the morning or evening only.";

      else if(text.includes("pest") || text.includes("insect"))
        res = "Neem oil spray is a natural and safe pest control.";

      else if(text.includes("seed"))
        res = "Use certified seeds for better crop yield.";

      else if(text.includes("scheme") || text.includes("government"))
        res = "Please contact your nearest agriculture office.";

      else if(text.includes("profit") || text.includes("loss"))
        res = "Record all expenses and income to calculate profit.";

      else if(text.includes("thank"))
        res = "You’re welcome! Happy farming.";

      else
        res = "I understand your question. Please ask clearly.";
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
    <div style={page}>

      <div style={mobile}>

        <h2 style={{textAlign:"center"}}>
          {t ? "விவசாய குரல் உதவியாளர்" : "Farmer Voice Assistant"}
        </h2>

        <p style={{textAlign:"center",opacity:.7}}>
          {t ? "உங்கள் கேள்வியை பேசுங்கள்" : "Speak your question"}
        </p>

        {/* MIC BUTTON */}
        <button style={micBtn} onClick={startListening}>
          🎤 {t ? "பேச ஆரம்பியுங்கள்" : "Start Talking"}
        </button>

        {/* QUESTION */}
        <div style={card}>
          <h4>{t ? "உங்கள் கேள்வி" : "Your Question"}</h4>
          <p>{question || (t?"இங்கே தோன்றும்":"Will appear here")}</p>
        </div>

        {/* ANSWER */}
        <div style={card}>
          <h4>{t ? "பதில்" : "Answer"}</h4>
          <p>{answer || (t?"இங்கே தோன்றும்":"Will appear here")}</p>
        </div>

        {/* ✅ BACK BUTTON */}
        <button
          style={backBtn}
          onClick={()=>navigate("/home")}
        >
          ⬅ {t ? "முகப்பு" : "Back to Home"}
        </button>

      </div>
    </div>
  );
}

/* ---------- STYLES ---------- */

const page = {
  minHeight:"100vh",
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  background:"#eafbe8"
};

const mobile = {
  maxWidth:440,
  width:"95%",
  background:"green",
  borderRadius:18,
  padding:18,
  boxShadow:"0 12px 35px rgba(0,0,0,.15)"
};

const card = {
  background:"#f6fff6",
  padding:12,
  borderRadius:14,
  marginTop:10,
  border:"1px solid #cfeccc"
};

const micBtn = {
  width:"100%",
  padding:14,
  background:"#1cb43a",
  color:"white",
  fontSize:18,
  border:"none",
  borderRadius:14,
  margin:"12px 0"
};

const backBtn = {
  width:"100%",
  padding:12,
  background:"#145a32",
  color:"white",
  fontSize:16,
  border:"none",
  borderRadius:14,
  marginTop:12
};
