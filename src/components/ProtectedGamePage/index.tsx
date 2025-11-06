import { ReactNode, useState, useEffect } from "react";
import { AuthModal } from "../AuthModal";
import { useToken } from "../../hooks/useToken";

interface ProtectedGamePageProps {
  children: ReactNode;
}

export function ProtectedGamePage({ children }: ProtectedGamePageProps) {
  const { token, setToken } = useToken();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verifica se o usuário já está autenticado
    const storedToken = localStorage.getItem("token");
    if (storedToken && !token) {
      setToken(storedToken);
    }
    setIsAuthenticated(!!storedToken || !!token);
    setIsLoading(false);
  }, [token, setToken]);

  const handleLoginSuccess = (newToken: string) => {
    setToken(newToken);
    setIsAuthenticated(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600">Carregando...</div>
      </div>
    );
  }

  return (
    <>
      {/* Conteúdo da página (sempre renderizado, mas desfocado se não autenticado) */}
      <div
        className={
          isAuthenticated ? "" : "blur-md pointer-events-none select-none"
        }
      >
        {children}
      </div>

      {/* Modal de autenticação sobreposto */}
      {!isAuthenticated && <AuthModal onLoginSuccess={handleLoginSuccess} />}
    </>
  );
}
