import { useLanguage } from "../LanguageContext";
import { useNavigate } from "react-router-dom";

export default function Language(){

  const { lang, changeLang } = useLanguage();
  const navigate = useNavigate();

  function tamil(){ changeLang("ta"); }
  function english(){ changeLang("en"); }

  function goNext(){ navigate("/profile"); }

  return(
    <div style={styles.page}>

      {/* Green overlay */}
      <div style={styles.overlay}></div>

      {/* Main Box */}
      <div style={styles.box}>

        <h2 style={{marginBottom:12}}>
          {lang==="ta" ? "மொழியை தேர்வு செய்க" : "Select Language"}
        </h2>

        <button style={styles.btn} onClick={tamil}>
          தமிழ்
        </button>

        <button style={styles.btn} onClick={english}>
          English
        </button>

        <p style={{fontWeight:"bold"}}>
          {lang==="ta" ? "தேர்ந்தெடுத்த மொழி: தமிழ்" : "Selected: English"}
        </p>

        <button style={styles.next} onClick={goNext}>
          {lang==="ta" ? "தொடரவும்" : "Continue"}
        </button>

      </div>

    </div>
  );
}



const styles={

  /* FULL SCREEN PAGE */
  page:{
    height:"100vh",
    width:"100%",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",

    /* Farming background image */
    backgroundImage:`url("https://images.unsplash.com/photo-1501004318641-b39e6451bec6")`,
    backgroundSize:"cover",
    backgroundPosition:"center",
    position:"relative"
  },

  /* Green transparent overlay */
  overlay:{
    position:"absolute",
    top:0,
    left:0,
    right:0,
    bottom:0,
    background:"rgba(0,100,30,0.45)"
  },

  /* WHITE CARD */
  box:{
    position:"relative",
    background:"#57f581ff",
    padding:22,
    borderRadius:18,
    boxShadow:"0 12px 30px rgba(0,0,0,.35)",
    textAlign:"center",
    width:320
  },

  /* Language buttons */
  btn:{
    width:"100%",
    padding:12,
    marginBottom:10,
    borderRadius:12,
    border:"1px solid #ccc",
    fontSize:16,
    fontWeight:"bold",
    background:"#20bb4aff"
  },

  /* Continue button */
  next:{
    width:"100%",
    padding:12,
    background:"#20bb4aff",
    color:"white",
    border:"none",
    borderRadius:12,
    fontWeight:"bold",
    marginTop:10,
    fontSize:16,
    boxShadow:"0 3px 10px rgba(0,0,0,.25)"
  }
};
