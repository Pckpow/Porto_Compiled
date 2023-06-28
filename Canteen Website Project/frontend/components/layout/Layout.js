import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout({ children, withoutFooter, isFixed = false }) {
  return (
    <>
      {/* Navbar */}
      <Navbar isFixed={isFixed} />
      {children}
      {/* Footer */}
      {!withoutFooter && <Footer />}
    </>
  );
}
