import "../styles/globals.css";
import { Poppins, Inder } from "@next/font/google";
import { CartProvider } from "../context/cart/cartContext";
import Compose from "../context/Compose";
import { UserProvider } from "../context/user/userContext";
import { PopupProvider } from "../context/popup/popupContext";
import { KursiProvider } from "../context/pesankursi/kursiContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const inder = Inder({ subsets: ["latin"], weight: "400" });

function MyApp({ Component, pageProps }) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${poppins.style.fontFamily} ${inder.style.fontFamily};
        }
      `}</style>
      <Compose
        components={[UserProvider, CartProvider, KursiProvider, PopupProvider]}
      >
        <Component {...pageProps} />
      </Compose>
    </>
  );
}

export default MyApp;
