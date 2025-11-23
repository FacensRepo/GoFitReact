import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { CREATE_HISTORIC } from "../mutations/createHistoric";
import { LIST_GAME_TYPE } from "../queries/listGameType";

type Pergunta = {
  pergunta: string;
  resposta: boolean;
  explicacao: string;
};

const perguntas: Pergunta[] = [
  {
    pergunta: "Beber água com limão em jejum emagrece.",
    resposta: false,
    explicacao:
      "Falso. Beber água com limão em jejum não tem propriedades mágicas para emagrecimento. Apesar de ser uma bebida saudável e hidratante, não há evidências científicas que comprovem que ela acelera o metabolismo ou queima gordura.",
  },
  {
    pergunta: "O ômega-3 é importante para a saúde do cérebro.",
    resposta: true,
    explicacao:
      "Verdadeiro. O ômega-3 é um ácido graxo essencial que contribui para a saúde cerebral, melhorando a memória e a função cognitiva.",
  },
  {
    pergunta: "Comer carboidratos à noite engorda.",
    resposta: false,
    explicacao:
      "Falso. O ganho de peso está relacionado ao consumo excessivo de calorias ao longo do dia, não ao horário em que os carboidratos são consumidos.",
  },
  {
    pergunta: "O consumo de fibras ajuda no funcionamento do intestino.",
    resposta: true,
    explicacao:
      "Verdadeiro. As fibras são essenciais para a saúde intestinal, ajudando a regular o trânsito e prevenir a constipação.",
  },
  {
    pergunta: "Alimentos orgânicos são sempre mais nutritivos.",
    resposta: false,
    explicacao:
      "Falso. Alimentos orgânicos podem ter menos pesticidas, mas não necessariamente são mais nutritivos do que os convencionais.",
  },
  {
    pergunta: "Ovo aumenta o colesterol ruim.",
    resposta: false,
    explicacao:
      "Falso. O ovo contém colesterol, mas seu consumo moderado não está diretamente associado ao aumento do colesterol ruim (LDL) em pessoas saudáveis.",
  },
  {
    pergunta: "Chá verde emagrece.",
    resposta: false,
    explicacao:
      "Falso. O chá verde pode ajudar no metabolismo, mas não é uma solução mágica para emagrecimento. Ele deve ser combinado com uma dieta equilibrada e exercícios.",
  },
  {
    pergunta: "Comer abacaxi à noite faz mal.",
    resposta: false,
    explicacao:
      "Falso. Não há evidências científicas que comprovem que comer abacaxi à noite faz mal. Ele é rico em fibras e vitaminas, podendo ser consumido em qualquer horário.",
  },
  {
    pergunta: "Beber água é essencial para manter o corpo hidratado.",
    resposta: true,
    explicacao:
      "Verdadeiro. A água é vital para o funcionamento do organismo, ajudando na regulação da temperatura, transporte de nutrientes e eliminação de toxinas.",
  },
  {
    pergunta: "Açúcar mascavo é mais saudável que açúcar refinado.",
    resposta: false,
    explicacao:
      "Falso. Açúcar mascavo contém alguns minerais, mas a diferença nutricional em relação ao açúcar refinado é mínima. Ambos devem ser consumidos com moderação.",
  },
  {
    pergunta: "A vitamina D é importante para a saúde dos ossos.",
    resposta: true,
    explicacao:
      "Verdadeiro. A vitamina D ajuda na absorção de cálcio, sendo fundamental para a saúde óssea e a prevenção de doenças como a osteoporose.",
  },
  {
    pergunta: "Glúten faz mal para todo mundo.",
    resposta: false,
    explicacao:
      "Falso. Apesar de ser uma substância com potencial inflamatório e alergênico, o glúten só faz mal para pessoas com doença celíaca ou sensibilidade ao glúten, assim, para a maioria das pessoas, ele é seguro e não causa problemas.",
  },
  {
    pergunta: "Comer banana previne cãibras.",
    resposta: true,
    explicacao:
      "Verdadeiro. A banana é rica em potássio, um mineral importante para a prevenção de cãibras musculares. No entanto, cãibras podem ter causas diversas como esforço muscular em demasia, desidratação e, como neste caso, a carência de potássio causaria a cãibra.",
  },
  {
    pergunta: "Dietas sem carboidratos são mais saudáveis.",
    resposta: false,
    explicacao:
      "Falso. Carboidratos são uma fonte importante de energia para o corpo. Dietas sem carboidratos podem levar à falta de nutrientes e energia.",
  },
  {
    pergunta:
      "O consumo de frutas e vegetais reduz o risco de doenças crônicas.",
    resposta: true,
    explicacao:
      "Verdadeiro. Frutas e vegetais são ricos em vitaminas, minerais e antioxidantes, que ajudam a prevenir doenças como diabetes, hipertensão e problemas cardíacos. Mas vale lembrar que devem ser mantidos hábitos saudáveis aliado ao consumo de frutas e vegetais, apenas consumi-las mas ter hábitos que prejudicam a saúde, como fumar e ingerir alimentos gordurosos, não irá reduzir os riscos de doenças.",
  },
];

