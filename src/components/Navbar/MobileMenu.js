import AccordionItem from "./AccordionItem";
import "./MobileMenu.css";
import { Link } from "react-router-dom";

const MobileMenu = ({ onClose }) => {
  return (
    <>

        <div className="mobile-menu">
      {/* Header */}
      <div className="mobile-menu-header">
        <i className="fa-solid fa-xmark" onClick={onClose}></i>
      </div>

    {/* Men */}
      <AccordionItem title="Men">
        <Link to="/men">Perfumes</Link>
        <Link to="/men">Perfume Oils</Link>
        <Link to="/men">Deodorants</Link>
      </AccordionItem>

    {/* Women */}
      <AccordionItem title="Women">
        <Link to="/women">Perfumes</Link>
        <Link to="/women">Mists</Link>
        <Link to="/women">Deodorants</Link>
      </AccordionItem>

    {/* Sale */}
      <AccordionItem title="Sale">
        <Link to="/">Men&apos;s Sale</Link>
        <Link to="/">Women&apos;s Sale</Link>
        <Link to="/">Clearance</Link>
      </AccordionItem>

    {/* Contact */}
     <AccordionItem title="Contact">
      <p className="help_text">Need help?</p>

      <div className="cont_info">
        <i className="fa-solid fa-phone"></i>
        <p>+923331234567</p>
      </div>

      <div className="cont_info">
        <i className="fa-solid fa-envelope"></i>
        <p>info@perfumesmists.pk</p>
      </div>
      </AccordionItem>

      {/* Footer */}
      <div className="menu-bar-ftr">
        <h4>Perfumes Mists</h4>
         <div className="icons">
            <i className="fa-brands fa-facebook-f"></i>
            <i className="fa-brands fa-instagram"></i>
            <i className="fa-brands fa-x-twitter"></i>
          </div>
      </div>
    </div>
    </>

  );
}

export default MobileMenu;
