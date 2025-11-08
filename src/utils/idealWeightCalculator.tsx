import React, { useState } from 'react';

type IdealWeightResult = {
  ideal: string;
  range: {
    min: string;
    max: string;
  };
};

const IdealWeightCalculator: React.FC = () => {
  const [gender, setGender] = useState<'feminino' | 'masculino'>('feminino');
  const [height, setHeight] = useState<string>('');
  const [frame, setFrame] = useState<'pequeno' | 'medio' | 'grande'>('medio');
  const [result, setResult] = useState<IdealWeightResult | null>(null);
  const [showInfo, setShowInfo] = useState<boolean>(false);

  const calculateIdealWeight = () => {
    if (!height) {
      alert('Por favor, insira sua altura');
      return;
    }

    const heightCm = parseFloat(height);
    let baseWeight: number;

    // Using the Robinson formula (1983)
    if (gender === 'feminino') {
      baseWeight = 49 + 1.7 * ((heightCm - 152.4) / 2.54);
    } else {
      baseWeight = 52 + 1.9 * ((heightCm - 152.4) / 2.54);
    }

    // Adjust for frame size
    let finalWeight: number;
    switch (frame) {
      case 'pequeno':
        finalWeight = baseWeight * 0.9;
        break;
      case 'grande':
        finalWeight = baseWeight * 1.1;
        break;
      default:
        finalWeight = baseWeight;
    }

    setResult({
      ideal: finalWeight.toFixed(1),
      range: {
        min: (finalWeight * 0.95).toFixed(1),
        max: (finalWeight * 1.05).toFixed(1)
      }
    });
  };

  return (
    <div className="calculator-container max-w-md mx-auto" data-name="ideal-weight-calculator">
      <div className="flex justify-center mb-6">
        <h2 className="calculator-title text-2xl font-bold">Calculadora de Peso Ideal</h2>
        <button 
          className="info-button mt-1.5 ml-2 w-8 h-8 rounded-full bg-blue-500 text-white font-bold"
          onClick={() => setShowInfo(true)}
          data-name="ideal-weight-info-button"
        >
          ?
        </button>
      </div>

      <div className="input-group mb-4" data-name="ideal-weight-gender-input">
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

      <div className="input-group mb-4" data-name="ideal-weight-height-input">
        <label htmlFor="height" className="block mb-2 font-medium">Altura (cm):</label>
        <input
          type="number"
          id="height"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          placeholder="Digite sua altura em cm (Ex: 184)"
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="input-group mb-4" data-name="ideal-weight-frame-input">
        <label htmlFor="frame" className="block mb-2 font-medium">Estrutura Corporal:</label>
        <select
          id="frame"
          value={frame}
          onChange={(e) => setFrame(e.target.value as 'pequeno' | 'medio' | 'grande')}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="pequeno">Pequena</option>
          <option value="medio">Média</option>
          <option value="grande">Grande</option>
        </select>
      </div>

      <button 
        className="calculator-button w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={calculateIdealWeight}
        data-name="ideal-weight-calculate-button"
      >
        Calcular
      </button>

      {result && (
        <div className="result mt-6 text-center" data-name="ideal-weight-result">
          <p className="text-lg">Peso Ideal:</p>
          <p className="result-value text-3xl font-bold text-blue-600">{result.ideal} kg</p>
          <p className="text-sm text-gray-600 mt-2">
            Faixa saudável: {result.range.min} - {result.range.max} kg
          </p>
        </div>
      )}

      {showInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setShowInfo(false)}
          />
          <div className="info-modal relative bg-white p-6 rounded-lg max-w-md mx-auto z-10" data-name="ideal-weight-info-modal">
            <h3 className="text-xl font-bold mb-4">Sobre o Peso Ideal</h3>
            <p className="mb-4">O cálculo do peso ideal é baseado na fórmula de Robinson (1983) e leva em consideração sua altura, sexo e estrutura corporal.</p>
            <p className="mb-4">
              <strong>Estrutura Corporal:</strong>
              <ul className="list-disc pl-5">
                <li>Pequena: Ossos finos, pulsos e tornozelos delgados</li>
                <li>Média: Estrutura óssea média</li>
                <li>Grande: Ossos largos, estrutura robusta</li>
              </ul>
            </p>
            <button 
              className="calculator-button w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setShowInfo(false)}
              data-name="ideal-weight-info-close-button"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default IdealWeightCalculator;