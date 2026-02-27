import BottomNav from "../components/BottomNav";
import { useLanguage } from "../LanguageContext";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/image copy 8.png";

export default function Videos() {

  const { lang } = useLanguage();
  const t = lang === "ta";
  const navigate = useNavigate();

  const list = [
    {
      title: t ? "இயற்கை விவசாயம் அறிமுகம்" : "Intro to Natural Farming",
      link: "https://www.youtube.com/embed/G0B-m7vV4fA"
    },
    {
      title: t ? "உரம் தயாரிப்பு" : "Organic Fertilizer Guide",
      link: "https://www.youtube.com/embed/q6ioP1L1QZI"
    },
    {
      title: t ? "நீர் சேமிப்பு முறைகள்" : "Water Saving Methods",
      link: "https://www.youtube.com/embed/VI5jz7wKZ2o"
    }
  ];

  return (
    <div style={styles.screen}>

      {/* BACKGROUND OVERLAY */}
      <div style={styles.overlay}></div>

      {/* CONTENT */}
      <div style={styles.mobile}>

        <BottomNav />

        <div style={styles.header}>
          {t ? "கற்றல் வீடியோக்கள்" : "Learning Videos"}
        </div>

        <div style={styles.scrollArea}>
          {list.map((v, i) => (
            <div key={i} style={styles.card}>

              <div style={styles.title}>{v.title}</div>

              <iframe
                src={v.link}
                style={styles.video}
                allowFullScreen
              ></iframe>

            </div>
          ))}
        </div>

        {/* BACK BUTTON */}
        <button
          style={styles.back}
          onClick={() => navigate("/home")}
        >
          ⬅ {t ? "முகப்பு" : "Back to Home"}
        </button>

      </div>
    </div>
  );
}


/* ================= STYLES ================= */

const styles = {

  screen:{
    position:"fixed",
    inset:0,
    backgroundImage:`url(${bgImage})`,
    backgroundSize:"cover",
    backgroundPosition:"center",
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
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
    maxWidth:600,
    maxHeight:"90vh",
    overflowY:"auto",
    background:"rgba(75, 199, 27, 0.95)",
    borderRadius:22,
    padding:16,
    boxShadow:"0 18px 40px rgba(0,0,0,.3)"
  },

  header:{
    background:"linear-gradient(#6fdc6f,#3fbf3f)",
    color:"white",
    padding:12,
    borderRadius:14,
    textAlign:"center",
    fontWeight:"bold",
    marginBottom:10
  },

  scrollArea:{
    marginBottom:10
  },

  card:{
    background:"#f4fff4",
    borderRadius:14,
    padding:10,
    border:"1px solid #d6efd8",
    marginBottom:12
  },

  title:{
    fontWeight:"bold",
    marginBottom:8
  },

  video:{
    width:"100%",
    height:"180px",
    border:"none",
    borderRadius:10
  },

  back:{
    width:"100%",
    marginTop:12,
    padding:12,
    borderRadius:14,
    background:"#145a32",
    color:"white",
    border:"none",
    fontWeight:"bold",
    cursor:"pointer"
  }
};
