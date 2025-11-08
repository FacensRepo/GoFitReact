import React, { useState } from 'react';

const IMCCalculator: React.FC = () => {
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [result, setResult] = useState<{ imc: string; classification: string } | null>(null);
  const [showInfo, setShowInfo] = useState<boolean>(false);

  const calculateIMC = () => {
    if (!weight || !height) {
      alert('Por favor, preencha todos os campos');
      return;
    }
    
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);
    
    if (weightNum <= 0 || heightNum <= 0) {
      alert('Por favor, insira valores válidos');
      return;
    }

    const imc = weightNum / (heightNum * heightNum);
    let classification = '';

    if (imc < 18.5) classification = 'Abaixo do peso';
    else if (imc < 24.9) classification = 'Peso normal';
    else if (imc < 29.9) classification = 'Sobrepeso';
    else classification = 'Obesidade';

    setResult({ imc: imc.toFixed(2), classification });
  };

  return (
    <div className="calculator-container max-w-md mx-auto" data-name="imc-calculator">
      <div className="flex justify-center mb-6">
        <h2 className="calculator-title text-2xl font-bold">Calculadora de IMC</h2>
        <button 
          className="info-button mt-1.5 ml-2 w-8 h-8 rounded-full bg-blue-500 text-white font-bold"
          onClick={() => setShowInfo(true)}
          data-name="imc-info-button"
        >
          ?
        </button>
      </div>

      <div className="input-group mb-4" data-name="imc-weight-input">
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

      <div className="input-group mb-4" data-name="imc-height-input">
        <label htmlFor="height" className="block mb-2 font-medium">Altura (m):</label>
        <input
          type="number"
          id="height"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          placeholder="Digite sua altura (Ex: 1,76)"
          step="0.01"
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <button 
        className="calculator-button w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={calculateIMC}
        data-name="imc-calculate-button"
      >
        Calcular
      </button>

      {result && (
        <div className="result mt-6 text-center" data-name="imc-result">
          <p className="text-lg">Seu IMC: <span className="result-value text-3xl font-bold text-blue-600">{result.imc}</span></p>
          <p className="text-lg mt-2">Classificação: <span className="result-value font-bold">{result.classification}</span></p>
        </div>
      )}

      {showInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setShowInfo(false)}
          />
          <div className="info-modal relative bg-white p-6 rounded-lg max-w-md mx-auto z-10" data-name="imc-info-modal">
            <h3 className="text-xl font-bold mb-4">Sobre o IMC</h3>
            <p className="mb-4">O Índice de Massa Corporal (IMC) é uma medida internacional usada para calcular se uma pessoa está no peso ideal.</p>
            <p className="mb-4">
              <strong>Classificação:</strong><br />
              Abaixo do peso: IMC &lt; 18.5<br />
              Peso normal: 18.5 ≤ IMC &lt; 24.9<br />
              Sobrepeso: 25.0 ≤ IMC &lt; 29.9<br />
              Obesidade: IMC ≥ 30.0
            </p>
            <button 
              className="calculator-button w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setShowInfo(false)}
              data-name="imc-info-close-button"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default IMCCalculator;