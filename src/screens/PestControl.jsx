import { useState, useEffect } from "react";
import { useLanguage } from "../LanguageContext";
import BottomNav from "../components/BottomNav";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/image copy 5.png";

export default function PestControl() {

  const { lang } = useLanguage();
  const t = lang === "ta";
  const navigate = useNavigate();

  const [pest, setPest] = useState("");
  const [image, setImage] = useState(null);
  const [autoDetect, setAutoDetect] = useState("");
  const [season, setSeason] = useState("");

  /* 🔊 Voice */
  function speak(text){
    const u = new SpeechSynthesisUtterance(text);
    u.lang = t ? "ta-IN" : "en-US";
    window.speechSynthesis.speak(u);
  }

  /* AUTO SEASON */
  useEffect(()=>{
    const m = new Date().getMonth()+1;
    if(m>=6 && m<=10) setSeason("kharif");
    else if(m>=11 || m<=2) setSeason("rabi");
    else setSeason("summer");
  },[]);

  /* SEASON DATA */
  const seasonCalendar = {
    kharif: t?["தண்டு துளைப்பான்","இலை பூச்சிகள்","பூஞ்சை நோய்"]:["Stem Borer","Leaf Insects","Fungal Disease"],
    rabi: t?["அஃபிட்ஸ்","திரிப்ஸ்"]:["Aphids","Thrips"],
    summer: t?["வேர் பூச்சிகள்","திரிப்ஸ்"]:["Root Worms","Thrips"]
  };

  /* PEST DATA */
  const data = {

    insects:{
      name:t?"இலை தின்று பூச்சிகள்":"Leaf Eating Insects",
      crops:t?"நெல், காய்கறிகள்":"Paddy, Vegetables",
      img:"https://images.unsplash.com/photo-1592921870957-0e6c87d0d79d",
      solution:t?"வேம்பெண்ணெய்":"Neem Oil",
      prepare:t?["5ml வேம்பெண்ணெய்","1L நீர்","2 துளி சோப்பு"]:["5ml neem oil","1L water","2 soap drops"]
    },

    aphids:{
      name:t?"அஃபிட்ஸ்":"Aphids",
      crops:t?"பருத்தி, மிளகாய்":"Cotton, Chilli",
      img:"https://images.unsplash.com/photo-1506808547685-e2ba962ded58",
      solution:t?"சோப்பு நீர்":"Soap Water",
      prepare:t?["10g சோப்பு","1L நீர்"]:["10g soap","1L water"]
    },

    fungus:{
      name:t?"பூஞ்சை நோய்":"Fungal Disease",
      crops:t?"நெல், வாழை":"Paddy, Banana",
      img:"https://images.unsplash.com/photo-1592924357228-91a6f63a64f4",
      solution:t?"மோர் தெளிப்பு":"Buttermilk Spray",
      prepare:t?["1L மோர்","5L நீர்","48 மணி"]:["1L buttermilk","5L water","48 hrs"]
    },

    stemBorer:{
      name:t?"தண்டு துளைப்பான்":"Stem Borer",
      crops:"Paddy",
      img:"https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
      solution:t?"வேப்ப விதை சாரம்":"Neem Seed Extract",
      prepare:t?["50g விதை","1L நீர்","12 மணி"]:["50g seed","1L water","12 hrs"]
    },

    thrips:{
      name:t?"திரிப்ஸ்":"Thrips",
      crops:t?"மிளகாய், வெங்காயம்":"Chilli, Onion",
      img:"https://images.unsplash.com/photo-1528825871115-3581a5387919",
      solution:t?"புளி நீர்":"Tamarind Water",
      prepare:t?["50g புளி","1L நீர்"]:["50g tamarind","1L water"]
    }
  };

  function handleImage(e){
    const f = e.target.files[0];
    if(f) setImage(URL.createObjectURL(f));
  }

  function analyzeImage(){
    if(!image) return alert(t?"படம் பதிவேற்றவும்":"Upload image");
    setAutoDetect(t?"AI கணிப்பு: பூச்சி":"AI prediction: Pest");
  }

  return(
    <div style={styles.screen}>

      <div style={styles.overlay}></div>

      <div style={styles.box}>

        <BottomNav />

        <h2 style={{textAlign:"center"}}>
          {t?"இயற்கை பூச்சி கட்டுப்பாடு":"Natural Pest Control"}
        </h2>

        <div style={styles.card}>
          <h4>{t?"இந்த பருவ பூச்சிகள்":"Season Pests"}</h4>
          <ul>
            {seasonCalendar[season]?.map((p,i)=><li key={i}>🐛 {p}</li>)}
          </ul>
        </div>

        <div style={styles.card}>
          <input type="file" accept="image/*" onChange={handleImage}/>
          {image && <img src={image} style={styles.preview}/>}
          <button style={styles.btn} onClick={analyzeImage}>
            {t?"AI கண்டறி":"Analyze"}
          </button>
          {autoDetect && <p>{autoDetect}</p>}
        </div>

        <select style={styles.input} value={pest} onChange={e=>setPest(e.target.value)}>
          <option value="">{t?"பூச்சி தேர்வு":"Select Pest"}</option>
          {Object.keys(data).map(k=>(
            <option key={k} value={k}>{data[k].name}</option>
          ))}
        </select>

        {pest && (
          <div style={styles.card}>
            <img src={data[pest].img} style={styles.preview}/>
            <h4>{data[pest].name}</h4>
            <p>🌾 {data[pest].crops}</p>
            <p>🌿 {data[pest].solution}</p>
            <ol>{data[pest].prepare.map((s,i)=><li key={i}>{s}</li>)}</ol>

            <button style={styles.btn} onClick={()=>speak(data[pest].solution)}>
              🔊 {t?"கேட்க":"Listen"}
            </button>
          </div>
        )}

      </div>

      <button style={styles.backBtn} onClick={()=>navigate("/home")}>
        ← Back
      </button>

    </div>
  );
}

/* ================= STYLES ================= */

const styles = {

  screen:{
    width:"100vw",
    height:"100vh",
    backgroundImage:`url(${bgImage})`,
    backgroundSize:"cover",
    backgroundPosition:"center",
    position:"fixed",
    top:0,
    left:0,
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
  },

  overlay:{
    position:"absolute",
    inset:0,
    background:"rgba(0,90,40,0.45)",
    zIndex:1
  },

  box:{
    position:"relative",
    zIndex:2,
    width:400,
    maxHeight:"85vh",
    overflowY:"auto",
    background:"rgba(18, 165, 21, 0.92)",
    borderRadius:20,
    padding:18,
    boxShadow:"0 12px 30px rgba(0,0,0,.35)"
  },

  card:{background:"#c0cdc0",padding:12,borderRadius:14,marginBottom:10},
  input:{width:"100%",padding:10,borderRadius:12,marginBottom:10},
  preview:{width:"100%",borderRadius:12,marginTop:8},
  btn:{width:"100%",padding:10,borderRadius:12,background:"#1b5e20",color:"#fff",border:"none",marginTop:8},

  backBtn:{
    position:"fixed",
    bottom:30,
    left:"50%",
    transform:"translateX(-50%)",
    padding:"10px 22px",
    borderRadius:24,
    background:"white",
    fontWeight:"bold",
    zIndex:3
  }
};
