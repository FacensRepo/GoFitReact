import { XMarkIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { Navigate } from "react-router-dom";

interface AuthModalProps {
  onClose?: () => void;
  onLoginSuccess: (token: string) => void;
}

export function AuthModal({ onClose, onLoginSuccess }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Aqui você irá integrar com sua API de autenticação
      // Exemplo de chamada:
      const endpoint = isLogin ? "/api/login" : "/api/register";
      const body = isLogin ? { email, password } : { name, email, password };

      // Simulação de requisição (substitua pela sua API real)
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Falha na autenticação");
      }

      const data = await response.json();
      const token = data.token;

      // Salvar token e notificar sucesso
      localStorage.setItem("token", token);
      onLoginSuccess(token);
    } catch (err) {
      setError(
        isLogin
          ? "Email ou senha incorretos"
          : "Erro ao criar conta. Tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-[9999] backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-[90%] max-h-[90vh] overflow-y-auto animate-slideIn">
        <div className="relative p-8">
          <div className="absolute top-2 right-3">
            <XMarkIcon
              className="w-6 cursor-pointer hover:text-gray-950"
              // onClick={() => setModalAdd(false)}
            />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
            {isLogin ? "Fazer Login" : "Criar Conta"}
          </h2>
          <p className="text-gray-600 text-center mb-8 text-sm">
            {isLogin
              ? "Entre para acessar os jogos exclusivos"
              : "Cadastre-se para jogar"}
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {!isLogin && (
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="name"
                  className="font-semibold text-gray-700 text-sm"
                >
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={!isLogin}
                  placeholder="Seu nome completo"
                  className="px-4 py-3 border-2 border-gray-200 rounded-lg text-base transition-all outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>
            )}

            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="font-semibold text-gray-700 text-sm"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="seu@email.com"
                className="px-4 py-3 border-2 border-gray-200 rounded-lg text-base transition-all outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className="font-semibold text-gray-700 text-sm"
              >
                Senha
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Sua senha"
                minLength={6}
                className="px-4 py-3 border-2 border-gray-200 rounded-lg text-base transition-all outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm text-center border border-red-200">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-3.5 rounded-lg text-base font-semibold cursor-pointer transition-all mt-2 hover:bg-blue-600 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              disabled={loading}
            >
              {loading ? "Carregando..." : isLogin ? "Entrar" : "Criar Conta"}
            </button>
          </form>

          <div className="mt-6 text-center pt-6 border-t border-gray-200">
            <p className="text-gray-600 text-sm">
              {isLogin ? "Não tem uma conta?" : "Já tem uma conta?"}{" "}
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError("");
                }}
                className="bg-transparent border-none text-blue-500 font-semibold cursor-pointer underline text-sm p-0 ml-1 hover:text-blue-600"
              >
                {isLogin ? "Cadastre-se" : "Faça login"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
