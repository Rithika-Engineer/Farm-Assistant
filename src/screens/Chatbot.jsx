import { useState } from "react";
import { useLanguage } from "../LanguageContext";
import BottomNav from "../components/BottomNav";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/image copy 10.png";

export default function Chatbot(){

  const { lang } = useLanguage();
  const t = lang === "ta";
  const navigate = useNavigate();

  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: t
        ? "🙏 வணக்கம்! நான் உங்கள் AI விவசாய உதவியாளர். என்ன கேட்க விரும்புகிறீர்கள்?"
        : "🙏 Hello! I am your AI Farming Assistant. Ask me anything."
    }
  ]);

  const [input, setInput] = useState("");

  function getBotReply(userText){
    const text = userText.toLowerCase();

    if(text.includes("crop") || text.includes("பயிர்"))
      return t
        ? "🌾 உங்கள் நிலம், பருவம் சொல்லுங்கள். பயிர் பரிந்துரை தருகிறேன்."
        : "🌾 Tell me your land type and season. I’ll suggest crops.";

    if(text.includes("fertilizer") || text.includes("உரம்"))
      return t
        ? "🧪 இயற்கை உரம் நல்லது. ஜீவாமிருதம், பஞ்சகவ்யம் பயன்படுத்தலாம்."
        : "🧪 Organic fertilizers like Jeevamrutham and Panchagavya are good.";

    if(text.includes("pest") || text.includes("பூச்சி"))
      return t
        ? "🐛 வேம்பெண்ணெய், மோர் தெளிப்பு பூச்சிகளை கட்டுப்படுத்தும்."
        : "🐛 Neem oil and buttermilk spray help control pests.";

    if(text.includes("price") || text.includes("விலை"))
      return t
        ? "💰 சந்தை விலை பகுதியை திறந்து இன்று விலையை பார்க்கலாம்."
        : "💰 You can check today’s market price in the Market section.";

    if(text.includes("profit") || text.includes("லாபம்"))
      return t
        ? "📊 லாப கணக்கீட்டில் செலவு மற்றும் விலை உள்ளிடுங்கள்."
        : "📊 Enter cost and selling price in Profit Calculator.";

    return t
      ? "🤖 உங்கள் கேள்வி புரியவில்லை. சற்று தெளிவாக கேளுங்கள்."
      : "🤖 I didn’t understand. Please ask clearly.";
  }

  function send(){
    if(!input.trim()) return;

    const userMsg = { from:"user", text:input };
    const botMsg  = { from:"bot", text:getBotReply(input) };

    setMessages([...messages, userMsg, botMsg]);
    setInput("");
  }

  return(
    <div style={styles.screen}>

      {/* BACKGROUND OVERLAY */}
      <div style={styles.overlay}></div>

      {/* CONTENT */}
      <div style={styles.mobile}>

        <BottomNav />

        <div style={styles.header}>
          🤖 {t ? "AI விவசாய உதவியாளர்" : "AI Farming Assistant"}
        </div>

        <div style={styles.chatBox}>
          {messages.map((m,i)=>(
            <div
              key={i}
              style={{
                ...styles.msg,
                alignSelf: m.from==="user" ? "flex-end" : "flex-start",
                background: m.from==="user" ? "#c8f7c5" : "#ffffff"
              }}
            >
              {m.text}
            </div>
          ))}
        </div>

        <div style={styles.inputBar}>
          <input
            style={styles.input}
            value={input}
            onChange={e=>setInput(e.target.value)}
            placeholder={t?"உங்கள் கேள்வியை எழுதுங்கள்":"Type your question"}
          />

          <button style={styles.send} onClick={send}>
            ➤
          </button>
        </div>

        <button
          style={styles.back}
          onClick={()=>navigate("/home")}
        >
          ⬅ {t?"முகப்பு":"Back to Home"}
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

  mobile:{
    position:"relative",
    zIndex:2,
    width:"100%",
    maxWidth:550,
    maxHeight:"85vh",
    overflowY:"auto",
    background:"rgba(16, 163, 38, 0.95)",
    borderRadius:22,
    padding:16,
    boxShadow:"0 18px 40px rgba(0,0,0,.3)"
  },

  header:{
    background:"linear-gradient(#6fdc6f,#3fbf3f)",
    color:"white",
    textAlign:"center",
    padding:12,
    borderRadius:14,
    fontWeight:"bold",
    marginBottom:10
  },

  chatBox:{
    background:"#7ff671",
    height:300,
    borderRadius:14,
    padding:10,
    display:"flex",
    flexDirection:"column",
    gap:6,
    overflowY:"auto",
    marginBottom:10
  },

  msg:{
    maxWidth:"80%",
    padding:8,
    borderRadius:10,
    fontSize:14
  },

  inputBar:{
    display:"flex",
    gap:6
  },

  input:{
    flex:1,
    padding:10,
    borderRadius:12,
    border:"1px solid #54d61c"
  },

  send:{
    padding:"0 14px",
    borderRadius:12,
    border:"none",
    background:"#2e8b3d",
    color:"white",
    fontSize:18
  },

  back:{
    width:"100%",
    marginTop:8,
    padding:10,
    borderRadius:12,
    border:"none",
    background:"#145a32",
    color:"white"
  }
};
