import { Menu } from "../../components/Menu";
import CalorieCalculator from "../../utils/calorieCalculator";
import MacronutrientCards from "../../utils/cardsMacroNutrients";
import MicronutrientCards from "../../utils/cardsMicroNutrientes";
import Dieta from "../../assets/images/dieta.png";
import DietAccordion from "../../utils/dietAccordion";
import Quiz from "../../utils/quiz";
import { useState } from "react";
import { ProtectedGamePage } from "../../components/ProtectedGamePage";

export function Nutrition() {
  const [_isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = (isOpen: boolean) => {
    setIsMenuOpen(isOpen);
  };

  return (
    <ProtectedGamePage>
      <div>
        <Menu onToggleMenu={handleToggleMenu} />

        <div className="scroll-smooth bg-gradient-to-b from-white to-purple-50">
          {/* Hero Section - O que é nutrição */}
          <section className="min-h-screen flex items-center mb-10">
            <div className="container mx-auto px-6 sm:px-12 lg:px-24 max-w-6xl">
              <div className="flex flex-col gap-12 mt-24">
                <div className="space-y-6">
                  <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    O que é nutrição
                  </h1>
                </div>

                <div className="space-y-8">
                  <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
                    Nutrição é a ciência que estuda os nutrientes presentes nos
                    alimentos, bem como sua absorção pelo organismo humano e os
                    efeitos que eles têm sobre a saúde e bem-estar tanto física,
                    quanto mental.
                  </p>

                  <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
                    Trata-se de uma área que desempenha um papel fundamental na
                    saúde, uma vez que uma dieta equilibrada e adequada
                    contribui diretamente para a prevenção de doenças e promoção
                    da qualidade de vida, além de desempenhar um papel
                    importante na manutenção do equilíbrio emocional e na
                    melhora da clareza mental.
                  </p>
                </div>

                <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 shadow-2xl transform hover:scale-105 transition-transform duration-300">
                  <p className="text-center text-xl md:text-2xl text-white font-medium leading-relaxed">
                    💡 Nutrição é a ciência dos alimentos, que contribui
                    diretamente para a saúde física e mental.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Macro x Micro Section */}
          <section
            id="macro-micro"
            className="min-h-screen py-20 bg-gradient-to-br from-violet-100 via-purple-100 to-pink-100"
          >
            <div className="container mx-auto px-6 sm:px-12 lg:px-24 max-w-6xl">
              <div className="flex flex-col gap-12">
                <div className="space-y-6">
                  <h1 className="text-5xl md:text-6xl font-bold text-purple-900">
                    Macro x Micro
                  </h1>
                  <div className="w-24 h-1.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></div>
                </div>

                <p className="text-xl md:text-2xl text-gray-800 leading-relaxed">
                  A nutrição é baseada na ingestão de dois tipos principais de
                  nutrientes: macronutrientes e micronutrientes. Ambos são
                  essenciais para o funcionamento do organismo, mas desempenham
                  papéis diferentes e são necessários em quantidades distintas.
                </p>

                {/* Macronutrientes */}
                <div className="mt-12 space-y-8">
                  <div>
                    <h2 className="text-4xl font-bold text-purple-900 mb-4">
                      🍎 Macronutrientes
                    </h2>
                    <p className="text-xl text-gray-800 leading-relaxed">
                      Os macronutrientes são aqueles que o corpo precisa em
                      grandes quantidades, pois fornecem energia e participam da
                      construção e manutenção dos tecidos.
                    </p>
                  </div>
                  <MacronutrientCards />
                </div>

                {/* Micronutrientes */}
                <div className="mt-16 space-y-8">
                  <div>
                    <h2 className="text-4xl font-bold text-purple-900 mb-4">
                      💊 Micronutrientes
                    </h2>
                    <p className="text-xl text-gray-800 leading-relaxed">
                      Os micronutrientes são necessários em pequenas
                      quantidades, mas são fundamentais para o metabolismo,
                      fortalecimento do sistema imunológico e diversas funções
                      biológicas.
                    </p>
                  </div>
                  <MicronutrientCards />
                </div>
              </div>
            </div>
          </section>

          {/* Caloria Section */}
          <section id="caloria" className="min-h-screen py-20 bg-white">
            <div className="container mx-auto px-6 sm:px-12 lg:px-24 max-w-6xl">
              <div className="flex flex-col gap-12">
                <div className="space-y-6">
                  <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    🔥 Caloria
                  </h1>
                </div>

                <div className="space-y-8">
                  <p className="text-xl text-gray-700 leading-relaxed">
                    A caloria (kcal) é a unidade de medida que representa a
                    quantidade de energia que um alimento fornece ao organismo
                    quando consumido e metabolizado. Essa energia é essencial
                    para manter funções vitais, como a respiração, circulação
                    sanguínea, funcionamento dos órgãos e realização de
                    atividades físicas.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6 my-12">
                    <div className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 shadow-lg">
                      <h3 className="text-2xl font-bold text-blue-900 mb-3">
                        📊 TMB
                      </h3>
                      <p className="text-gray-700">
                        A Taxa Metabólica Basal é a quantidade de calorias que o
                        corpo gasta em repouso para manter funções básicas.
                      </p>
                    </div>

                    <div className="p-6 rounded-xl bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 shadow-lg">
                      <h3 className="text-2xl font-bold text-green-900 mb-3">
                        ⚡ GET
                      </h3>
                      <p className="text-gray-700">
                        O Gasto Energético Diário é a soma da TMB com as
                        calorias gastas em atividades diárias e exercícios.
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-12">
                    <div className="p-6 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 border-l-4 border-orange-500 shadow-lg">
                      <p className="text-lg text-gray-800">
                        <span className="font-bold text-orange-700">
                          💪 Ganhar peso:
                        </span>{" "}
                        consumir mais calorias do que gastar, o excesso é
                        armazenado.
                      </p>
                    </div>

                    <div className="p-6 rounded-xl bg-gradient-to-br from-pink-50 to-pink-100 border-l-4 border-pink-500 shadow-lg">
                      <p className="text-lg text-gray-800">
                        <span className="font-bold text-pink-700">
                          🎯 Perder peso:
                        </span>{" "}
                        consumir menos calorias do que gastar, o corpo usa as
                        reservas.
                      </p>
                    </div>
                  </div>

                  <CalorieCalculator />
                </div>
              </div>
            </div>
          </section>

          {/* Informação Nutricional Section */}
          <section
            id="info-nutricional"
            className="min-h-screen py-20 bg-gradient-to-br from-violet-100 via-purple-100 to-pink-100"
          >
            <div className="container mx-auto px-6 sm:px-12 lg:px-24 max-w-6xl">
              <div className="flex flex-col gap-12">
                <div className="space-y-6">
                  <h1 className="text-5xl md:text-6xl font-bold text-purple-900">
                    📋 Como ler informações nutricionais
                  </h1>
                </div>

                <div className="space-y-8">
                  <p className="text-xl text-gray-800 leading-relaxed">
                    Nos rótulos dos alimentos contêm informações essenciais para
                    entender o que você está consumindo. Saber interpretá-los
                    pode te ajudar a fazer escolhas mais saudáveis e evitar
                    ingredientes prejudiciais à saúde.
                  </p>

                  <p className="text-xl text-gray-800 leading-relaxed">
                    Ao lado está o exemplo do rótulo nutricional do Doritos.{" "}
                    <a
                      href="https://www.fatsecret.com.br/calorias-nutrição/"
                      className="text-purple-600 hover:text-purple-800 underline font-semibold transition-colors"
                    >
                      Clique aqui
                    </a>{" "}
                    para explorar diversas tabelas nutricionais.
                  </p>

                  {/* Porção */}
                  <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-purple-200">
                    <h2 className="text-3xl font-bold text-purple-900 mb-4">
                      📦 Porção
                    </h2>
                    <div className="space-y-4 text-gray-700 text-lg">
                      <p>
                        No rótulo do Doritos, está escrito que a porção
                        recomendada é de 25g, mas a embalagem contém duas
                        porções. Isso quer dizer que o valor nutricional
                        informado na tabela se refere a 25,5g (meia embalagem).
                      </p>
                      <p>
                        <span className="font-semibold text-purple-700">
                          100g:
                        </span>{" "}
                        padroniza a comparação entre diferentes alimentos.
                      </p>
                      <p>
                        <span className="font-semibold text-purple-700">
                          25g:
                        </span>{" "}
                        representa a quantidade por porção.
                      </p>
                    </div>
                  </div>

                  {/* %VD */}
                  <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-purple-200">
                    <h2 className="text-3xl font-bold text-purple-900 mb-4">
                      📊 %VD
                    </h2>
                    <div className="space-y-4 text-gray-700 text-lg">
                      <p>
                        A porcentagem do valor diário (%VD) mostra a quantidade
                        do nutriente em uma porção do produto em comparação com
                        a quantidade que uma pessoa média deveria consumir em um
                        dia.
                      </p>
                      <p className="italic text-gray-600">
                        Porém, esse valor se altera conforme as necessidades
                        individuais de cada um.
                      </p>
                    </div>
                  </div>

                  {/* Atenção Box */}
                  <div className="bg-gradient-to-br from-red-50 to-orange-50 border-4 border-red-400 rounded-2xl p-8 shadow-2xl mt-12">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-4xl">⚠️</span>
                      <h2 className="text-4xl font-bold text-red-900">
                        Atenção
                      </h2>
                    </div>
                    <div className="space-y-6 text-gray-800 text-lg">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">🧂</span>
                        <p>
                          <span className="font-bold text-red-700">
                            Excesso de sódio:
                          </span>{" "}
                          presente em alimentos industrializados, pode causar
                          hipertensão. Recomendação: menos de 2.000 mg/dia (~5g
                          de sal).
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">⛔</span>
                        <p>
                          <span className="font-bold text-red-700">
                            Gordura trans:
                          </span>{" "}
                          presente em margarinas e biscoitos. Aumenta o
                          colesterol ruim, evite ao máximo.
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">🚫</span>
                        <p>
                          <span className="font-bold text-red-700">
                            Gordura saturada:
                          </span>{" "}
                          em carnes gordurosas e frituras. Consumo excessivo
                          prejudica o coração.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Dieta Section */}
          <section id="dieta" className="py-20 bg-white">
            <div className="container mx-auto px-6 sm:px-12 lg:px-24 max-w-7xl">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                  <div className="space-y-6">
                    <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      🥗 Dieta
                    </h1>
                  </div>

                  <p className="text-xl text-gray-700 leading-relaxed">
                    A dieta é um termo usado para descrever o padrão de
                    alimentação de um indivíduo ou grupo. Refere-se aos tipos de
                    alimentos e bebidas consumidos regularmente para manter boa
                    saúde, alcançar metas ou tratar condições específicas.
                  </p>

                  <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 shadow-2xl">
                    <p className="text-center text-xl text-white font-medium leading-relaxed">
                      Uma alimentação balanceada é a base para uma vida saudável
                      e equilibrada.
                    </p>
                  </div>
                </div>

                <div className="flex justify-center">
                  <img
                    src={Dieta}
                    alt="Prato de salada e halter"
                    className="rounded-3xl shadow-2xl max-w-full h-auto transform hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>

              <div className="mt-16">
                <DietAccordion />
              </div>
            </div>
          </section>

          {/* Saúde Mental Section */}
          <section
            id="saude-mental"
            className="py-20 bg-gradient-to-br from-violet-100 via-purple-100 to-pink-100"
          >
            <div className="container mx-auto px-6 sm:px-12 lg:px-24 max-w-6xl">
              <div className="flex flex-col gap-12">
                <div className="space-y-6">
                  <h1 className="text-5xl md:text-6xl font-bold text-purple-900">
                    🧠 Nutrição X Saúde Mental
                  </h1>
                </div>

                <div className="space-y-8 text-xl text-gray-800 leading-relaxed">
                  <p>
                    A nutrição é um fator crucial para a saúde mental,
                    influenciando diretamente o funcionamento do cérebro e o
                    bem-estar emocional. Uma dieta equilibrada fornece
                    nutrientes essenciais que ajudam a reduzir o risco de
                    transtornos mentais, como depressão e ansiedade.
                  </p>

                  <div className="grid md:grid-cols-3 gap-6 my-12">
                    <div className="p-6 rounded-xl bg-white shadow-lg border-t-4 border-green-500">
                      <h3 className="text-xl font-bold text-green-700 mb-2">
                        🥦 Alimentação Saudável
                      </h3>
                      <p className="text-gray-700">
                        Frutas, verduras e grãos integrais promovem bem-estar
                      </p>
                    </div>
                    <div className="p-6 rounded-xl bg-white shadow-lg border-t-4 border-blue-500">
                      <h3 className="text-xl font-bold text-blue-700 mb-2">
                        🧬 Neurotransmissores
                      </h3>
                      <p className="text-gray-700">
                        Produção de serotonina e dopamina regula o humor
                      </p>
                    </div>
                    <div className="p-6 rounded-xl bg-white shadow-lg border-t-4 border-purple-500">
                      <h3 className="text-xl font-bold text-purple-700 mb-2">
                        🦠 Microbiota
                      </h3>
                      <p className="text-gray-700">
                        Conexão intestino-cérebro influencia cognição
                      </p>
                    </div>
                  </div>

                  <p>
                    O consumo excessivo de alimentos ultraprocessados, ricos em
                    açúcares e gorduras saturadas, está associado a um maior
                    risco de problemas de saúde mental e pode prejudicar a
                    microbiota intestinal.
                  </p>

                  <p>
                    Em resumo, uma alimentação adequada é essencial para a saúde
                    mental, fornecendo elementos necessários para o bom
                    funcionamento cerebral e prevenção de transtornos
                    emocionais.
                  </p>
                </div>

                <div className="flex justify-center mt-12">
                  <div className="w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl border-4 border-purple-300">
                    <iframe
                      className="w-full aspect-video"
                      src="https://www.youtube.com/embed/KFowNIMdLiI?si=k2hbjyeENGxunVYv"
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Fato ou Mito Section */}
          <section id="fato-mito" className="py-20 bg-white">
            <div className="container mx-auto px-6 sm:px-12 lg:px-24 max-w-6xl">
              <div className="flex flex-col gap-12">
                <div className="space-y-6">
                  <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    🤔 Fato ou Mito
                  </h1>
                </div>

                <p className="text-xl text-gray-700 leading-relaxed">
                  A nutrição está cercada de mitos populares e informações sem
                  embasamento científico. Esses equívocos podem levar a escolhas
                  alimentares inadequadas. Preparamos este quiz para você testar
                  seus conhecimentos e desvendar o que é verdade e o que é mito!
                </p>

                <Quiz />
              </div>
            </div>
          </section>

          {/* Footer */}
          {/* <footer className="bg-gradient-to-r from-purple-900 to-pink-900 text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
            <p className="text-lg">© 2025 GoFit. All rights reserved.</p>
            <div className="w-1 h-1 bg-white rounded-full hidden md:block"></div>
            <p className="text-lg hover:text-purple-300 transition-colors cursor-pointer">
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
      </div>
    </ProtectedGamePage>
  );
}
