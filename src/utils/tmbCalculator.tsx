import React, { useState } from 'react';

const TMBCalculator: React.FC = () => {
  const [gender, setGender] = useState<'feminino' | 'masculino'>('feminino');
  const [age, setAge] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [activityLevel, setActivityLevel] = useState<string>('1.55');
  const [result, setResult] = useState<string | null>(null);
  const [showInfo, setShowInfo] = useState<boolean>(false);

  const calculateTMB = () => {
    if (!age || !weight || !height) {
      alert('Por favor, preencha todos os campos');
      return;
    }
    
    const ageNum = parseFloat(age);
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);
    const activityNum = parseFloat(activityLevel);
    
    if (ageNum <= 0 || weightNum <= 0 || heightNum <= 0) {
      alert('Por favor, insira valores válidos');
      return;
    }

    let tmb: number;
    if (gender === 'feminino') {
      tmb = 655 + (9.6 * weightNum) + (1.8 * heightNum) - (4.7 * ageNum);
    } else {
      tmb = 66 + (13.7 * weightNum) + (5 * heightNum) - (6.8 * ageNum);
    }

    const dailyCalories = (tmb * activityNum).toFixed(0);
    setResult(dailyCalories);
  };

  return (
    <div className="calculator-container max-w-md mx-auto" data-name="tmb-calculator">
      <div className="flex justify-center mb-6">
        <h2 className="calculator-title text-2xl font-bold">Calculadora de TMB</h2>
        <button 
          className="info-button mt-1.5 ml-2 w-8 h-8 rounded-full bg-blue-500 text-white font-bold"
          onClick={() => setShowInfo(true)}
          data-name="tmb-info-button"
        >
          ?
        </button>
      </div>

      <div className="input-group mb-4" data-name="tmb-gender-input">
        <label htmlFor="gender" className="block mb-2 font-medium">Sexo:</label>
        <select
          id="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value as 'feminino' | 'masculino')}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="feminino">Feminino</option>
          <option value="masculino">Masculino</option>
        </select>
      </div>

      <div className="input-group mb-4" data-name="tmb-age-input">
        <label htmlFor="age" className="block mb-2 font-medium">Idade:</label>
        <input
          type="number"
          id="age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Digite sua idade (Ex: 21)"
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="input-group mb-4" data-name="tmb-weight-input">
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

      <div className="input-group mb-4" data-name="tmb-height-input">
        <label htmlFor="height" className="block mb-2 font-medium">Altura (cm):</label>
        <input
          type="number"
          id="height"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          placeholder="Digite sua altura (Ex: 1,76)"
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="input-group mb-4" data-name="tmb-activity-input">
        <label htmlFor="activity" className="block mb-2 font-medium">Nível de Atividade:</label>
        <select
          id="activity"
          value={activityLevel}
          onChange={(e) => setActivityLevel(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="1.55">Leve</option>
          <option value="1.84">Moderada</option>
          <option value="2.2">Intensa</option>
        </select>
      </div>

      <button 
        className="calculator-button w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={calculateTMB}
        data-name="tmb-calculate-button"
      >
        Calcular
      </button>

      {result && (
        <div className="result mt-6 text-center" data-name="tmb-result">
          <p className="text-lg">Seu gasto calórico diário:</p>
          <p className="result-value text-3xl font-bold text-blue-600">{result} calorias</p>
        </div>
      )}

      {showInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setShowInfo(false)}
          />
          <div className="info-modal relative bg-white p-6 rounded-lg max-w-md mx-auto z-10" data-name="tmb-info-modal">
            <h3 className="text-xl font-bold mb-4">Sobre a TMB</h3>
            <p className="mb-4">A Taxa Metabólica Basal (TMB) é a quantidade mínima de energia que seu corpo necessita para manter as funções vitais em repouso.</p>
            <p className="mb-4">
              <strong>Níveis de Atividade:</strong><br />
              Leve: Exercícios leves 1-3 vezes por semana<br />
              Moderada: Exercícios moderados 3-5 vezes por semana<br />
              Intensa: Exercícios intensos 6-7 vezes por semana
            </p>
            <button 
              className="calculator-button w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setShowInfo(false)}
              data-name="tmb-info-close-button"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TMBCalculator;