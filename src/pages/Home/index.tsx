import { Menu } from "../../components/Menu";
import running from "../../assets/images/Foto home 2 (1).png";
import nutricao from "../../assets/images/nutricao.jpeg";
import academia from "../../assets/images/academia.jpg";
import calculadora from "../../assets/images/calculadora.jpg";
import { Link } from "react-router-dom";
import { useState } from "react";

export function Home() {
  const [_isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = (isOpen: boolean) => {
    setIsMenuOpen(isOpen);
  };

  return (
    <div>
      <Menu onToggleMenu={handleToggleMenu} />
      <div>
        <section className="min-h-screen mt-[4.5rem] md:mt-[70px] bg-gradient-to-br from-roxo_padrao to-roxo-gradiente px-4 py-12 md:py-20">
          <div className="container mx-auto max-w-7xl">
            <div className="flex flex-col md:flex-row justify-center items-center text-center md:text-left gap-8 md:gap-12">
              <div className="flex flex-col text-center md:text-left font-roboto flex-1 order-2 md:order-1">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-4 font-bold leading-tight">
                  Bem-vindo à <span className="text-gray-50">Gofit</span>!
                </h1>
                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                  O seu guia para saúde e fitness!
                </p>
                <p className="text-base sm:text-lg max-w-[500px] mt-3 mx-auto md:mx-0">
                  Seu recurso preferido para obter informações sobre nutrição e
                  inspiração para exercícios físicos
                </p>
              </div>
              <div className="flex w-full max-w-md md:max-w-lg order-1 md:order-2">
                <img
                  src={running}
                  alt="Pessoas correndo"
                  className="w-full h-full object-contain drop-shadow-2xl rounded-2xl transform hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="py-20 bg-gradient-to-b from-gray-50 to-purple-50">
          <div className="container mx-auto px-6">
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="space-y-4">
                <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600  bg-clip-text text-transparent">
                  Descubra tudo sobre GoFit
                </h2>
              </div>
              <p className="text-xl text-gray-700 mt-6 max-w-3xl mx-auto">
                Explore nossas ferramentas e informações sobre nutrição,
                academia e saúde!
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto">
              {/* Nutrição Card */}
              <div className="group relative bg-gray-50 rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-green-300 border-4 border-transparent hover:border-green-400">
                <div className="absolute top-0 right-0 bg-gradient-to-bl from-green-500 to-emerald-500 text-gray-50 px-6 py-2 rounded-bl-3xl font-bold text-sm shadow-lg">
                  Popular
                </div>

                <div className="flex flex-col justify-betwenn p-8">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-200 to-emerald-200 rounded-full blur-xl opacity-50"></div>
                    <img
                      src={nutricao}
                      alt="Nutrição"
                      className="relative z-10 rounded-full shadow-2xl w-48 h-48 mx-auto object-cover border-4 border-gray-50 transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  <h3 className="text-2xl font-bold text-green-600 mb-4">
                    Nutrição
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Descubra tudo que você precisa saber sobre nutrição, dietas
                    balanceadas e saúde alimentar.
                  </p>

                  <Link to="/nutrition" className="block">
                    <button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 transition-all duration-300 text-gray-50 font-semibold px-8 py-4 rounded-2xl shadow-lg transform hover:scale-105">
                      Explorar Nutrição →
                    </button>
                  </Link>
                </div>
              </div>

              {/* Academia Card */}
              <div className="bg-gray-50 rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-blue-300 border-4 border-transparent hover:border-blue-400">
                <div className="absolute top-0 right-0 bg-gradient-to-bl from-blue-500 to-indigo-500 text-gray-50 px-6 py-2 rounded-bl-3xl font-bold text-sm shadow-lg">
                  Destaque
                </div>

                <div className="flex flex-col justify-between p-8">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full blur-xl opacity-50"></div>
                    <img
                      src={academia}
                      alt="Academia"
                      className="relative z-10 rounded-full shadow-2xl w-48 h-48 mx-auto object-cover border-4 border-gray-50 transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  <h3 className="text-2xl font-bold text-blue-600 mb-4">
                    Academia
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Explore tudo sobre treinos, exercícios e o universo completo
                    da musculação.
                  </p>

                  <Link to="/gym" className="block">
                    <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 text-gray-50 font-semibold px-8 py-4 rounded-2xl shadow-lg transform hover:scale-105">
                      Explorar Academia →
                    </button>
                  </Link>
                </div>
              </div>

              {/* Calculadoras Card */}
              <div className="group relative bg-gray-50 rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-purple-300 border-4 border-transparent hover:border-purple-400">
                <div className="absolute top-0 right-0 bg-gradient-to-bl from-purple-500 to-pink-500 text-gray-50 px-6 py-2 rounded-bl-3xl font-bold text-sm shadow-lg">
                  Curiosdades
                </div>

                <div className="p-8">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-xl opacity-50"></div>
                    <img
                      src={calculadora}
                      alt="Calculadoras"
                      className="relative z-10 rounded-full shadow-2xl w-48 h-48 mx-auto object-cover border-4 border-gray-50 transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  <h3 className="text-2xl font-bold text-purple-600 mb-4">
                    Calculadoras
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Ferramentas precisas para IMC, gordura corporal, calorias e
                    muito mais!
                  </p>

                  <Link to="/calculators" className="block">
                    <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 text-gray-50 font-semibold px-8 py-4 rounded-2xl shadow-lg transform hover:scale-105">
                      Explorar Calculadoras →
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Additional Benefits */}
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mt-20">
              {[
                { icon: "✅", title: "Gratuito", desc: "100% livre de custos" },
                {
                  icon: "📱",
                  title: "Responsivo",
                  desc: "Use em qualquer dispositivo",
                },
              ].map((benefit, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-br from-purple-100 to-pink-100 p-6 rounded-2xl shadow-lg border-2 border-purple-200 transform hover:scale-105 transition-all duration-300"
                >
                  <div className="text-4xl mb-3">{benefit.icon}</div>
                  <h4 className="font-bold text-purple-900 mb-2">
                    {benefit.title}
                  </h4>
                  <p className="text-gray-700 text-sm">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <footer className="flex justify-center bg-gray-300 p-8 items-center gap-1">
          <p>© 2025 GoFit. All rights reserved.</p>
          <p>Informações</p>
        </footer>
      </div>
    </div>
  );
}
