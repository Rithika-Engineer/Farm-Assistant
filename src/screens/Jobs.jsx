import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Jobs(){

  const navigate = useNavigate();
  const [tab, setTab] = useState("edu");

  return(
    <div style={styles.page}>

      <div style={styles.mobile}>

        {/* ✅ BACK TO HOME */}
        <button style={styles.back} onClick={()=>navigate("/home")}>
          ⬅ Home
        </button>

        <h2 style={{textAlign:"center"}}>
          👨‍🌾 வேலை வாய்ப்புகள்
        </h2>

        {/* TOGGLE TABS */}
        <div style={styles.tabs}>
          <button 
            style={ tab==="edu" ? styles.tabActive : styles.tab }
            onClick={()=>setTab("edu")}
          >
            🎓 கல்வி சார்ந்த வேலைகள்
          </button>

          <button 
            style={ tab==="gen" ? styles.tabActive : styles.tab }
            onClick={()=>setTab("gen")}
          >
            🌾 பொதுவான வேலைகள்
          </button>
        </div>


        {/* EDUCATION JOBS */}
        {tab==="edu" && (
          <div>

            <JobCard 
              title="Agriculture Extension Assistant"
              edu="Diploma / Degree in Agriculture"
              age="No age limit (Govt rules apply)"
              pay="₹15,000 – ₹30,000"
              type="Government / NGO"
            />

            <JobCard 
              title="Farming Trainer / Field Instructor"
              edu="Any Degree / Agriculture Knowledge"
              age="18+"
              pay="₹12,000 – ₹25,000"
              type="Private / Training Centres"
            />

            <JobCard 
              title="Soil / Water Testing Assistant"
              edu="Science / Agriculture Background"
              age="18+"
              pay="₹10,000 – ₹22,000"
              type="Govt Labs / Pvt Labs"
            />

            <JobCard 
              title="Agri Sales & Support Executive"
              edu="12th / Diploma / Degree"
              age="18+"
              pay="₹10,000 – ₹28,000"
              type="Fertilizer / Seed Companies"
            />

          </div>
        )}


        {/* GENERAL JOBS */}
        {tab==="gen" && (
          <div>

            <JobCard 
              title="Organic Farming Staff"
              edu="No education required"
              age="18+"
              pay="₹8,000 – ₹18,000"
              type="Farms / Organic Units"
            />

            <JobCard 
              title="Greenhouse Worker"
              edu="Basic reading useful"
              age="18+"
              pay="₹9,000 – ₹20,000"
              type="Polyhouse / Floriculture"
            />

            <JobCard 
              title="Farm Equipment Helper"
              edu="Not required"
              age="18+"
              pay="₹9,000 – ₹22,000"
              type="Service Centres"
            />

          </div>
        )}


        <div style={styles.note}>
          ⭐ அரசு அறிவிப்பு வந்தால் — பதிவு செய்ய லிங்க் சேர்க்கலாம்  
          ⭐ இந்த வேலைகள் உதாரணமாக மட்டும்
        </div>

      </div>
    </div>
  );
}



function JobCard({title,edu,age,pay,type}){
  return(
    <div style={styles.card}>
      <h3>📌 {title}</h3>
      <p>🎓 கல்வி: {edu}</p>
      <p>🎯 வயது: {age}</p>
      <p>💰 சம்பளம்: {pay}</p>
      <p>🏢 துறை: {type}</p>

      <button style={styles.apply}>
        🔗 Apply / Contact Info (Coming Soon)
      </button>

      
    </div>
  );
}



const styles={

  page:{
    minHeight:"100vh",
    background:"#e8ffe9",
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
  },

  mobile:{
    width:"100%",
    maxWidth:420,
    background:"white",
    borderRadius:18,
    padding:15,
    boxShadow:"0 15px 40px rgba(0,0,0,.15)"
  },

  back:{
    border:"none",
    background:"none",
    fontSize:16,
    marginBottom:5,
    cursor:"pointer",
    fontWeight:"bold"
  },

  tabs:{
    display:"flex",
    gap:10,
    marginBottom:10
  },

  tab:{
    flex:1,
    padding:8,
    borderRadius:12,
    border:"1px solid #777",
    background:"#fff"
  },

  tabActive:{
    flex:1,
    padding:8,
    borderRadius:12,
    border:"1px solid green",
    background:"#b7ffbf"
  },

  card:{
    background:"#f6fff6",
    padding:12,
    borderRadius:14,
    marginBottom:10,
    border:"1px solid #cdeccd"
  },

  apply:{
    marginTop:5,
    padding:"8px 10px",
    borderRadius:10,
    border:"none",
    background:"#1daa2b",
    color:"white"
  },

  note:{
    marginTop:5,
    fontSize:12,
    opacity:.7
  }
};
