import { CheckIcon, SparklesIcon } from "@heroicons/react/24/solid";
import { Menu } from "../../components/Menu";
import { useState } from "react";

export function About() {
  const [_isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = (isOpen: boolean) => {
    setIsMenuOpen(isOpen);
  };

  // Adicione as informações dos integrantes aqui
  const teamMembers = [
    {
      name: "Membro 1",
      // role: "Desenvolvedor Full Stack",
      image: "https://via.placeholder.com/200", // Substitua com foto real
      description: "Apaixonado por tecnologia e saúde",
    },
    {
      name: "Membro 2",
      // role: "Designer UI/UX",
      image: "https://via.placeholder.com/200", // Substitua com foto real
      description: "Criando experiências incríveis",
    },
    {
      name: "Membro 3",
      // role: "Especialista em Nutrição",
      image: "https://via.placeholder.com/200", // Substitua com foto real
      description: "Compartilhando conhecimento",
    },
    // Adicione mais membros conforme necessário
  ];

  return (
    <div className="bg-gradient-to-b from-white via-purple-50 to-pink-50">
      <Menu onToggleMenu={handleToggleMenu} />

      {/* Hero Section */}
      <section className="min-h-screen pt-32 pb-16">
        <div className="container mx-auto px-6 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                Quem Somos
              </h1>
            </div>
          </div>

          {/* Introduction */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl shadow-2xl p-10 mb-16 border-4 border-purple-200">
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                Bem-vindo à nossa plataforma dedicada a transformar sua jornada
                de saúde e bem-estar! Somos uma equipe apaixonada por promover
                hábitos saudáveis através da nutrição equilibrada, exercícios
                eficazes e conscientização sobre o cuidado com o corpo.
              </p>
              <p>
                Nosso objetivo é fornecer informações acessíveis, baseadas em
                ciência, para ajudá-lo a atingir seus objetivos de saúde de
                maneira prática e eficiente. Seja você iniciante ou experiente,
                aqui temos recursos para todos.
              </p>
            </div>
          </div>

          {/* Mission, Vision, Values Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Mission */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border-4 border-blue-200 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-16 bg-gradient-to-b from-blue-600 to-cyan-600 rounded-full"></div>
                <h2 className="text-3xl font-bold text-blue-600">🎯 Missão</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Educar e motivar as pessoas a adotarem um estilo de vida
                saudável, através de práticas alimentares balanceadas e
                atividades físicas que promovam a qualidade de vida.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border-4 border-purple-200 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-16 bg-gradient-to-b from-purple-600 to-pink-600 rounded-full"></div>
                <h2 className="text-3xl font-bold text-purple-600">👁️ Visão</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Ser a principal plataforma de referência em saúde e bem-estar,
                incentivando mudanças de hábitos para uma vida mais saudável e
                plena.
              </p>
            </div>

            {/* Values Preview */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border-4 border-green-200 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-16 bg-gradient-to-b from-green-600 to-emerald-600 rounded-full"></div>
                <h2 className="text-3xl font-bold text-green-600">
                  💎 Valores
                </h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Nossos valores fundamentais guiam cada decisão e ação que
                tomamos para servir melhor nossa comunidade.
              </p>
            </div>
          </div>

          {/* Values Cards */}
          <div className="space-y-4 mb-16">
            {[
              {
                icon: "📚",
                title: "Educação",
                desc: "Oferecer conhecimento acessível sobre nutrição e fitness.",
                color: "blue",
              },
              {
                icon: "⭐",
                title: "Qualidade",
                desc: "Trabalhamos com informações científicas e práticas testadas.",
                color: "purple",
              },
              {
                icon: "🚀",
                title: "Inovação",
                desc: "Buscamos sempre as melhores soluções tecnológicas para nossos usuários.",
                color: "green",
              },
            ].map((value, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-4 bg-gradient-to-r from-${value.color}-50 to-${value.color}-100 p-6 rounded-2xl shadow-lg border-2 border-${value.color}-200 transform hover:translate-x-4 transition-all duration-300`}
              >
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-white rounded-xl shadow-lg flex items-center justify-center text-2xl">
                    {value.icon}
                  </div>
                </div>
                <div className="flex-grow">
                  <h3
                    className={`text-xl font-bold text-${value.color}-700 mb-2`}
                  >
                    {value.title}
                  </h3>
                  <p className="text-gray-700">{value.desc}</p>
                </div>
                <CheckIcon
                  className={`w-8 h-8 text-${value.color}-600 flex-shrink-0`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <div className="space-y-6">
              <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                👥 Nossa Equipe
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                Conheça as pessoas que tornam este projeto possível
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-500 border-4 border-purple-200"
              >
                <div className="relative h-64 bg-gradient-to-br from-purple-400 to-pink-400">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-purple-900 mb-2">
                    {member.name}
                  </h3>
                  {/* <p className="text-purple-600 font-semibold mb-3">
                    {member.role}
                  </p> */}
                  <p className="text-gray-600">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Thanks Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-12">
            <div className="space-y-6">
              <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Obrigado!
              </h2>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-50 via-pink-50 to-purple-50 rounded-3xl shadow-2xl p-10 border-4 border-red-200">
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="flex items-center gap-3">
                <h3 className="text-3xl font-bold text-red-600">
                  Minutos Psíquicos
                </h3>
              </div>

              <p className="text-xl text-gray-700 leading-relaxed max-w-3xl">
                Um agradecimento especial ao canal{" "}
                <a
                  href="https://www.youtube.com/@MinutosPsiquicos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-600 hover:text-red-800 font-bold underline transition-colors"
                >
                  Minutos Psíquicos
                </a>{" "}
                no YouTube, cujo conteúdo educativo e inspirador sobre saúde
                mental e nutrição auxiliou no desenvolvimento desta plataforma.
              </p>

              <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-red-300 max-w-2xl">
                <p className="text-gray-700 mb-4">
                  Utilizamos um de seus vídeos sobre a relação entre nutrição e
                  saúde mental em nossa seção de conteúdo educativo. Agradecemos
                  imensamente pela qualidade do material produzido!
                </p>
                <div className="flex items-center justify-center gap-2 text-red-600 font-semibold">
                  <SparklesIcon className="w-6 h-6" />
                  <span>Continue inspirando milhões de pessoas!</span>
                  <SparklesIcon className="w-6 h-6" />
                </div>
              </div>

              <a
                href="https://www.youtube.com/@MinutosPsiquicos"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold px-8 py-4 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-3"
              >
                <span>▶️</span>
                Visitar Canal no YouTube
                <span>▶️</span>
              </a>
            </div>
          </div>

          {/* Additional Thanks */}
          <div className="grid md:grid-cols-2 gap-6 mt-12">
            {[
              {
                icon: "🙏",
                title: "Comunidade",
                desc: "Por todo o apoio e feedback",
              },
              // {
              //   icon: "💪",
              //   title: "Apoiadores",
              //   desc: "Que acreditam no projeto",
              // },
              {
                icon: "🌟",
                title: "Você",
                desc: "Por fazer parte desta jornada",
              },
            ].map((thanks, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-6 shadow-lg border-2 border-purple-300 text-center transform hover:scale-105 transition-all duration-300"
              >
                <div className="text-5xl mb-3">{thanks.icon}</div>
                <h4 className="text-xl font-bold text-purple-900 mb-2">
                  {thanks.title}
                </h4>
                <p className="text-gray-700">{thanks.desc}</p>
              </div>
            ))}
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
