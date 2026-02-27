import { useLanguage } from "../LanguageContext";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";

export default function SmartWeather(){

  const { lang } = useLanguage();
  const t = lang === "ta";

  return(
    <div style={{padding:12}}>

      <Header title={t ? "ஸ்மார்ட் வானிலை அறிவுரை" : "Smart Weather Advice"} />

      <div style={styles.card}>
        <h3>{t ? "💧 இன்று பாசனம் தேவையில்லை" : "💧 No Irrigation Needed Today"}</h3>
        <p>
          {t 
           ? "இன்று மழை வாய்ப்பு இருப்பதால் பாசனம் செய்ய வேண்டாம்."
           : "Rain probability is high today. Avoid irrigation."}
        </p>
      </div>

      <div style={styles.card}>
        <h3>{t ? "🧴 தெளிப்பு தவிர்க்கவும்" : "🧴 Avoid Spraying Today"}</h3>
        <p>
          {t 
           ? "காற்று வேகம் அதிகம். பூச்சி மருந்து தெளிப்பதை ஒத்திவைக்கவும்."
           : "Wind speed is high. Postpone pesticide spraying."}
        </p>
      </div>

      <div style={styles.card}>
        <h3>{t ? "🌾 அறுவடை கவனமாக" : "🌾 Harvest Carefully"}</h3>
        <p>
          {t 
           ? "அடுத்த 2 நாட்கள் மழை இருக்கலாம். பயிரை பாதுகாக்கவும்."
           : "Rain expected next 2 days. Protect harvested crops."}
        </p>
      </div>

      <div style={styles.cardYellow}>
        <h3>{t ? "⚠ எச்சரிக்கை" : "⚠ Warning"}</h3>
        <p>
          {t 
           ? "வெப்ப அலை. அதிக வெப்பத்தில் வேலையை குறைக்கவும்."
           : "Heat alert. Avoid working under strong sunlight."}
        </p>
      </div>

      <BottomNav />
    </div>
  );
}

