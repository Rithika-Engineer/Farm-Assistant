import { useState } from "react";
import { useLanguage } from "../LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "../components/Layout";
import { Search, Bug, Leaf, AlertTriangle } from "lucide-react";

const pests = [
  {
    nameEn: "Stem Borer",
    nameTa: "தண்டு துளைப்பான்",
    emoji: "🐛",
    symptoms: "Dead heart in young plants, white ear in mature plants",
    symptomsTa: "இளம் தாவரங்களில் இறந்த மையம், முதிர்ந்தவற்றில் வெள்ளை கதிர்",
    treatment: "Apply Carbofuran 3G or use light traps",
    treatmentTa: "கார்போஃபுரான் 3G தெளி அல்லது ஒளி பொறி வைக்கவும்",
    severity: "high",
    crop: "Paddy",
  },
  {
    nameEn: "Aphids",
    nameTa: "அட்டைப் பூச்சி",
    emoji: "🪲",
    symptoms: "Curling of leaves, sticky honeydew, sooty mold",
    symptomsTa: "இலைகள் சுருண்டல், பிசுக்கு, கறுப்பு அச்சு",
    treatment: "Spray neem oil (5ml/L) or release ladybird beetles",
    treatmentTa: "வேம்பெண்ணெய் 5ml/L தெளி அல்லது முட்டைக்கோஸ் வண்டுகளை விடவும்",
    severity: "medium",
    crop: "Vegetables",
  },
  {
    nameEn: "Fall Armyworm",
    nameTa: "வீழ்ச்சி படையெடுப்பு புழு",
    emoji: "🐌",
    symptoms: "Irregular windowing of leaves, frass presence",
    symptomsTa: "இலைகளில் ஒழுங்கற்ற துளைகள், மலம் காணப்படும்",
    treatment: "Apply Spinetoram or Spinosad. Use pheromone traps",
    treatmentTa: "ஸ்பின்டோரம் அல்லது ஸ்பினோசாட் தெளி. ஃபெரோமோன் பொறி வையுங்கள்",
    severity: "high",
    crop: "Maize",
  },
  {
    nameEn: "Whitefly",
    nameTa: "வெள்ளை ஈ",
    emoji: "🦟",
    symptoms: "Yellowing of leaves, sticky substance under leaf",
    symptomsTa: "இலை மஞ்சளாவது, இலை அடியில் பிசுக்கு",
    treatment: "Yellow sticky traps + neem extract spray",
    treatmentTa: "மஞ்சள் ஒட்டும் பொறி + வேம்பெண்ணெய் தெளி",
    severity: "medium",
    crop: "Cotton",
  },
  {
    nameEn: "Leaf Rust",
    nameTa: "இலை துரு",
    emoji: "🍂",
    symptoms: "Orange pustules on leaves, premature defoliation",
    symptomsTa: "இலைகளில் ஆரஞ்சு நிற கொப்புளங்கள், இலை உதிர்வு",
    treatment: "Spray Propiconazole 25EC at 0.1%",
    treatmentTa: "புரோபிகோனசோல் 25EC 0.1% தெளி",
    severity: "medium",
    crop: "Wheat",
  },
];

const severityConfig = {
  high: { label: "High Risk", labelTa: "அதிக ஆபத்து", bg: "#FEE2E2", color: "#DC2626", dot: "#EF4444" },
  medium: { label: "Medium", labelTa: "நடுத்தர", bg: "#FEF9C3", color: "#92400E", dot: "#F59E0B" },
  low: { label: "Low", labelTa: "குறைவு", bg: "#D1FAE5", color: "#065F46", dot: "#10B981" },
};

