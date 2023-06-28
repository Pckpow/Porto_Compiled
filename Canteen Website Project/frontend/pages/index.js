import Layout from "../components/layout/Layout";
import RecomendationSection from "../components/ui/homepage/section2/RecomendationSection";
import SearchSection from "../components/ui/homepage/section1/SearchSection";
import MenuSection from "../components/ui/homepage/section3/MenuSection";
import Cart from "../components/ui/homepage/Cart";
import PopupSign from "../components/layout/PopupSign";
import { useContext } from "react";
import { PopupContext } from "../context/popup/popupContext";

export default function Home() {
  const { state: popupState } = useContext(PopupContext);
  return (
    <Layout isFixed={true}>
      {popupState && <PopupSign />}
      {/* Section 1 */}
      <SearchSection />
      {/* Section 2 */}
      <RecomendationSection />
      {/* Section 3 */}
      <MenuSection />
      <Cart />
    </Layout>
  );
}