const styles = {

  card:{
    background:"#e9fff0",
    padding:14,
    borderRadius:14,
    marginBottom:12
  },

  cardYellow:{
    background:"#fff3cd",
    padding:14,
    borderRadius:14,
    marginBottom:12
  }
};



 /* ================= DATA ================= */
  const data = {

    paddy:{
      fert: t?"ஜீவாமிருதம் 5 லிட்டர் / ஏக்கர்":"Jeevamrutham 5L / acre",
      prep: t
        ? ["மாட்டு சாணம் + சிறுநீர்","கருப்பட்டி சேர்க்கவும்","24 மணி நேரம் ஊறவிடவும்"]
        : ["Cow dung + urine","Add jaggery","Ferment 24 hrs"],
      apply: t?"15 நாட்களுக்கு ஒருமுறை":"Every 15 days",
      safety: t?"கையுறை அணியவும்":"Wear gloves",
      benefit: t?"மண் வளம் உயரும்":"Improves soil fertility"
    },

    banana:{
      fert: t?"பஞ்சகவ்யம் 3 லிட்டர்":"Panchagavya 3L",
      prep: t
        ? ["பால், தயிர் சேர்க்கவும்","7 நாட்கள் ஊறவிடவும்"]
        : ["Add milk & curd","Ferment 7 days"],
      apply: t?"20 நாட்களுக்கு ஒருமுறை":"Every 20 days",
      safety: t?"நிழலில் வைக்கவும்":"Store in shade",
      benefit: t?"பழ தரம் உயரும்":"Better fruit quality"
    },

    groundnut:{
      fert: t?"வெர்மிகம்போஸ்ட்":"Vermicompost",
      prep: t?["கழிவுகளை குழியில் வைக்கவும்"]:["Put waste in pit"],
      apply: t?"விதைப்பு முன்":"Before sowing",
      safety: t?"பூச்சியிலிருந்து பாதுகாப்பு":"Protect from pests",
      benefit: t?"வேர் வளர்ச்சி":"Better root growth"
    },

    maize:{
      fert: t?"பஞ்சகவ்யம்":"Panchagavya",
      prep: t?["7 நாள் ஊறவிடவும்"]:["Ferment 7 days"],
      apply: t?"10–15 நாட்கள்":"10–15 days",
      safety: t?"குழந்தைகள் அருகில் வைக்காதீர்கள்":"Keep away from children",
      benefit: t?"வளர்ச்சி அதிகம்":"Faster growth"
    },

    cotton:{
      fert: t?"ஜீவாமிருதம்":"Jeevamrutham",
      prep: t?["24 மணி நேரம் ஊறவிடவும்"]:["Ferment 24 hrs"],
      apply: t?"15 நாட்கள்":"15 days",
      safety: t?"மூடி வைத்திருங்கள்":"Keep covered",
      benefit: t?"செலவு குறைவு":"Low cost"
    },

    sugarcane:{
      fert: t?"பஞ்சகவ்யம்":"Panchagavya",
      prep: t?["7 நாள் ஊறவிடவும்"]:["Ferment 7 days"],
      apply: t?"20 நாட்கள்":"20 days",
      safety: t?"நேரடி வெயிலில் வைக்காதீர்கள்":"Avoid sunlight",
      benefit: t?"இனிப்பு அளவு அதிகம்":"Better sweetness"
    },

    tomato:{
      fert: t?"ஜீவாமிருதம்":"Jeevamrutham",
      prep: t?["24 மணி நேரம்"]:["24 hrs"],
      apply: t?"10 நாட்கள்":"10 days",
      safety: t?"கையுறை":"Use gloves",
      benefit: t?"மகசூல் அதிகம்":"High yield"
    },

    onion:{
      fert: t?"வெர்மிகம்போஸ்ட்":"Vermicompost",
      prep: t?["மண்ணில் கலக்கவும்"]:["Mix with soil"],
      apply: t?"விதைப்பு முன்":"Before sowing",
      safety: t?"ஈரப்பதம் பராமரிக்கவும்":"Maintain moisture",
      benefit: t?"கிழங்கு வலிமை":"Strong bulbs"
    },

    chilli:{
      fert: t?"பஞ்சகவ்யம்":"Panchagavya",
      prep: t?["7 நாள்"]:["7 days"],
      apply: t?"15 நாட்கள்":"15 days",
      safety: t?"மூக்கு பாதுகாப்பு":"Use mask",
      benefit: t?"காய் தரம்":"Good quality"
    },

    pulses:{
      fert: t?"ஜீவாமிருதம்":"Jeevamrutham",
      prep: t?["24 மணி"]:["24 hrs"],
      apply: t?"20 நாட்கள்":"20 days",
      safety: t?"கையுறை":"Gloves",
      benefit: t?"நைட்ரஜன் அதிகரிப்பு":"Improves nitrogen"
    }

  };

  /* ================= UI ================= */
  return(
    <div style={styles.page}>
      <div style={styles.mobile}>

        <BottomNav />

        <h2 style={{textAlign:"center"}}>
          {t?"இயற்கை வேளாண்மை ஆலோசனை":"Natural Farming Advisor"}
        </h2>

        <select
          style={styles.input}
          value={crop}
          onChange={e=>setCrop(e.target.value)}
        >
          <option value="">{t?"பயிரை தேர்வு செய்க":"Select Crop"}</option>
          {Object.keys(data).map(c=>(
            <option key={c} value={c}>{c.toUpperCase()}</option>
          ))}
        </select>

        {crop && (
          <>
            <div style={styles.card}>
              <h3>🌿 {t?"இயற்கை உரம்":"Organic Fertilizer"}</h3>
              <p>{data[crop].fert}</p>
            </div>

            <div style={styles.card}>
              <h3>🧪 {t?"தயாரிப்பு":"Preparation"}</h3>
              <ul>{data[crop].prep.map((p,i)=><li key={i}>{p}</li>)}</ul>
            </div>

            <div style={styles.card}>
              <h3>📏 {t?"பயன்பாடு":"Usage"}</h3>
              <p>{data[crop].apply}</p>
            </div>

            <div style={styles.card}>
              <h3>⚠ {t?"பாதுகாப்பு":"Safety"}</h3>
              <p>{data[crop].safety}</p>
            </div>

            <div style={styles.card}>
              <h3>🌱 {t?"பயன்":"Benefit"}</h3>
              <p>{data[crop].benefit}</p>
            </div>

            <div style={styles.card}>
              <h3>⚖ {t?"இயற்கை vs ரசாயன":"Natural vs Chemical"}</h3>
              <p>✅ {t?"மண் ஆரோக்கியம் உயரும்":"Improves soil health"}</p>
              <p>❌ {t?"ரசாயன மீதிப்பாகம் இல்லை":"No chemical residue"}</p>
            </div>
          </>
        )}

        <button style={styles.back} onClick={()=>navigate("/home")}>
          ⬅ {t?"முகப்பு":"Home"}
        </button>

      </div>
    </div>
  );
}