export default function PestControl() {
  const { lang } = useLanguage();
  const t = lang === "ta";
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const filtered = pests.filter(p =>
    (t ? p.nameTa : p.nameEn).toLowerCase().includes(search.toLowerCase()) ||
    p.crop.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout title={t ? "பூச்சி கட்டுப்பாடு" : "Pest Control"}>
      <div style={{ padding: "16px 16px 0" }}>

        {/* Search */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ position: "relative", marginBottom: 16 }}>
          <Search size={16} color="#9CA3AF" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} />
          <input
            className="input-field"
            style={{ paddingLeft: 42 }}
            placeholder={t ? "பூச்சி அல்லது பயிர் தேட..." : "Search pest or crop..."}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </motion.div>

        {/* AI Detect Banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          style={{
            background: "linear-gradient(135deg, #F0FDF4, #EBF4FF)",
            borderRadius: 18, padding: "14px 16px",
            marginBottom: 16,
            border: "1px solid #BFDBFE",
            display: "flex", alignItems: "center", gap: 12,
          }}
        >
          <div style={{ fontSize: 32 }}>📷</div>
          <div>
            <p style={{ fontSize: 13, fontWeight: 700, color: "#111827", marginBottom: 2 }}>
              {t ? "AI பூச்சி கண்டறிதல்" : "AI Pest Detection"}
            </p>
            <p style={{ fontSize: 12, color: "#6B7280" }}>
              {t ? "பயிர் படம் எடுத்து AI மூலம் அறிந்துகொள்ளுங்கள்" : "Take a photo of your crop for instant AI diagnosis"}
            </p>
          </div>
          <motion.button
            whileTap={{ scale: 0.94 }}
            style={{
              flexShrink: 0, padding: "8px 14px",
              borderRadius: 12, border: "none",
              background: "linear-gradient(135deg, #2F80ED, #27AE60)",
              color: "#fff", fontSize: 12, fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(47,128,237,0.3)",
            }}
          >
            {t ? "பயன்படுத்து" : "Use AI"}
          </motion.button>
        </motion.div>

        {/* Pest List */}
        <p style={{ fontSize: 13, fontWeight: 700, color: "#6B7280", marginBottom: 10, textTransform: "uppercase", letterSpacing: 0.4 }}>
          {t ? "பொதுவான பூச்சிகள்" : "Common Pests"}
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {filtered.map((pest, i) => {
            const sev = severityConfig[pest.severity];
            const isOpen = selected === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                style={{
                  background: "#fff", borderRadius: 18,
                  boxShadow: "0 4px 16px rgba(0,0,0,0.07)",
                  border: isOpen ? "1.5px solid #2F80ED" : "1px solid #E5E7EB",
                  overflow: "hidden",
                }}
              >
                <button
                  onClick={() => setSelected(isOpen ? null : i)}
                  style={{
                    width: "100%", padding: "14px 16px",
                    background: "none", border: "none", cursor: "pointer",
                    display: "flex", alignItems: "center", gap: 12, textAlign: "left",
                  }}
                >
                  <div style={{
                    width: 46, height: 46, borderRadius: 14,
                    background: sev.bg,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 22, flexShrink: 0,
                  }}>
                    {pest.emoji}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 14, fontWeight: 700, color: "#111827", marginBottom: 3 }}>
                      {t ? pest.nameTa : pest.nameEn}
                    </p>
                    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                      <span style={{
                        padding: "2px 8px", borderRadius: 20, fontSize: 10, fontWeight: 700,
                        background: sev.bg, color: sev.color,
                      }}>
                        <span style={{ display: "inline-block", width: 5, height: 5, borderRadius: "50%", background: sev.dot, marginRight: 4 }} />
                        {t ? sev.labelTa : sev.label}
                      </span>
                      <span style={{ fontSize: 11, color: "#9CA3AF" }}>🌾 {pest.crop}</span>
                    </div>
                  </div>
                  <AlertTriangle size={16} color={sev.dot} />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28 }}
                      style={{ overflow: "hidden" }}
                    >
                      <div style={{ padding: "0 16px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
                        <div style={{ background: "#FFF5F5", borderRadius: 12, padding: "12px" }}>
                          <p style={{ fontSize: 11, fontWeight: 700, color: "#DC2626", marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.3 }}>
                            ⚠️ {t ? "அறிகுறிகள்" : "Symptoms"}
                          </p>
                          <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.5 }}>
                            {t ? pest.symptomsTa : pest.symptoms}
                          </p>
                        </div>
                        <div style={{ background: "#F0FDF4", borderRadius: 12, padding: "12px" }}>
                          <p style={{ fontSize: 11, fontWeight: 700, color: "#065F46", marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.3 }}>
                            ✅ {t ? "சிகிச்சை" : "Treatment"}
                          </p>
                          <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.5 }}>
                            {t ? pest.treatmentTa : pest.treatment}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </Layout>
  );
}
