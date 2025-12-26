import AccordionItem from "./AccordionItem";
import "./MobileMenu.css";

function MobileMenu() {
  return (
    <div className="mobile-menu">
      {/* Header */}
      <div className="mobile-menu-header"></div>

    {/* Men */}
      <AccordionItem title="Men">
        <a href="/">Perfumes</a>
        <a href="/">Perfume Oils</a>
        <a href="/">Deodorants</a>
      </AccordionItem>

    {/* Women */}
      <AccordionItem title="Women">
        <a href="/">Perfumes</a>
        <a href="/">Mists</a>
        <a href="/">Deodorants</a>
      </AccordionItem>

    {/* Sale */}
      <AccordionItem title="Sale">
        <a href="/">Men&apos;s Sale</a>
        <a href="/">Women&apos;s Sale</a>
        <a href="/">Clearance</a>
      </AccordionItem>

    {/* Contact */}
      <h4>Contact</h4>
      <p className="help_text">Need help?</p>

      <div className="cont_info">
        <i className="fa-solid fa-phone"></i>
        <p>+923331234567</p>
      </div>

      <div className="cont_info">
        <i className="fa-solid fa-envelope"></i>
        <p>info@perfumesmists.pk</p>
      </div>

      {/* Footer */}
      <div className="menu-bar-ftr">
        <h4>Perfumes Mists</h4>
      </div>
    </div>
  );
}

export default MobileMenu;
