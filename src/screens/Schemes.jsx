import { useState } from "react";
import { useLanguage } from "../LanguageContext";
import BottomNav from "../components/BottomNav";
import { useNavigate } from "react-router-dom";

export default function Schemes(){

  const { lang } = useLanguage();
  const t = lang === "ta";
  const navigate = useNavigate();

  const [open, setOpen] = useState("");

  return(
    <div style={styles.page}>
      <div style={styles.overlay}>

        <div style={styles.mobile}>
          <BottomNav />

          <h2>
            {t ? "அரசு திட்டங்கள் & காப்பீடு"
               : "Government Schemes & Insurance"}
          </h2>

          {/* ========== PM KISAN ========== */}
          <div style={styles.card}>
            <h3 onClick={()=>setOpen(open==="pm" ? "" : "pm")} style={styles.header}>
              🌾 PM-Kisan
            </h3>

            {open==="pm" && (
              <div>
                <p>{t?"ஆண்டுக்கு ரூ.6000 உதவி":"₹6000 yearly income support"}</p>
                <a href="https://pmkisan.gov.in" target="_blank" style={styles.link}>
                  pmkisan.gov.in
                </a>
              </div>
            )}
          </div>

          {/* ========== PMFBY ========== */}
          <div style={styles.card}>
            <h3 onClick={()=>setOpen(open==="pmfby" ? "" : "pmfby")} style={styles.header}>
              🛡 PMFBY (Crop Insurance)
            </h3>

            {open==="pmfby" && (
              <div>
                <p>{t?"பயிர் சேதத்திற்கு காப்பீடு":"Insurance for crop loss"}</p>
                <p>{t?"பிரீமியம் குறைவு":"Low premium"}</p>
                <a href="https://pmfby.gov.in" target="_blank" style={styles.link}>
                  pmfby.gov.in
                </a>
              </div>
            )}
          </div>

          {/* ========== SOIL HEALTH CARD ========== */}
          <div style={styles.card}>
            <h3 onClick={()=>setOpen(open==="soil" ? "" : "soil")} style={styles.header}>
              🌱 Soil Health Card
            </h3>

            {open==="soil" && (
              <div>
                <p>{t?"மண் பரிசோதனை & உர பரிந்துரை":"Soil test & fertilizer advice"}</p>
                <a href="https://soilhealth.dac.gov.in" target="_blank" style={styles.link}>
                  soilhealth.dac.gov.in
                </a>
              </div>
            )}
          </div>

          {/* ========== MICRO IRRIGATION ========== */}
          <div style={styles.card}>
            <h3 onClick={()=>setOpen(open==="irrigation" ? "" : "irrigation")} style={styles.header}>
              💧 Micro Irrigation (PMKSY)
            </h3>

            {open==="irrigation" && (
              <div>
                <p>{t?"டிரிப் & ஸ்பிரிங்க்லர் உதவி":"Drip & sprinkler subsidy"}</p>
                <a href="https://pmksy.gov.in" target="_blank" style={styles.link}>
                  pmksy.gov.in
                </a>
              </div>
            )}
          </div>

          {/* ========== ORGANIC FARMING ========== */}
          <div style={styles.card}>
            <h3 onClick={()=>setOpen(open==="organic" ? "" : "organic")} style={styles.header}>
              🌍 Organic Farming (PKVY)
            </h3>

            {open==="organic" && (
              <div>
                <p>{t?"இயற்கை விவசாய ஊக்கத்தொகை":"Support for organic farming"}</p>
                <a href="https://pgsindia-ncof.gov.in" target="_blank" style={styles.link}>
                  pgsindia-ncof.gov.in
                </a>
              </div>
            )}
          </div>

          {/* ========== KCC LOAN ========== */}
          <div style={styles.card}>
            <h3 onClick={()=>setOpen(open==="kcc" ? "" : "kcc")} style={styles.header}>
              🏦 Kisan Credit Card (KCC)
            </h3>

            {open==="kcc" && (
              <div>
                <p>{t?"குறைந்த வட்டி கடன்":"Low interest crop loan"}</p>
                <a href="https://www.myscheme.gov.in" target="_blank" style={styles.link}>
                  myscheme.gov.in
                </a>
              </div>
            )}
          </div>
          {/* ========== SUBSIDY SCHEMES ========== */}
<div style={styles.card}>

  <h3 onClick={()=>setOpen(open==="subsidy" ? "" : "subsidy")}
      style={styles.header}>
    💰 {t ? "மானியம் திட்டங்கள்" : "Subsidy Schemes"}
  </h3>

  {open==="subsidy" && (
    <div>
      <ul>
        <li>{t?"🚜 விவசாய இயந்திர மானியம்":"🚜 Farm Machinery Subsidy"}</li>
        <li>{t?"💧 டிரிப் / ஸ்பிரிங்க்லர் மானியம்":"💧 Micro Irrigation Subsidy"}</li>
        <li>{t?"🌱 விதை மானியம்":"🌱 Seed Subsidy"}</li>
        <li>{t?"⚡ சோலார் பம்ப் மானியம்":"⚡ Solar Pump Subsidy"}</li>
      </ul>

      <p style={{fontWeight:"bold"}}>
        {t?"விண்ணப்பிக்கும் முறை":"How to Apply"}
      </p>

      <ol>
        <li>{t?"விவசாய அலுவலகத்தை அணுகவும்":"Visit agriculture office"}</li>
        <li>{t?"ஆதார் & நில ஆவணம் சமர்ப்பிக்கவும்":"Submit Aadhaar & land records"}</li>
        <li>{t?"வங்கி கணக்கு இணைக்கவும்":"Link bank account"}</li>
      </ol>

      <a href="https://agricoop.nic.in"
         target="_blank"
         style={styles.link}>
        agricoop.nic.in
      </a>
    </div>
  )}
</div>
 
 {/* ========== LOAN SUPPORT ========== */}
<div style={styles.card}>

  <h3 onClick={()=>setOpen(open==="loanSupport" ? "" : "loanSupport")}
      style={styles.header}>
    🏦 {t ? "கடன் உதவி" : "Loan Support"}
  </h3>

  {open==="loanSupport" && (
    <div>

      <p>{t?"விவசாயிகளுக்கு குறைந்த வட்டி கடன்":"Low interest loans for farmers"}</p>

      <ul>
        <li>{t?"🌾 பயிர் கடன்":"🌾 Crop Loan"}</li>
        <li>{t?"🚜 இயந்திர கடன்":"🚜 Equipment Loan"}</li>
        <li>{t?"🏦 கிசான் கிரெடிட் கார்டு":"🏦 Kisan Credit Card (KCC)"}</li>
      </ul>

      <p style={{fontWeight:"bold"}}>
        {t?"விண்ணப்பிக்கும் முறை":"Steps to Apply"}
      </p>

      <ol>
        <li>{t?"வங்கியை அணுகவும்":"Visit nearest bank"}</li>
        <li>{t?"ஆதார் & நில ஆவணம் கொடுக்கவும்":"Provide Aadhaar & land record"}</li>
        <li>{t?"கடன் வகையை தேர்வு செய்யவும்":"Choose loan type"}</li>
      </ol>

      <a href="https://www.myscheme.gov.in"
         target="_blank"
         style={styles.link}>
        myscheme.gov.in
      </a>

    </div>
  )}
</div>
<button
  onClick={()=>speakTamil(
    "பிரதம மந்திரி கிசான் திட்டம். ஆண்டுக்கு ஆறு ஆயிரம் ரூபாய் விவசாயிகளுக்கு வழங்கப்படுகிறது"
  )}
  style={{marginTop:8}}
>
  🔊 {t?"கேட்க":"Listen"}
</button>


          {/* BACK BUTTON */}
          <button style={styles.back} onClick={()=>navigate("/home")}>
            ⬅ {t?"முகப்பு":"Back to Home"}
          </button>

        </div>
      </div>
    </div>
  );
}

/* ---------------- STYLES ---------------- */
const styles={

  page:{
    minHeight:"100vh",
    backgroundImage:"url('https://images.unsplash.com/photo-1501004318641-b39e6451bec6')",
    backgroundSize:"cover",
    backgroundPosition:"center"
  },

  overlay:{
    minHeight:"100vh",
    background:"rgba(0,90,0,0.75)",
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
  },

  mobile:{
    width:"100%",
    maxWidth:420,
    background:"#259125ff",
    borderRadius:22,
    boxShadow:"0 18px 45px rgba(0,0,0,.18)",
    padding:18,
    margin:"0 10px"
  },

  card:{
    background:"#f7fff7",
    borderRadius:16,
    padding:14,
    marginBottom:10,
    border:"1px solid #d8efd8"
  },

  header:{
    margin:0,
    cursor:"pointer"
  },

  link:{
    color:"#0066cc",
    fontWeight:"bold",
    textDecoration:"none"
  },

  back:{
    width:"100%",
    padding:10,
    borderRadius:12,
    background:"#145a32",
    color:"white",
    border:"none",
    fontWeight:"bold",
    marginTop:10
  }
};
