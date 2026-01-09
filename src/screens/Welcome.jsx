import { useNavigate } from "react-router-dom";
import { useLanguage } from "../LanguageContext";
import logo from "../assets/logo.png";


export default function Welcome() {

  const { lang } = useLanguage();
  const t = lang === "ta";
  const navigate = useNavigate();

  return (
    <div style={styles.page}>

      <div style={styles.mobile}>

        {/* LOGO */}
       <div style={styles.logoCircle}>
  <img src={logo} alt="App Logo" style={{ width: 70 }} />
</div>


        {/* APP NAME */}
        <div style={styles.title}>
          {t ? "விவசாய உதவி" : "Farmer Assistant"}
        </div>

        {/* SUB TEXT */}
        <div style={styles.sub}>
          {t
            ? "இயற்கை வேளாண்மை • வானிலை • வழிகாட்டுதல்"
            : "Natural Farming • Weather • Support"}
        </div>

        {/* BUTTON */}
        <button
          style={styles.btn}
          onClick={() => navigate("/language")}
        >
          {t ? "தொடங்கு" : "Get Started"}
        </button>

      </div>

    </div>
  );
}


const styles = {

  page:{
    height:"100vh",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    background:"linear-gradient(#9fffa2,#e8ffe9)"
  },

  mobile:{
    width:420,
    background:"#4be352ff",
    borderRadius:22,
    boxShadow:"0 18px 45px rgba(0,0,0,.18)",
    padding:20,
    textAlign:"center"
  },

  logoCircle:{
    width:90,
    height:90,
    background:"#2acb32ff",
    borderRadius:"50%",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    margin:"20px auto"
  },

  title:{
    fontSize:24,
    fontWeight:"bold",
    marginTop:10
  },

  sub:{
    color:"#555",
    marginTop:6,
    marginBottom:30
  },

  btn:{
    background:"green",
    color:"white",
    padding:14,
    borderRadius:16,
    fontSize:16,
    border:"none",
    width:"100%"
  }
};
