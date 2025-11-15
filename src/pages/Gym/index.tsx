import { Menu } from "../../components/Menu";
import emagrecimento from "../../assets/images/lose.jpg";
import ganho from "../../assets/images/gain.jpg";
import definicao from "../../assets/images/define.jpg";
import strap from "../../assets/images/strap.jpg";
import whey from "../../assets/images/whey.jpg";
import hipercalorico from "../../assets/images/hipercalorico.jpg";
import pretreino from "../../assets/images/pretreino.jpg";
import creatina from "../../assets/images/creatina.jpg";
import coqueteleira from "../../assets/images/coqueteleira.jpg";
import { ArrowDownTrayIcon, CheckIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export function Gym() {
  const [_isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = (isOpen: boolean) => {
    setIsMenuOpen(isOpen);
  };

  type TrainingType = "emagrecimento" | "massa" | "definicao";

  interface TrainingProgram {
    title: string;
    content: string;
  }

  const TRAINING_PROGRAMS: Record<TrainingType, TrainingProgram> = {
    emagrecimento: {
      title: "Treino para Emagrecimento - 5x por Semana 💪",
      content: `Segunda-feira:
- HIIT (30 min)
- Supino reto 3x12
- Agachamento livre 3x15
- Abdominais 3x20

Terça-feira:
- Corrida (40 min)
- Levantamento terra 3x12
- Rosca direta 3x12

Quarta-feira:
- Circuito funcional
- Prancha 3x40s
- Polichinelos 3x30

Quinta-feira:
- Bicicleta ergométrica (30 min)
- Supino inclinado 3x12
- Agachamento sumô 3x15
- Abdominais infra 3x20

Sexta-feira:
- HIIT (30 min)
- Desenvolvimento militar 3x12
- Cadeira extensora 3x15
- Prancha lateral 3x40s
`,
    },
    massa: {
      title: "Treino para Ganho de Massa - 5x por Semana 💪",
      content: `Segunda-feira:
- Supino reto 4x10
- Desenvolvimento com halteres 4x10
- Agachamento livre 4x10
- Rosca direta 4x12
- Abdominal infra 3x15

Terça-feira:
- Levantamento terra 4x8
- Barra fixa 4x8
- Remada curvada 4x10
- Tríceps francês 4x12
- Prancha 3x40s

Quarta-feira:
- Supino inclinado 4x10
- Desenvolvimento militar 4x10
- Cadeira extensora 4x12
- Rosca martelo 4x12
- Elevação de pernas 3x15

Quinta-feira:
- Stiff 4x8
- Remada unilateral 4x10
- Paralelas 4x12
- Abdução de quadril 3x15
- Prancha lateral 3x30s

Sexta-feira:
- Supino reto 4x10
- Agachamento búlgaro 4x10
- Pulley frente 4x12
- Rosca concentrada 4x12
- Abdominal supra 3x15
`,
    },
    definicao: {
      title: "Treino para Definição - 5x por Semana 💪",
      content: `Segunda-feira:
- HIIT (20 min)
- Supino reto 3x12
- Agachamento livre 3x12
- Elevação lateral 3x15
- Abdominais 3x20

Terça-feira:
- Corrida (30 min)
- Barra fixa 3x10
- Remada curvada 3x12
- Tríceps corda 3x12
- Prancha 3x40s

Quarta-feira:
- Circuito funcional
- Afundo com halteres 3x12
- Supino inclinado 3x12
- Elevação de panturrilha 3x15
- Abdominal infra 3x20

Quinta-feira:
- HIIT (20 min)
- Levantamento terra 3x10
- Desenvolvimento com halteres 3x12
- Cadeira extensora 3x12
- Prancha lateral 3x30s

Sexta-feira:
- Corrida (30 min)
- Remada baixa 3x12
- Paralelas 3x12
- Abdução de quadril 3x15
- Abdominal supra 3x20`,
    },
  };

  const downloadTrainingProgram = (tipo: TrainingType): void => {
    const program = TRAINING_PROGRAMS[tipo];
    if (!program) {
      console.error("Tipo de treino inválido");
      return;
    }

    const fullContent = `${program.title}\n\n${program.content}`;
    const blob = new Blob([fullContent], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Treino_${tipo}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-gradient-to-b from-white via-purple-50 to-pink-50">
      <Menu onToggleMenu={handleToggleMenu} />

      {/* Hero Section - Treinos */}
      <section className="min-h-screen mt-[4.5rem] md:mt-24 py-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col justify-center items-center text-center gap-8 mb-16">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                💪 Treinos de Academia
              </h1>
            </div>
            <p className="text-xl text-gray-700 max-w-3xl">
              Escolha o treino ideal para o seu objetivo e faça o download para
              seguir o plano na academia.
            </p>
          </div>

          {/* Training Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Emagrecimento */}
            <div className="group flex flex-col bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-purple-300 border-4 border-transparent hover:border-orange-400">
              <div className="relative overflow-hidden">
                <img
                  src={emagrecimento}
                  alt="Emagrecimento"
                  className="w-full h-64 object-cover rounded-t-2xl transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                  🔥 Popular
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-orange-600 mb-3">
                  Emagrecimento
                </h3>
                <p className="text-gray-600 mb-6 flex-grow">
                  Treino intenso com foco em cardio e exercícios funcionais para
                  acelerar a queima de gordura.
                </p>
                <button
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 flex items-center justify-center gap-3 transition-all duration-300 text-white font-semibold px-6 py-4 rounded-2xl shadow-lg transform hover:scale-105"
                  onClick={() => downloadTrainingProgram("emagrecimento")}
                >
                  <ArrowDownTrayIcon className="w-6 h-6" />
                  Download do Treino
                </button>
              </div>
            </div>

            {/* Ganho de Massa */}
            <div className="group flex flex-col bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-blue-300 border-4 border-transparent hover:border-blue-400">
              <div className="relative overflow-hidden">
                <img
                  src={ganho}
                  alt="Ganho de massa"
                  className="w-full h-64 object-cover rounded-t-2xl transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                  💪 Intenso
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-blue-600 mb-3">
                  Ganho de Massa
                </h3>
                <p className="text-gray-600 mb-6 flex-grow">
                  Programa completo de hipertrofia com exercícios compostos para
                  maximizar o crescimento muscular.
                </p>
                <button
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 flex items-center justify-center gap-3 transition-all duration-300 text-white font-semibold px-6 py-4 rounded-2xl shadow-lg transform hover:scale-105"
                  onClick={() => downloadTrainingProgram("massa")}
                >
                  <ArrowDownTrayIcon className="w-6 h-6" />
                  Download do Treino
                </button>
              </div>
            </div>

            {/* Definição */}
            <div className="group flex flex-col bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-green-300 border-4 border-transparent hover:border-green-400">
              <div className="relative overflow-hidden">
                <img
                  src={definicao}
                  alt="Definição"
                  className="w-full h-64 object-cover rounded-t-2xl transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                  ⚡ Eficiente
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-green-600 mb-3">
                  Definição Muscular
                </h3>
                <p className="text-gray-600 mb-6 flex-grow">
                  Combine força e cardio para definir os músculos e reduzir o
                  percentual de gordura corporal.
                </p>
                <button
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 flex items-center justify-center gap-3 transition-all duration-300 text-white font-semibold px-6 py-4 rounded-2xl shadow-lg transform hover:scale-105"
                  onClick={() => downloadTrainingProgram("definicao")}
                >
                  <ArrowDownTrayIcon className="w-6 h-6" />
                  Download do Treino
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="space-y-4">
              <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                🛒 Produtos Recomendados
              </h2>
            </div>
            <p className="text-xl text-gray-700 mt-6">
              Melhore sua performance com os melhores suplementos e acessórios!
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                img: strap,
                name: "Strap para Treino",
                link: "https://www.gsuplementos.com.br/fita-strap-faixa-vermelha-growth-par-growth-supplements",
              },
              {
                img: whey,
                name: "Whey Protein",
                link: "https://www.gsuplementos.com.br/whey-protein-concentrado-1kg-growth-supplements-p985936 ",
              },
              {
                img: hipercalorico,
                name: "Hipercalórico",
                link: "https://www.gsuplementos.com.br/top-hipercalorico-sabor-chocolate-1kg-growth-supplements-p985809 ",
              },
              {
                img: pretreino,
                name: "Pré-Treino",
                link: "https://www.gsuplementos.com.br/pre-treino-haze-hardcore-300gr-growth-supplements",
              },
              {
                img: creatina,
                name: "Creatina",
                link: "https://www.gsuplementos.com.br/creatina-monohidratada-250gr-growth-supplements-p985931 ",
              },
              {
                img: coqueteleira,
                name: "Coqueteleira",
                link: "https://www.gsuplementos.com.br/coqueteleira-simples-branca-growth-supplements",
              },
            ].map((product, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 border-2 border-gray-100 hover:border-purple-300"
              >
                <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 p-6">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-56 object-contain transform group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* <div className="absolute top-4 left-4 text-4xl animate-bounce">
                    {product.emoji}
                  </div> */}
                </div>
                <div className="p-6">
                  <h3 className={`text-2xl font-bold text-purple-700 mb-3`}>
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Produto de alta qualidade para melhorar seu desempenho e
                    resultados na academia.
                  </p>
                  <a
                    href={product.link}
                    className={`w-full bg-purple-600 hover:bg-purple-700  transition-all duration-300 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transform`}
                  >
                    Ver Produto
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips & Playlist Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {/* Tips Card */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl shadow-2xl p-10 border-4 border-purple-200 transform transition-all duration-500 hover:scale-105">
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  💡 Dicas Essenciais
                </h2>
              </div>
              <div className="space-y-4">
                {[
                  "Hidrate-se sempre",
                  "Mantenha uma alimentação balanceada",
                  "Descanse bem",
                  "Faça alongamentos",
                  "Respeite seus limites e evolua gradualmente",
                  "Faça o treino com foco na execução correta",
                  "Inclua exercícios para todos os grupos musculares",
                  "Use roupas e calçados adequados para treinar",
                  "Mantenha a constância, os resultados vêm com o tempo",
                ].map((tip, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-4 bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:translate-x-2"
                  >
                    <div className="flex-shrink-0">
                      <CheckIcon className="w-7 h-7 text-purple-600" />
                    </div>
                    <p className="text-gray-700 text-lg">{tip}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Playlist Card */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl shadow-2xl p-10 border-4 border-orange-200 transform transition-all duration-500 hover:scale-105">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-2 h-16 bg-gradient-to-b from-orange-600 to-amber-600 rounded-full"></div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                  🎵 Playlist para Treinar
                </h2>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <iframe
                  src="https://open.spotify.com/embed/playlist/7DD7riEgqIZVWzlsd3aNn0?si=9dcdd902f6b44e9d"
                  width="100%"
                  height="520px"
                  allow="encrypted-media"
                  className="rounded-xl"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="bg-gradient-to-r from-purple-900 via-pink-900 to-blue-900 text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
            <p className="text-lg font-medium">
              © 2025 GoFit. All rights reserved.
            </p>
            <div className="w-2 h-2 bg-white rounded-full hidden md:block"></div>
            <p className="text-lg hover:text-purple-300 transition-colors cursor-pointer font-medium">
              Informações
            </p>
          </div>
        </div>
      </footer> */}
      <footer className="flex justify-center bg-gray-300 p-8 items-center gap-1">
        <p>© 2025 GoFit. All rights reserved.</p>
        <p>Informações</p>
      </footer>
    </div>
  );
}
