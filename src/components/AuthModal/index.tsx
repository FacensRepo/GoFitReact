import { useLazyQuery, useMutation } from "@apollo/client";
import { EyeIcon, EyeSlashIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { CREATE_USER } from "./createUser";
import { useToken } from "../../hooks/useToken";
import toast from "react-hot-toast";
import { SIGN_IN } from "../../pages/LogIn/signIn";
// import { useNavigate } from "react-router-dom";

interface AuthModalProps {
  onClose?: () => void;
  onLoginSuccess: (token: string) => void;
}

export function AuthModal({}: AuthModalProps) {
  const { setToken, setUserName } = useToken();
  // const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  // Estados para Login
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [_loginError, setLoginError] = useState("");

  // Estados para Cadastro
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const [signupErrors, setSignupErrors] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const [signupLoading, setSignupLoading] = useState(false);

  // Estados de UI
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [createUser] = useMutation(CREATE_USER);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isSignupFormValid =
    Object.values(signupData).every((value) => value.trim() !== "") &&
    !signupErrors.email &&
    !signupErrors.name &&
    !signupErrors.password &&
    !signupErrors.passwordConfirmation &&
    signupData.password.length >= 8 &&
    signupData.password === signupData.passwordConfirmation;

  const handleSignupInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });

    const newErrors = { ...signupErrors };

    if (name === "name") {
      newErrors.name = value.trim() === "" ? "Preencha o campo nome!" : "";
    }

    if (name === "email") {
      if (value.trim() === "") {
        newErrors.email = "Preencha o campo email!";
      } else if (!validateEmail(value)) {
        newErrors.email = "É necessário acrescentar um email válido!";
      } else {
        newErrors.email = "";
      }
    }

    if (name === "password") {
      if (value === "") {
        newErrors.password = "Preencha o campo senha!";
      } else if (value.length < 8) {
        newErrors.password = "A senha deve conter ao menos 8 caracteres!";
      } else {
        newErrors.password = "";
      }

      // Revalidar confirmação de senha se já foi preenchida
      if (signupData.passwordConfirmation !== "") {
        newErrors.passwordConfirmation =
          value !== signupData.passwordConfirmation
            ? "As senhas não coincidem!"
            : "";
      }
    }

    if (name === "passwordConfirmation") {
      if (value === "") {
        newErrors.passwordConfirmation =
          "Preencha o campo de confirmação de senha!";
      } else if (value !== signupData.password) {
        newErrors.passwordConfirmation = "As senhas não coincidem!";
      } else {
        newErrors.passwordConfirmation = "";
      }
    }

    setSignupErrors(newErrors);
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação final antes do envio
    if (signupData.name.trim() === "") {
      toast.error("Preencha o campo nome!");
      return;
    }

    if (!validateEmail(signupData.email)) {
      toast.error("É necessário acrescentar um email válido!");
      return;
    }

    if (signupData.password.length < 8) {
      toast.error("A senha deve conter ao menos 8 caracteres!");
      return;
    }

    if (signupData.password !== signupData.passwordConfirmation) {
      toast.error("As senhas não coincidem!");
      return;
    }

    setSignupLoading(true);

    try {
      const { data } = await createUser({
        variables: {
          input: {
            name: signupData.name,
            email: signupData.email,
            password: signupData.password,
            passwordConfirmation: signupData.passwordConfirmation,
          },
        },
      });

      if (data?.createUser) {
        toast.success("Usuário cadastrado com sucesso!");

        // Limpar formulário de cadastro
        setSignupData({
          name: "",
          email: "",
          password: "",
          passwordConfirmation: "",
        });
        setSignupErrors({
          name: "",
          email: "",
          password: "",
          passwordConfirmation: "",
        });

        // Mudar para tela de login após 1 segundo
        setIsLogin(true);
      }
    } catch (err) {
      console.error("Erro no cadastro:", err);
      toast.error("Erro ao criar conta. Tente novamente.");
    } finally {
      setSignupLoading(false);
    }
  };

  const [signIn, { loading: loginLoading }] = useLazyQuery(SIGN_IN, {
    onCompleted: (data) => {
      if (data?.signIn?.token) {
        setToken(data.signIn.token);

        const user = {
          id: data.signIn.id,
          name: data.signIn.name,
          email: data.signIn.email,
          token: data.signIn.token,
        };

        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("name", user.name);

        // Atualizar o contexto com o nome do usuário
        setUserName(user.name);

        toast.success("Login realizado com sucesso! Redirecionando...");

        // setTimeout(() => navigate("/home"), 1500);
      } else {
        setLoginError("Credenciais inválidas. Verifique e tente novamente.");
        toast.error("Credenciais inválidas. Verifique e tente novamente.");
      }
    },
    onError: (error) => {
      const errorMessage = "Erro ao fazer login. Verifique suas credenciais.";
      setLoginError(errorMessage);
      toast.error(errorMessage);
      console.log(error);
    },
  });

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    if (!loginEmail.trim()) {
      toast.error("Por favor, preencha o email.");
      return;
    }

    if (!loginPassword.trim()) {
      toast.error("Por favor, preencha a senha.");
      return;
    }

    if (loginPassword.length < 8) {
      toast.error("A senha deve ter no mínimo 8 caracteres.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(loginEmail)) {
      toast.error("Por favor, insira um email válido.");
      return;
    }

    signIn({ variables: { email: loginEmail, password: loginPassword } });
  };

  return (
    <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-[9999] backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-[90%] max-h-[90vh] overflow-y-auto animate-slideIn">
        <div className="relative p-8">
          <div className="absolute top-2 right-3">
            <a href="/home">
              <XMarkIcon className="w-6 cursor-pointer hover:text-gray-950" />
            </a>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
            {isLogin ? "Fazer Login" : "Criar Conta"}
          </h2>
          <p className="text-gray-600 text-center mb-8 text-sm">
            {isLogin
              ? "Entre para acessar os jogos exclusivos"
              : "Cadastre-se para jogar"}
          </p>

          <form
            onSubmit={isLogin ? handleLoginSubmit : handleSignupSubmit}
            className="flex flex-col gap-5"
          >
            {!isLogin && (
              <div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="name"
                    className="font-semibold text-gray-700 text-sm"
                  >
                    Nome
                  </label>
                  <input
                    type="text"
                    value={signupData.name}
                    name="name"
                    onChange={handleSignupInputChange}
                    required={!isLogin}
                    placeholder="Nome"
                    className="px-4 py-3 border-2 border-gray-200 rounded-lg text-base transition-all outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                {signupErrors.name && (
                  <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm text-center border border-red-200">
                    {signupErrors.name}
                  </div>
                )}
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
                value={isLogin ? loginEmail : signupData.email}
                name="email"
                onChange={
                  isLogin
                    ? (e) => setLoginEmail(e.target.value)
                    : handleSignupInputChange
                }
                required
                placeholder="xxxx@email.com"
                className="px-4 py-3 border-2 border-gray-200 rounded-lg text-base transition-all outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            {!isLogin && signupErrors.email && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm text-center border border-red-200">
                {signupErrors.email}
              </div>
            )}

            <div className="flex flex-col gap-2 relative">
              <label
                htmlFor="password"
                className="font-semibold text-gray-700 text-sm"
              >
                Senha
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={isLogin ? loginPassword : signupData.password}
                  onChange={
                    isLogin
                      ? (e) => setLoginPassword(e.target.value)
                      : handleSignupInputChange
                  }
                  required
                  placeholder="Sua senha"
                  minLength={8}
                  className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-lg text-base transition-all outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {!isLogin && signupErrors.password && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm text-center border border-red-200">
                {signupErrors.password}
              </div>
            )}
            {!isLogin && (
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2 relative">
                  <label
                    htmlFor="passwordConfirmation"
                    className="font-semibold text-gray-700 text-sm"
                  >
                    Confirmar Senha
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={signupData.passwordConfirmation}
                      name="passwordConfirmation"
                      onChange={handleSignupInputChange}
                      required
                      placeholder="Confirme sua senha"
                      minLength={8}
                      className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-lg text-base transition-all outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showConfirmPassword ? (
                        <EyeSlashIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                {signupErrors.passwordConfirmation && (
                  <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm text-center border border-red-200">
                    {signupErrors.passwordConfirmation}
                  </div>
                )}
              </div>
            )}

            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-3.5 rounded-lg text-base font-semibold cursor-pointer transition-all mt-2 hover:bg-blue-600 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              disabled={
                isLogin ? loginLoading : signupLoading || !isSignupFormValid
              }
            >
              {isLogin
                ? loginLoading
                  ? "Carregando..."
                  : "Entrar"
                : signupLoading
                ? "Carregando..."
                : "Criar Conta"}
            </button>
          </form>

          <div className="mt-6 text-center pt-6 border-t border-gray-200">
            <p className="text-gray-600 text-sm">
              {isLogin ? "Não tem uma conta?" : "Já tem uma conta?"}
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  // Limpar estados de login
                  setLoginEmail("");
                  setLoginPassword("");
                  setLoginError("");
                  // Limpar estados de cadastro
                  setSignupData({
                    name: "",
                    email: "",
                    password: "",
                    passwordConfirmation: "",
                  });
                  setSignupErrors({
                    name: "",
                    email: "",
                    password: "",
                    passwordConfirmation: "",
                  });
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
