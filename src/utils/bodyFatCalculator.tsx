import React, { useState } from 'react';

const BodyFatCalculator: React.FC = () => {
  const [gender, setGender] = useState<'feminino' | 'masculino'>('feminino');
  const [waist, setWaist] = useState('');
  const [neck, setNeck] = useState('');
  const [height, setHeight] = useState('');
  const [hip, setHip] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [showInfo, setShowInfo] = useState(false);

  const isValidNumber = (value: string) => {
    const num = parseFloat(value);
    return !isNaN(num) && num > 0;
  };

  const calculateBodyFat = async () => {
    if (
      !isValidNumber(waist) ||
      !isValidNumber(neck) ||
      !isValidNumber(height) ||
      (gender === 'feminino' && !isValidNumber(hip))
    ) {
      alert('Por favor, preencha todos os campos com valores válidos');
      return;
    }

    await new Promise(resolve => setTimeout(resolve, 0));

    const waistNum = parseFloat(waist);
    const neckNum = parseFloat(neck);
    const heightNum = parseFloat(height);
    const hipNum = gender === 'feminino' ? parseFloat(hip) : 0;

    try {
      let bodyFat: number;

      if (gender === 'feminino') {
        bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(waistNum + hipNum - neckNum) + 0.22100 * Math.log10(heightNum)) - 450;
      } else {
        bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waistNum - neckNum) + 0.15456 * Math.log10(heightNum)) - 450;
      }

      if (isNaN(bodyFat) || bodyFat < 0 || bodyFat > 75) {
        throw new Error("Resultado fora dos limites esperados.");
      }

      setResult(bodyFat.toFixed(1));
    } catch (error) {
      console.error("Erro no cálculo:", error);
      alert("Não foi possível calcular com os dados informados. Verifique os valores inseridos.");
      setResult(null);
    }
  };

  return (
    <div className="calculator-container max-w-md mx-auto p-4" data-name="bodyfat-calculator">
      <div className="flex justify-center mb-6">
        <h2 className="text-2xl font-bold">Calculadora de Gordura Corporal</h2>
        <button 
          className="ml-2 mt-1.5 w-8 h-8 rounded-full bg-blue-500 text-white font-bold"
          onClick={() => setShowInfo(true)}
          data-name="bodyfat-info-button"
        >
          ?
        </button>
      </div>

      <div className="mb-4">
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

      <div className="mb-4">
        <label htmlFor="waist" className="block mb-2 font-medium">Cintura (cm):</label>
        <input
          type="number"
          id="waist"
          value={waist}
          onChange={(e) => setWaist(e.target.value)}
          placeholder="Digite a medida de sua cintura (Ex: 74)"
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="neck" className="block mb-2 font-medium">Pescoço (cm):</label>
        <input
          type="number"
          id="neck"
          value={neck}
          onChange={(e) => setNeck(e.target.value)}
          placeholder="Digite a medida de seu pescoço (Ex: 74)"
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="height" className="block mb-2 font-medium">Altura (cm):</label>
        <input
          type="number"
          id="height"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          placeholder="Digite sua altura (Ex: 184)"
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      {gender === 'feminino' && (
        <div className="mb-4">
          <label htmlFor="hip" className="block mb-2 font-medium">Quadril (cm):</label>
          <input
            type="number"
            id="hip"
            value={hip}
            onChange={(e) => setHip(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
      )}

      <button 
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={calculateBodyFat}
        data-name="bodyfat-calculate-button"
      >
        Calcular
      </button>

      {result && (
        <div className="mt-6 text-center">
          <p className="text-lg">Percentual de Gordura Corporal:</p>
          <p className="text-3xl font-bold text-blue-600">{result}%</p>
        </div>
      )}

      {showInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setShowInfo(false)}
          />
          <div className="relative bg-white p-6 rounded-lg max-w-md mx-auto z-10">
            <h3 className="text-xl font-bold mb-4">Sobre o Cálculo de Gordura Corporal</h3>
            <p className="mb-4">Este método usa a Fórmula da Marinha dos EUA para estimar o percentual de gordura corporal.</p>
            <p className="mb-4">
              <strong>Classificação (Homens):</strong><br />
              Essencial: 2-5%<br />
              Atlético: 6-13%<br />
              Fitness: 14-17%<br />
              Aceitável: 18-24%<br />
              Obesidade: 25%+
            </p>
            <p className="mb-4">
              <strong>Classificação (Mulheres):</strong><br />
              Essencial: 10-13%<br />
              Atlético: 14-20%<br />
              Fitness: 21-24%<br />
              Aceitável: 25-31%<br />
              Obesidade: 32%+
            </p>
            <button 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setShowInfo(false)}
              data-name="bodyfat-info-close-button"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BodyFatCalculator;
