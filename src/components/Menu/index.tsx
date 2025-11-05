import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/GoFit Logo1.png";

interface Menu {
  onToggleMenu: (isOpen: boolean) => void;
}

function useIsMobile(breakpoint: number = 768): boolean {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < breakpoint);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
}

export function Menu({ onToggleMenu }: Menu) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNutritionOpen, setIsNutritionOpen] = useState(false);
  const isMobile = useIsMobile();

  // Use useRef para o timeout evitar memory leaks
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Limpar timeout ao desmontar
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 300);
  };

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    // Fecha o menu e notifica o pai
    setIsMenuOpen(false);
    onToggleMenu(false);
  };

  const toggleNutritionMenu = () => {
    setIsNutritionOpen(!isNutritionOpen);
  };

  const handleToggleMenu = () => {
    const newState = !isMenuOpen;
    setIsMenuOpen(newState);
    onToggleMenu(newState);

    if (!newState) {
      setIsNutritionOpen(false);
    }
  };

  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
    onToggleMenu(false);
    setIsNutritionOpen(false);
  };

  return (
    <div>
      {isMobile ? (
        <div className="fixed top-0 w-full z-50">
          <div className="flex justify-between items-center p-4 bg-roxo_menu">
            <div className="flex justify-center items-center gap-2">
              <img
                src={logo}
                alt="Homem levantando peso"
                className="w-10 h-10"
              />
              <Link to="/home" onClick={handleMenuItemClick}>
                <h1 className="text-gray-50 font-sans text-4xl">GoFit</h1>
              </Link>
            </div>

            <button
              onClick={handleToggleMenu}
              className="flex flex-col justify-center items-center w-10 h-10 focus:outline-none"
              aria-label="Menu"
            >
              <span
                className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                  isMenuOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"
                }`}
              />
              <span
                className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
                  isMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                  isMenuOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"
                }`}
              />
            </button>
          </div>

          <div
            className={`bg-roxo_menu overflow-hidden transition-all duration-300 ease-in-out ${
              isMenuOpen ? "max-h-screen" : "max-h-0"
            }`}
          >
            <div className="px-4 py-2 space-y-2">
              <Link to="/gym" onClick={handleMenuItemClick}>
                <button className="w-full text-left rounded-full p-3 px-4 text-gray-50 font-sans text-xl hover:bg-roxo_menu_hover transition-colors duration-300">
                  Academia
                </button>
              </Link>

              {/* Menu Nutrição com Submenu */}
              <div>
                <button
                  onClick={toggleNutritionMenu}
                  className="w-full text-left rounded-full p-3 px-4 text-gray-50 font-sans text-xl hover:bg-roxo_menu_hover transition-colors duration-300 flex justify-between items-center"
                >
                  Nutrição
                  <span
                    className={`transform transition-transform ${
                      isNutritionOpen ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>

                {/* Submenu Nutrição */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isNutritionOpen ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <div className="pl-4 space-y-1 mt-2">
                    <Link to="/nutrition" onClick={handleMenuItemClick}>
                      <button
                        onClick={() => scrollToSection("macro-micro")}
                        className="w-full text-left rounded-2xl p-3 px-4 text-gray-50 font-sans text-lg hover:bg-roxo_menu_hover transition-colors"
                      >
                        Macro x Micro
                      </button>
                    </Link>
                    <Link to="/nutrition" onClick={handleMenuItemClick}>
                      <button
                        onClick={() => scrollToSection("caloria")}
                        className="w-full text-left rounded-2xl p-3 px-4 text-gray-50 font-sans text-lg hover:bg-roxo_menu_hover transition-colors"
                      >
                        Caloria
                      </button>
                    </Link>
                    <Link to="/nutrition" onClick={handleMenuItemClick}>
                      <button
                        onClick={() => scrollToSection("info-nutricional")}
                        className="w-full text-left rounded-2xl p-3 px-4 text-gray-50 font-sans text-lg hover:bg-roxo_menu_hover transition-colors"
                      >
                        Info Nutricional
                      </button>
                    </Link>
                    <Link to="/nutrition" onClick={handleMenuItemClick}>
                      <button
                        onClick={() => scrollToSection("dieta")}
                        className="w-full text-left rounded-2xl p-3 px-4 text-gray-50 font-sans text-lg hover:bg-roxo_menu_hover transition-colors"
                      >
                        Dieta
                      </button>
                    </Link>
                    <Link to="/nutrition" onClick={handleMenuItemClick}>
                      <button
                        onClick={() => scrollToSection("saude-mental")}
                        className="w-full text-left rounded-2xl p-3 px-4 text-gray-50 font-sans text-lg hover:bg-roxo_menu_hover transition-colors"
                      >
                        Saúde Mental
                      </button>
                    </Link>
                    <Link to="/nutrition" onClick={handleMenuItemClick}>
                      <button
                        onClick={() => scrollToSection("fato-mito")}
                        className="w-full text-left rounded-2xl p-3 px-4 text-gray-50 font-sans text-lg hover:bg-roxo_menu_hover transition-colors"
                      >
                        Fato x Mito
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

              <Link to="/calculators" onClick={handleMenuItemClick}>
                <button className="w-full text-left rounded-full p-3 px-4 text-gray-50 font-sans text-xl hover:bg-roxo_menu_hover transition-colors duration-300">
                  Calculadoras
                </button>
              </Link>

              <Link to="/checkin" onClick={handleMenuItemClick}>
                <button className="w-full text-left rounded-full p-3 px-4 text-gray-50 font-sans text-xl hover:bg-roxo_menu_hover transition-colors duration-300">
                  Check-in
                </button>
              </Link>

              <Link to="/about" onClick={handleMenuItemClick}>
                <button className="w-full text-left rounded-full p-3 px-4 text-gray-50 font-sans text-xl hover:bg-roxo_menu_hover transition-colors duration-300">
                  Quem Somos
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        // Menu Desktop
        <div className="md:fixed top-0 w-full shadow z-50 scroll-smooth">
          <nav className="flex flex-col md:flex-row justify-evenly items-center p-4 gap-2 bg-roxo_menu rounded-md relative z-50">
            <div className="flex justify-center items-center gap-2">
              <Link
                to="/home"
                className="flex justify-center items-center gap-2"
              >
                <img
                  src={logo}
                  alt="Homem levantando peso"
                  className="w-10 h-10"
                />
                <h1 className="text-gray-50 font-sans text-4xl">GoFit</h1>
              </Link>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row relative">
              <Link to="/gym">
                <button className="rounded-full p-2 px-4 text-gray-50 font-sans text-xl hover:bg-roxo_menu_hover transition-colors duration-300 ease-in-out">
                  Academia
                </button>
              </Link>

              <div
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Link to="/nutrition">
                  <button className="rounded-full p-2 px-4 text-gray-50 font-sans text-xl hover:bg-roxo_menu_hover transition-colors duration-300 ease-in-out">
                    Nutrição
                  </button>
                </Link>

                {isHovered && (
                  <ul
                    className="absolute top-full left-0 w-28 bg-roxo_menu_hover rounded-3xl text-white shadow-lg p-2 z-50 space-y-2"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link to={"/nutrition"}>
                      <li className="bg-roxo_menu_hover hover:bg-roxo_menu px-3 py-3 rounded-2xl cursor-pointer">
                        <a
                          href="#macro-micro"
                          className="block w-full h-full"
                          onClick={() => scrollToSection("macro-micro")}
                        >
                          Macro x Micro
                        </a>
                      </li>
                      <li className="bg-roxo_menu_hover hover:bg-roxo_menu px-3 py-3 rounded-2xl cursor-pointer">
                        <a
                          href="#caloria"
                          className="block w-full h-full"
                          onClick={() => scrollToSection("caloria")}
                        >
                          Caloria
                        </a>
                      </li>
                      <li className="bg-roxo_menu_hover hover:bg-roxo_menu px-3 py-3 rounded-2xl cursor-pointer">
                        <a
                          href="#info-nutricional"
                          className="block w-full h-full"
                          onClick={() => scrollToSection("info-nutricional")}
                        >
                          Info Nutricional
                        </a>
                      </li>
                      <li className="bg-roxo_menu_hover hover:bg-roxo_menu px-3 py-3 rounded-2xl cursor-pointer">
                        <a
                          href="#dieta"
                          className="block w-full h-full"
                          onClick={() => scrollToSection("dieta")}
                        >
                          Dieta
                        </a>
                      </li>
                      <li
                        className="bg-roxo_menu_hover hover:bg-roxo_menu px-3 py-3 rounded-2xl cursor-pointer"
                        onClick={() => scrollToSection("saude-mental")}
                      >
                        <a href="#saude-mental" className="block w-full h-full">
                          Saúde Mental
                        </a>
                      </li>
                      <li className="bg-roxo_menu_hover hover:bg-roxo_menu px-3 py-3 rounded-2xl cursor-pointer">
                        <a
                          href="#fato-mito"
                          className="block w-full h-full"
                          onClick={() => scrollToSection("fato-mito")}
                        >
                          Fato x Mito
                        </a>
                      </li>
                    </Link>
                  </ul>
                )}
              </div>

              <Link to="/calculators">
                <button className="rounded-full p-2 px-4 text-gray-50 font-sans text-xl hover:bg-roxo_menu_hover transition-colors duration-300 ease-in-out">
                  Calculadoras
                </button>
              </Link>

              <Link to="/checkin">
                <button className="rounded-full p-2 px-4 text-gray-50 font-sans text-xl hover:bg-roxo_menu_hover transition-colors duration-300 ease-in-out">
                  Check-in
                </button>
              </Link>

              <Link to="/about">
                <button className="rounded-full p-2 px-4 text-gray-50 font-sans text-xl hover:bg-roxo_menu_hover transition-colors duration-300 ease-in-out">
                  Quem Somos
                </button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
