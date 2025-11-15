import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/GoFit Logo1.png";
import { useToken } from "../../hooks/useToken";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/solid";

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
  const [isMenuUserOpen, setIsMenuUserOpen] = useState(false);
  const [isNutritionOpen, setIsNutritionOpen] = useState(false);
  const isMobile = useIsMobile();
  const { userName, setToken, setUserName } = useToken();

  const navigate = useNavigate();

  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const userSignedIn = userName;

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

  const handleToggleUser = () => {
    const newState = !isMenuUserOpen;
    setIsMenuUserOpen(newState);
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

  const handleLogout = () => {
    setToken("");
    setUserName("");
    localStorage.removeItem("user");
    setIsMenuUserOpen(false);
    navigate("/home");
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

              {userSignedIn && (
                <div>
                  <button
                    onClick={handleToggleUser}
                    className="w-full text-left rounded-full p-3 px-4 text-gray-50 font-sans text-xl hover:bg-roxo_menu_hover transition-colors duration-300 flex justify-between items-center"
                  >
                    <span>
                      Olá,{" "}
                      <span className="font-bold uppercase">
                        {userSignedIn}
                      </span>
                      !
                    </span>
                    <span
                      className={`transform transition-transform ${
                        isMenuUserOpen ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isMenuUserOpen ? "max-h-20" : "max-h-0"
                    }`}
                  >
                    <button
                      onClick={handleLogout}
                      className="w-full text-left rounded-2xl p-3 px-4 ml-4 text-gray-50 font-sans text-lg hover:bg-roxo_menu_hover transition-colors flex items-center gap-2"
                    >
                      <ArrowLeftEndOnRectangleIcon className="w-5 h-5" />
                      Sair
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        // Menu Desktop
        <div className="md:fixed top-0 w-full shadow z-50 scroll-smooth">
          <nav
            className={`flex flex-col md:flex-row  ${
              userSignedIn ? "justify-between" : "justify-evenly"
            } items-center p-4 gap-2 bg-roxo_menu rounded-md relative z-50`}
          >
            <div className="flex justify-center items-center gap-2 ">
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
                    <li className="bg-roxo_menu_hover hover:bg-roxo_menu px-3 py-3 rounded-2xl cursor-pointer">
                      <Link
                        to="/nutrition#macro-micro"
                        onClick={() => scrollToSection("macro-micro")}
                        className="block w-full h-full"
                      >
                        Macro x Micro
                      </Link>
                    </li>
                    <li className="bg-roxo_menu_hover hover:bg-roxo_menu px-3 py-3 rounded-2xl cursor-pointer">
                      <Link
                        to="/nutrition#caloria"
                        onClick={() => scrollToSection("caloria")}
                        className="block w-full h-full"
                      >
                        Caloria
                      </Link>
                    </li>
                    <li className="bg-roxo_menu_hover hover:bg-roxo_menu px-3 py-3 rounded-2xl cursor-pointer">
                      <Link
                        to="/nutrition#info-nutricional"
                        onClick={() => scrollToSection("info-nutricional")}
                        className="block w-full h-full"
                      >
                        Info Nutricional
                      </Link>
                    </li>
                    <li className="bg-roxo_menu_hover hover:bg-roxo_menu px-3 py-3 rounded-2xl cursor-pointer">
                      <Link
                        to="/nutrition#dieta"
                        onClick={() => scrollToSection("dieta")}
                        className="block w-full h-full"
                      >
                        Dieta
                      </Link>
                    </li>
                    <li className="bg-roxo_menu_hover hover:bg-roxo_menu px-3 py-3 rounded-2xl cursor-pointer">
                      <Link
                        to="/nutrition#saude-mental"
                        onClick={() => scrollToSection("saude-mental")}
                        className="block w-full h-full"
                      >
                        Saúde Mental
                      </Link>
                    </li>
                    <li className="bg-roxo_menu_hover hover:bg-roxo_menu px-3 py-3 rounded-2xl cursor-pointer">
                      <Link
                        to="/nutrition#fato-mito"
                        onClick={() => scrollToSection("fato-mito")}
                        className="block w-full h-full"
                      >
                        Fato x Mito
                      </Link>
                    </li>
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
            {userSignedIn && (
              <div className="relative">
                <button
                  onClick={handleToggleUser}
                  className="rounded-full p-2 px-4 text-gray-50 font-sans text-xl hover:bg-roxo_menu_hover transition-colors duration-300 ease-in-out"
                >
                  Olá,{" "}
                  <span className="font-bold uppercase">{userSignedIn}!</span>
                  <span
                    className={`ml-2 inline-block transition-transform ${
                      isMenuUserOpen ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>

                {isMenuUserOpen && (
                  <div className="absolute top-full right-0 mt-2 w-40 bg-roxo_menu_hover rounded-2xl text-white shadow-lg p-2 z-50">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left bg-roxo_menu_hover hover:bg-roxo_menu px-4 py-3 rounded-xl cursor-pointer flex items-center gap-2"
                    >
                      <ArrowLeftEndOnRectangleIcon className="w-5 h-5" />
                      Sair
                    </button>
                  </div>
                )}
              </div>
            )}
          </nav>
        </div>
      )}
    </div>
  );
}
