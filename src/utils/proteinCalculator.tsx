import React, { useState } from 'react';

const ProteinCalculator: React.FC = () => {
  const [weight, setWeight] = useState<string>('');
  const [activityLevel, setActivityLevel] = useState<string>('1.2');
  const [result, setResult] = useState<string | null>(null);
  const [showInfo, setShowInfo] = useState<boolean>(false);

  const calculateProtein = () => {
    if (!weight) {
      alert('Por favor, preencha seu peso');
      return;
    }
    
    const weightNum = parseFloat(weight);
    const activityNum = parseFloat(activityLevel);
    
    if (weightNum <= 0) {
      alert('Por favor, insira um peso válido');
      return;
    }

    const proteinPerKg = activityNum;
    const totalProtein = (weightNum * proteinPerKg).toFixed(1);
    
    setResult(totalProtein);
  };

  return (
    <div className="calculator-container max-w-md mx-auto" data-name="protein-calculator">
      <div className="flex justify-center mb-6">
        <h2 className="calculator-title text-2xl font-bold">Calculadora de Proteína</h2>
        <button 
          className="info-button mt-1.5 ml-2 w-8 h-8 rounded-full bg-blue-500 text-white font-bold"
          onClick={() => setShowInfo(true)}
          data-name="protein-info-button"
        >
          ?
        </button>
      </div>

      <div className="input-group mb-4" data-name="protein-weight-input">
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

      <div className="input-group mb-4" data-name="protein-activity-input">
        <label htmlFor="activity" className="block mb-2 font-medium">Nível de Atividade:</label>
        <select
          id="activity"
          value={activityLevel}
          onChange={(e) => setActivityLevel(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="1.2">Sedentário</option>
          <option value="1.4">Leve</option>
          <option value="1.6">Moderado</option>
          <option value="1.8">Intenso</option>
          <option value="2.0">Muito Intenso</option>
        </select>
      </div>

      <button 
        className="calculator-button w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={calculateProtein}
        data-name="protein-calculate-button"
      >
        Calcular
      </button>

      {result && (
        <div className="result mt-6 text-center" data-name="protein-result">
          <p className="text-lg">Necessidade diária de proteína:</p>
          <p className="result-value text-3xl font-bold text-blue-600">{result}g</p>
        </div>
      )}

      {showInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setShowInfo(false)}
          />
          <div className="info-modal relative bg-white p-6 rounded-lg max-w-md mx-auto z-10" data-name="protein-info-modal">
            <h3 className="text-xl font-bold mb-4">Sobre o Cálculo de Proteína</h3>
            <p className="mb-4">A quantidade de proteína necessária varia de acordo com seu nível de atividade física:</p>
            <ul className="list-disc pl-5 mb-4">
              <li>Sedentário (1.2g/kg): Pouca ou nenhuma atividade física</li>
              <li>Leve (1.4g/kg): Exercícios leves 1-3 vezes por semana</li>
              <li>Moderado (1.6g/kg): Exercícios moderados 3-5 vezes por semana</li>
              <li>Intenso (1.8g/kg): Exercícios intensos 6-7 vezes por semana</li>
              <li>Muito Intenso (2.0g/kg): Exercícios muito intensos ou atletas</li>
            </ul>
            <button 
              className="calculator-button w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setShowInfo(false)}
              data-name="protein-info-close-button"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProteinCalculator;