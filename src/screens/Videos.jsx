import { useLanguage } from "../LanguageContext";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
import { PlayCircle, Clock, Eye } from "lucide-react";

const videos = [
  {
    titleEn: "Intro to Natural Farming",
    titleTa: "இயற்கை விவசாயம் அறிமுகம்",
    link: "https://www.youtube.com/embed/G0B-m7vV4fA",
    duration: "12:34",
    views: "2.4M",
    category: "Farming",
    emoji: "🌿",
  },
  {
    titleEn: "Organic Fertilizer Guide",
    titleTa: "உரம் தயாரிப்பு",
    link: "https://www.youtube.com/embed/q6ioP1L1QZI",
    duration: "08:22",
    views: "1.1M",
    category: "Fertilizer",
    emoji: "🧪",
  },
  {
    titleEn: "Water Saving Methods",
    titleTa: "நீர் சேமிப்பு முறைகள்",
    link: "https://www.youtube.com/embed/VI5jz7wKZ2o",
    duration: "15:10",
    views: "850K",
    category: "Irrigation",
    emoji: "💧",
  },
];

const categories = ["All", "Farming", "Fertilizer", "Irrigation", "Pest Control"];

export default function Videos() {
  const { lang } = useLanguage();
  const t = lang === "ta";

  return (
    <Layout title={t ? "கற்றல் வீடியோக்கள்" : "Learning Videos"}>
      <div style={{ padding: "16px 16px 0" }}>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: 16 }}
        >
          <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }} className="scrollbar-hide">
            {categories.map((cat, i) => (
              <motion.div
                key={cat}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04 }}
                style={{
                  flexShrink: 0,
                  padding: "6px 14px",
                  borderRadius: 20,
                  background: i === 0 ? "linear-gradient(135deg, #2F80ED, #27AE60)" : "#fff",
                  border: i === 0 ? "none" : "1.5px solid #E5E7EB",
                  color: i === 0 ? "#fff" : "#374151",
                  fontSize: 12, fontWeight: 600, cursor: "pointer",
                  boxShadow: i === 0 ? "0 4px 12px rgba(47,128,237,0.3)" : "none",
                }}
              >
                {cat}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Video Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {videos.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 + i * 0.1 }}
              style={{
                background: "#fff",
                borderRadius: 20,
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                border: "1px solid #E5E7EB",
              }}
            >
              {/* Thumbnail / Embed */}
              <div style={{ position: "relative", paddingTop: "56.25%", background: "#F3F4F6" }}>
                <iframe
                  src={v.link}
                  style={{
                    position: "absolute", top: 0, left: 0,
                    width: "100%", height: "100%",
                    border: "none",
                  }}
                  allowFullScreen
                  loading="lazy"
                  title={v.titleEn}
                />
              </div>

              {/* Card Details */}
              <div style={{ padding: "14px 16px" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: "linear-gradient(135deg, #EBF4FF, #EDFBF1)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, fontSize: 18,
                  }}>
                    {v.emoji}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 14, fontWeight: 700, color: "#111827", marginBottom: 4, lineHeight: 1.3 }}>
                      {t ? v.titleTa : v.titleEn}
                    </p>
                    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                      <span style={{
                        padding: "2px 8px", borderRadius: 20,
                        background: "#EBF4FF", color: "#2F80ED",
                        fontSize: 10, fontWeight: 700,
                      }}>
                        {v.category}
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 11, color: "#9CA3AF" }}>
                        <Clock size={10} /> {v.duration}
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 11, color: "#9CA3AF" }}>
                        <Eye size={10} /> {v.views}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </Layout>
  );
}