const Quiz: React.FC = () => {
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [pontuacao, setPontuacao] = useState(0);
  const [respondeu, setRespondeu] = useState(false);
  const [respostaCerta, setRespostaCerta] = useState(false);
  const [mostrarResultado, setMostrarResultado] = useState(false);

  const [creteHistoric] = useMutation(CREATE_HISTORIC);

  const { data: gameTypeData } = useQuery(LIST_GAME_TYPE);

  const selectedGame = gameTypeData?.listGameType?.results.find(
    (gameType: any) => gameType.name === "Quiz"
  );

  const pergunta = perguntas[perguntaAtual];

  const handleResposta = (resposta: boolean) => {
    const correta = resposta === pergunta.resposta;
    if (correta) setPontuacao((p) => p + 1);
    setRespostaCerta(correta);
    setRespondeu(true);
  };

  const handleProxima = () => {
    const proxima = perguntaAtual + 1;
    if (proxima < perguntas.length) {
      setPerguntaAtual(proxima);
      setRespondeu(false);
    } else {
      setMostrarResultado(true);
      handleSubmit();
    }
  };

  const handleRecomecar = () => {
    setPerguntaAtual(0);
    setPontuacao(0);
    setRespondeu(false);
    setMostrarResultado(false);
  };

  const handleSubmit = async () => {
    try {
      const userString = localStorage.getItem("user");
      const user = userString ? JSON.parse(userString) : null;

      const result = {
        points: Math.round(pontuacao / 5),
        userId: user?.id || "",
        gameTypeId: selectedGame?.id,
      };

      await creteHistoric({
        variables: {
          input: result,
        },
      });

      console.log(result);
    } catch (error) {
      console.error("Erro ao salvar o histórico:", error);
    }
  };

  const getMensagem = () => {
    const porcentagem = (pontuacao / perguntas.length) * 100;
    if (porcentagem < 40)
      return {
        titulo: "Continue Estudando! 📚",
        texto: "Aprender é um processo contínuo. Não desanime!",
        emoji: "🌱",
      };
    if (porcentagem < 70)
      return {
        titulo: "Bom Trabalho! 👍",
        texto: "Você está no caminho certo. Continue aprendendo!",
        emoji: "🎯",
      };
    return {
      titulo: "Excelente! 🏆",
      texto: "Seu conhecimento sobre nutrição é impressionante!",
      emoji: "⭐",
    };
  };

  if (mostrarResultado) {
    const mensagem = getMensagem();
    const porcentagem = Math.round((pontuacao / perguntas.length) * 100);

    return (
      <div className="min-h-[500px] flex flex-col justify-center items-center p-6 mb-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl">
        <div className="bg-gray-50 rounded-2xl shadow-2xl p-8 text-center max-w-2xl w-full border-4 border-purple-300 transform transition-all duration-300 hover:scale-105">
          <div className="text-6xl mb-6 animate-bounce">{mensagem.emoji}</div>

          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Quiz Concluído!
          </h2>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 mb-6 border-2 border-purple-200">
            <div className="text-5xl font-bold text-purple-700 mb-2">
              {pontuacao} / {perguntas.length}
            </div>
            <div className="text-2xl text-gray-700 font-semibold">
              {porcentagem}% de acerto
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-2xl font-bold text-purple-900 mb-2">
              {mensagem.titulo}
            </h3>
            <p className="text-lg text-gray-700">{mensagem.texto}</p>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-4 mb-6 overflow-hidden">
            <div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-4 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${porcentagem}%` }}
            ></div>
          </div>

          <button
            onClick={handleRecomecar}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-lg font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            🔁 Recomeçar Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-[500px] flex flex-col justify-center items-center p-6 transition-all duration-500 mb-24 rounded-3xl ${
        respondeu
          ? respostaCerta
            ? "bg-gradient-to-br from-green-100 to-emerald-200"
            : "bg-gradient-to-br from-red-100 to-rose-200"
          : "bg-gradient-to-br from-purple-100 to-pink-100"
      }`}
    >
      <div className="bg-gray-50 rounded-2xl shadow-2xl p-4 max-w-2xl w-full border-4 border-purple-300">
        {/* Header com progresso */}
        <div className="mb-6">
          <div className="flex justify-between items-center gap-2 mb-4">
            <span className="text-sm font-semibold text-purple-700 bg-purple-100 px-4 py-2 rounded-full">
              Pergunta {perguntaAtual + 1} de {perguntas.length}
            </span>
            <span className="text-sm font-semibold text-pink-700 bg-pink-100 px-4 py-2 rounded-full">
              🎯 Pontuação: {pontuacao}
            </span>
          </div>

          {/* Barra de progresso */}
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-300"
              style={{
                width: `${((perguntaAtual + 1) / perguntas.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        {/* Pergunta */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 leading-relaxed">
            {pergunta.pergunta}
          </h2>
        </div>

        {/* Botões de resposta */}
        <div className="flex gap-4 mb-6">
          <button
            className={`flex-1 py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
              respondeu && pergunta.resposta === true
                ? "bg-green-500 text-white shadow-lg"
                : respondeu &&
                  respostaCerta === false &&
                  pergunta.resposta === true
                ? "bg-gray-200 text-gray-600"
                : "bg-gradient-to-r from-green-400 to-emerald-500 text-white hover:from-green-500 hover:to-emerald-600 shadow-md"
            }`}
            onClick={() => handleResposta(true)}
            disabled={respondeu}
          >
            ✓ Verdadeiro
          </button>

          <button
            className={`flex-1 py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
              respondeu && pergunta.resposta === false
                ? "bg-green-500 text-white shadow-lg"
                : respondeu &&
                  respostaCerta === false &&
                  pergunta.resposta === false
                ? "bg-gray-200 text-gray-600"
                : "bg-gradient-to-r from-red-400 to-rose-500 text-white hover:from-red-500 hover:to-rose-600 shadow-md"
            }`}
            onClick={() => handleResposta(false)}
            disabled={respondeu}
          >
            ✗ Falso
          </button>
        </div>

        {/* Feedback e explicação */}
        {respondeu && (
          <div className="space-y-6 animate-fadeIn">
            {/* Badge de resultado */}
            <div
              className={`flex items-center gap-3 p-4 rounded-xl ${
                respostaCerta
                  ? "bg-green-100 border-2 border-green-400"
                  : "bg-red-100 border-2 border-red-400"
              }`}
            >
              <span className="text-3xl">{respostaCerta ? "✅" : "❌"}</span>
              <span
                className={`text-lg font-bold ${
                  respostaCerta ? "text-green-800" : "text-red-800"
                }`}
              >
                {respostaCerta ? "Resposta Correta!" : "Resposta Incorreta"}
              </span>
            </div>

            {/* Explicação */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border-2 border-blue-200">
              <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                <span className="text-xl">💡</span>
                Explicação:
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {pergunta.explicacao}
              </p>
            </div>

            {/* Botões de ação */}
            <div className="flex gap-4">
              <button
                onClick={handleProxima}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-4 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
              >
                {perguntaAtual + 1 < perguntas.length
                  ? "➜ Próxima Pergunta"
                  : "🏁 Ver Resultado"}
              </button>

              <button
                onClick={handleRecomecar}
                className="bg-gray-200 hover:bg-gray-300 px-6 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-md"
                title="Recomeçar Quiz"
              >
                🔁
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
