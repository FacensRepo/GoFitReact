import { Menu } from "../../components/Menu";
import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { ProtectedGamePage } from "../../components/ProtectedGamePage";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_HISTORIC } from "../../mutations/createHistoric";
import { LIST_GAME_TYPE } from "../../queries/listGameType";
import { startOfWeek, addDays, format } from "date-fns";
import { ptBR } from "date-fns/locale";

export function Checkin() {
  const [_isMenuOpen, setIsMenuOpen] = useState(false);
  const [createHistoric] = useMutation(CREATE_HISTORIC);
  const { data: gameTypeData } = useQuery(LIST_GAME_TYPE);

  const handleToggleMenu = (isOpen: boolean) => {
    setIsMenuOpen(isOpen);
  };

  // Buscar o game type "Checkin"
  const selectedGame = gameTypeData?.listGameType?.results.find(
    (gameType: any) => gameType.name === "Checkin"
  );

  // Gerar os dias da semana atual com datas reais
  const generateWeekDays = () => {
    const today = new Date();
    const weekStart = startOfWeek(today, { weekStartsOn: 0 }); // Domingo = 0

    return Array.from({ length: 7 }, (_, index) => {
      const date = addDays(weekStart, index);
      return {
        day: format(date, "EEE", { locale: ptBR }).toUpperCase().slice(0, 3),
        date: format(date, "dd"),
        fullDate: format(date, "yyyy-MM-dd"),
        dateObj: date,
      };
    });
  };

  const [daysOfWeek] = useState(generateWeekDays());

  // Carregar check-ins do localStorage
  const loadCheckedDays = () => {
    const stored = localStorage.getItem("checkin-week");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Verificar se é da mesma semana
        const weekStart = format(startOfWeek(new Date(), { weekStartsOn: 0 }), "yyyy-MM-dd");
        if (parsed.weekStart === weekStart) {
          return parsed.checkedDays;
        }
      } catch (e) {
        console.error("Erro ao carregar check-ins:", e);
      }
    }
    return Array(7).fill(false);
  };

  const [checkedDays, setCheckedDays] = useState<boolean[]>(loadCheckedDays());
  const [weekCompleted, setWeekCompleted] = useState(false);

  // Salvar check-ins no localStorage sempre que mudar
  useEffect(() => {
    const weekStart = format(startOfWeek(new Date(), { weekStartsOn: 0 }), "yyyy-MM-dd");
    localStorage.setItem("checkin-week", JSON.stringify({
      weekStart,
      checkedDays,
    }));

    // Verificar se completou a semana
    const allChecked = checkedDays.every((checked) => checked);
    if (allChecked && !weekCompleted) {
      setWeekCompleted(true);
      handleSubmit();
    }
  }, [checkedDays]);

  const handleDayClick = (index: number) => {
    // Verificar se o dia já passou ou é hoje
    const dayDate = daysOfWeek[index].dateObj;
    const today = new Date();

    if (dayDate > today) {
      // Não permitir marcar dias futuros
      return;
    }

    const newCheckedDays = [...checkedDays];
    newCheckedDays[index] = !newCheckedDays[index];
    setCheckedDays(newCheckedDays);
  };

  const handleSubmit = async () => {
    try {
      const userString = localStorage.getItem("user");
      const user = userString ? JSON.parse(userString) : null;

      const result = {
        points: 100, // 100 pontos por semana completa
        userId: user?.id || "",
        gameTypeId: selectedGame?.id,
      };

      await createHistoric({
        variables: {
          input: result,
        },
      });

      console.log("Histórico salvo com sucesso!", result);
    } catch (error) {
      console.error("Erro ao salvar o histórico:", error);
    }
  };

  // Calcular estatísticas
  const totalCheckins = checkedDays.filter((checked) => checked).length;
  const streak = checkedDays.filter((checked) => checked).length;

  return (
    <ProtectedGamePage>
      <div className="min-h-screen bg-gradient-to-br from-roxo_padrao to-roxo-gradiente">
        <Menu onToggleMenu={handleToggleMenu} />

      <div className="min-h-screen mt-[4.5rem] md:mt-[70px] px-4 py-12">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-50 mb-4">
              Check-in Semanal
            </h1>
            <p className="text-lg text-gray-200">
              Registre sua frequência na academia esta semana
            </p>
          </div>

          {/* Card Principal */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-8">
            {/* Estatísticas */}
            <div className="grid grid-cols-2 gap-6 mb-12">
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-6 rounded-2xl text-center border-2 border-purple-200">
                <p className="text-gray-600 text-sm font-medium mb-2">
                  Check-ins esta semana
                </p>
                <p className="text-4xl font-bold text-purple-600">
                  {totalCheckins}/7
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-6 rounded-2xl text-center border-2 border-green-200">
                <p className="text-gray-600 text-sm font-medium mb-2">
                  Sequência atual
                </p>
                <p className="text-4xl font-bold text-green-600">
                  {streak} dias
                </p>
              </div>
            </div>

            {/* Calendário Semanal */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
                Seus Treinos
              </h2>

              <div className="grid grid-cols-7 gap-3 md:gap-4">
                {daysOfWeek.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleDayClick(index)}
                    className={`
                      relative flex flex-col items-center justify-center
                      p-4 md:p-6 rounded-2xl
                      transition-all duration-300 transform hover:scale-105
                      ${
                        checkedDays[index]
                          ? "bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-300"
                          : "bg-gray-100 hover:bg-gray-200"
                      }
                    `}
                  >
                    {/* Dia da semana */}
                    <span
                      className={`
                      text-xs md:text-sm font-bold mb-2
                      ${checkedDays[index] ? "text-white" : "text-gray-600"}
                    `}
                    >
                      {item.day}
                    </span>

                    {/* Data */}
                    <span
                      className={`
                      text-lg md:text-xl font-bold mb-2
                      ${checkedDays[index] ? "text-white" : "text-gray-800"}
                    `}
                    >
                      {item.date}
                    </span>

                    {/* Ícone de Check */}
                    {checkedDays[index] && (
                      <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1.5 shadow-lg border-2 border-white">
                        <Check className="w-4 h-4 text-white" strokeWidth={3} />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Dicas */}
            <div className="mt-12 bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl border-2 border-purple-200">
              <h3 className="text-lg font-bold text-purple-900 mb-3 flex items-center gap-2">
                <span className="text-2xl">💡</span>
                Dica do dia
              </h3>
              <p className="text-gray-700">
                Mantenha a consistência! Estudos mostram que treinar pelo menos
                3-4 vezes por semana traz resultados significativos para sua
                saúde e condicionamento físico.
              </p>
            </div>
          </div>

          {/* Card de Metas */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Sua Meta Semanal
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600 font-medium">
                  Progresso: {totalCheckins} de 5 treinos
                </span>
                <span className="text-purple-600 font-bold">
                  {Math.round((totalCheckins / 5) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-4 rounded-full transition-all duration-500 shadow-lg"
                  style={{ width: `${Math.min((totalCheckins / 5) * 100, 100)}%` }}
                ></div>
              </div>
              {totalCheckins >= 5 && (
                <div className="mt-4 p-4 bg-green-100 rounded-xl border-2 border-green-300">
                  <p className="text-green-800 font-bold text-center flex items-center justify-center gap-2">
                    <span className="text-2xl">🎉</span>
                    Parabéns! Você atingiu sua meta semanal!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

        {/* Footer */}
        <footer className="bg-gray-300 p-8 text-center">
          <p className="text-gray-700">
            © 2025 GoFit. All rights reserved.
          </p>
        </footer>
      </div>
    </ProtectedGamePage>
  );
}
