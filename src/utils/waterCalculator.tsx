import React, { useState } from 'react';

const WaterCalculatorByAge: React.FC = () => {
  const [weight, setWeight] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [activity, setActivity] = useState<string>('1.0'); // Base 1.0 (Sedentário)
  const [result, setResult] = useState<string | null>(null);
  const [showInfo, setShowInfo] = useState<boolean>(false);

  // Função para determinar o fator base de água (ml/kg) com base na idade
  const getBaseFactor = (age: number): number => {
    if (age <= 17) return 40;     // Jovens
    if (age <= 55) return 35;     // Adultos
    if (age <= 65) return 30;     // Meia-idade
    return 25;                    // Idosos (66+)
  };

  const calculateWater = () => {
    if (!weight || !age) {
      alert('Por favor, preencha a idade e o peso.');
      return;
    }

    const weightNum = parseFloat(weight);
    const ageNum = parseInt(age);
    const activityFactor = parseFloat(activity);

    if (weightNum <= 0 || ageNum <= 0) {
      alert('Peso e idade devem ser valores positivos.');
      return;
    }
    
    // 1. Fator base por idade (ml/kg)
    const baseFactor = getBaseFactor(ageNum);

    // 2. Cálculo base: Peso * Fator de Idade
    const baseWater = weightNum * baseFactor;

    // 3. Ajuste para nível de atividade
    // Nota: O cálculo aqui usa um fator multiplicativo para a atividade.
    // O fator 1.0 representa "Sedentário".
    const totalWater = (baseWater * activityFactor).toFixed(0);
    
    setResult(totalWater);
  };

  return (
    <div className="calculator-container max-w-md mx-auto" data-name="water-calculator-age">
      <div className="flex justify-center mb-6">
        <h2 className="calculator-title text-2xl font-bold">Calculadora de Água por Idade e Peso</h2>
        <button 
          className="info-button mt-1.5 ml-2 w-8 h-8 rounded-full bg-blue-500 text-white font-bold"
          onClick={() => setShowInfo(true)}
          data-name="water-info-button"
        >
          ?
        </button>
      </div>

      <div className="input-group mb-4" data-name="age-input">
        <label htmlFor="age" className="block mb-2 font-medium">Idade (anos):</label>
        <input
          type="number"
          id="age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Digite sua idade (Ex: 25)"
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="input-group mb-4" data-name="weight-input">
        <label htmlFor="weight" className="block mb-2 font-medium">Peso (kg):</label>
        <input
          type="number"
          id="weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Digite seu peso (Ex: 74)"
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="input-group mb-4" data-name="activity-input">
        <label htmlFor="activity" className="block mb-2 font-medium">Nível de Atividade:</label>
        <select
          id="activity"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="1.0">Sedentário (Base)</option>
          <option value="1.1">Levemente Ativo</option>
          <option value="1.2">Moderadamente Ativo</option>
          <option value="1.3">Muito Ativo</option>
          <option value="1.4">Extremamente Ativo</option>
        </select>
      </div>
      
      <button 
        className="calculator-button w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={calculateWater}
        data-name="calculate-button"
      >
        Calcular
      </button>

      {result && (
        <div className="result mt-6 text-center" data-name="water-result">
          <p className="text-lg">Consumo diário recomendado de água:</p>
          <p className="result-value text-3xl font-bold text-blue-600">{result}ml</p>
          <p className="text-sm text-gray-600 mt-2">({(parseInt(result)/1000).toFixed(1)} litros)</p>
        </div>
      )}

      {showInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setShowInfo(false)}
          />
          <div className="info-modal relative bg-white p-6 rounded-lg max-w-md mx-auto z-10" data-name="water-info-modal">
            <h3 className="text-xl font-bold mb-4">Sobre o Cálculo</h3>
            <p className="mb-2">A quantidade de água é calculada multiplicando seu peso por um fator de mililitros que varia conforme a sua idade:</p>
            <ul className="list-disc pl-5 text-sm mb-4">
              <li>Até 17 anos: 40 ml/kg</li>
              <li>18 a 55 anos: 35 ml/kg</li>
              <li>56 a 65 anos: 30 ml/kg</li>
              <li>66+ anos: 25 ml/kg</li>
            </ul>
            <p className="mb-4">O resultado final é ajustado pelo seu nível de atividade.</p>
            <button 
              className="calculator-button w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setShowInfo(false)}
              data-name="water-info-close-button"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WaterCalculatorByAge;