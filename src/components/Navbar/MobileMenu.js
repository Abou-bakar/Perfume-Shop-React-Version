import AccordionItem from "./AccordionItem";
import { createPortal } from "react-dom";
import "./MobileMenu.css";
import { Link } from "react-router-dom";

const MobileMenu = ({isOpen, onClose}) => {
  return createPortal(
    <>
     {/* Overlay */}
      {/* <div
        className={`nav-overlay ${isOpen ? "show" : ""}`}
        onClick={onClose}
      /> */}

        <div className={`mobile-menu ${isOpen ? "open": ""}`}>
      {/* Header */}
      <div className="mobile-menu-header">
        <i className="fa-solid fa-xmark" onClick={onClose}></i>
      </div>

    {/* Men */}
      <AccordionItem title="Men">
        <Link to="/">Perfumes</Link>
        <Link to="/">Perfume Oils</Link>
        <Link to="/">Deodorants</Link>
      </AccordionItem>

    {/* Women */}
      <AccordionItem title="Women">
        <Link to="/">Perfumes</Link>
        <Link to="/">Mists</Link>
        <Link to="/">Deodorants</Link>
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
    </>,
    document.body

  );
}

export default MobileMenu;
