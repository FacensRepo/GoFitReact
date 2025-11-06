import { useMutation } from "@apollo/client";
import { EyeIcon, EyeSlashIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { CREATE_USER } from "./createUser";
import { useToken } from "../../hooks/useToken";

interface AuthModalProps {
  onClose?: () => void;
  onLoginSuccess: (token: string) => void;
}

export function AuthModal({}: AuthModalProps) {
  const { setToken } = useToken();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  // const [modalError, setModalError] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmationError, setPasswordConfirmationError] =
    useState("");
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");

  // const [modalLogin, setModalLogin] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const [createUser] = useMutation(CREATE_USER);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isFormValid =
    Object.values(formData).every((value) => value.trim() !== "") &&
    !emailError &&
    formData.password.length >= 6 &&
    formData.password === formData.passwordConfirmation;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "name") {
      setNameError(value.trim() === "" ? "Preencha o campo nome!" : "");
    }

    if (name === "email") {
      if (value.trim() === "") {
        setEmailError("Preencha o campo email!");
      } else if (!validateEmail(value)) {
        setEmailError("É necessário acrescentar um email válido!");
      } else {
        setEmailError("");
      }
    }

    if (name === "password") {
      if (value === "") {
        setPasswordError("Preencha o campo senha!");
      } else if (value.length < 6) {
        setPasswordError("A senha deve conter ao menos 6 caracteres!");
      } else {
        setPasswordError("");
      }

      // Revalidar confirmação de senha se já foi preenchida
      if (formData.passwordConfirmation !== "") {
        setPasswordConfirmationError(
          value !== formData.passwordConfirmation
            ? "As senhas não coincidem!"
            : ""
        );
      }
    }

    if (name === "passwordConfirmation") {
      if (value === "") {
        setPasswordConfirmationError(
          "Preencha o campo de confirmação de senha!"
        );
      } else if (value !== formData.password) {
        setPasswordConfirmationError("As senhas não coincidem!");
      } else {
        setPasswordConfirmationError("");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação final antes do envio
    if (!isLogin) {
      if (formData.name.trim() === "") {
        setNameError("Preencha o campo nome!");
        return;
      }
      if (formData.password !== formData.passwordConfirmation) {
        setPasswordConfirmationError("As senhas não coincidem!");
        return;
      }
    }

    if (!validateEmail(formData.email)) {
      setEmailError("É necessário acrescentar um email válido!");
      return;
    }

    if (formData.password.length < 6) {
      setPasswordError("A senha deve conter ao menos 6 caracteres!");
      return;
    }

    setLoading(true);

    try {
      const { data } = await createUser({
        variables: {
          input: {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            passwordConfirmation: formData.passwordConfirmation,
          },
        },
      });

      if (data?.createUser?.metadata?.token) {
        setToken(data.createUser.metadata.token);
        window.location.reload();
      }
    } catch (err) {
      console.error("Erro no cadastro:", err);
      setEmailError("Erro ao criar conta. Tente novamente.");
    } finally {
      setLoading(false);
    }
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

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
                    value={formData.name}
                    name="name"
                    onChange={handleInputChange}
                    required={!isLogin}
                    placeholder="Nome"
                    className="px-4 py-3 border-2 border-gray-200 rounded-lg text-base transition-all outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                {nameError && (
                  <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm text-center border border-red-200">
                    {nameError}
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
                value={formData.email}
                name="email"
                onChange={handleInputChange}
                required
                placeholder="xxxx@email.com"
                className="px-4 py-3 border-2 border-gray-200 rounded-lg text-base transition-all outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            {emailError && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm text-center border border-red-200">
                {emailError}
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
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  placeholder="Sua senha"
                  minLength={6}
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

            {passwordError && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm text-center border border-red-200">
                {passwordError}
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
                      value={formData.passwordConfirmation}
                      name="passwordConfirmation"
                      onChange={handleInputChange}
                      required
                      placeholder="Confirme sua senha"
                      minLength={6}
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

                {passwordConfirmationError && (
                  <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm text-center border border-red-200">
                    {passwordConfirmationError}
                  </div>
                )}
              </div>
            )}

            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-3.5 rounded-lg text-base font-semibold cursor-pointer transition-all mt-2 hover:bg-blue-600 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              disabled={loading || (!isLogin && !isFormValid)}
            >
              {loading ? "Carregando..." : isLogin ? "Entrar" : "Criar Conta"}
            </button>
          </form>

          <div className="mt-6 text-center pt-6 border-t border-gray-200">
            <p className="text-gray-600 text-sm">
              {isLogin ? "Não tem uma conta?" : "Já tem uma conta?"}
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  // Limpar erros ao alternar entre login e cadastro
                  setNameError("");
                  setEmailError("");
                  setPasswordError("");
                  setPasswordConfirmationError("");
                  // Limpar formulário
                  setFormData({
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
