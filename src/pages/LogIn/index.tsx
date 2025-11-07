import { useLazyQuery } from "@apollo/client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { SIGN_IN } from "./signIn";
import { useToken } from "../../hooks/useToken";

export function LogIn() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { setToken } = useToken();

  const isFormValid = email.trim() !== "" && password.trim() !== "";

  const [signIn, { loading }] = useLazyQuery(SIGN_IN, {
    onCompleted: (data) => {
      console.log(data);
      if (data.signIn.token) {
        setToken(data.signIn.token);

        const user = {
          id: data.signIn.id,
          name: data.signIn.name,
          email: data.signIn.email,
          token: data.signIn.token,
        };

        localStorage.setItem("user", JSON.stringify(user));

        toast.success("Login realizado com sucesso! Redirecionando...");

        setTimeout(() => navigate("/home"), 1500);
      } else {
        setError("Credenciais inválidas. Verifique e tente novamente.");
        toast.error("Credenciais inválidas. Verifique e tente novamente.");
      }
    },
    onError: (error) => {
      const errorMessage = "Erro ao fazer login. Verifique suas credenciais.";
      setError(errorMessage);
      toast.error(errorMessage);
      console.log(error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      toast.error("Por favor, preencha o email.");
      return;
    }

    if (!password.trim()) {
      toast.error("Por favor, preencha a senha.");
      return;
    }

    if (password.length < 8) {
      toast.error("A senha deve ter no mínimo 8 caracteres.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Por favor, insira um email válido.");
      return;
    }

    signIn({ variables: { email, password } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4">
      <Toaster />
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            {isLogin ? "Bem-vindo de volta!" : "Criar sua conta"}
          </h1>
          <p className="text-gray-600">
            {isLogin ? "Entre para acessar sua conta" : "Junte-se a nós hoje"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block font-semibold text-gray-700 text-sm"
              >
                Nome Completo
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={!isLogin}
                placeholder="Seu nome completo"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-base transition-all outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>
          )}

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block font-semibold text-gray-700 text-sm"
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
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-base transition-all outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block font-semibold text-gray-700 text-sm"
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
              minLength={8}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-base transition-all outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm text-center border border-red-200">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-6 py-4 rounded-lg text-base font-semibold cursor-pointer transition-all hover:bg-blue-600 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            disabled={!isFormValid || loading}
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
              className="text-blue-500 font-semibold hover:text-blue-600 hover:underline"
            >
              {isLogin ? "Cadastre-se" : "Faça login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
