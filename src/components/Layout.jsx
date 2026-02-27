import Header from "./Header";
import BottomNav from "./BottomNav";

export default function Layout({ children }) {
  return (
    <div className="web-root">
      <Header />

      <div className="web-wrapper">
        {children}
      </div>

      <BottomNav />
    </div>
  );
}
