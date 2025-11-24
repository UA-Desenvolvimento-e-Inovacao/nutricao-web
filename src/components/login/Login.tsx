'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState, ChangeEvent } from 'react';
import logo from './../../../public/assets/logoLogin.png';

export default function Login() {
  
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  
  const formatCPF = (value: string) => {
    console.log(value);
    
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }
    return cpf;
  };

  const handleCpfChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCPF(e.target.value);
    setCpf(formatted);
    setError(''); // Limpa erro ao digitar
  };

  const handleSenhaChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSenha(e.target.value);
    setError(''); // Limpa erro ao digitar
  };

  async function handleSubmit ()  {
    console.log('submit', { cpf, senha });
    // Validação dos campos
    if (!cpf || !senha) {
      setError('Preencha todos os campos');
      return;
    }

    // Validação de CPF (verifica se tem 14 caracteres com formatação)
    if (cpf.length !== 14) {
      setError('CPF inválido');
      return;
    }
    
    setIsLoading(true);
    setError('');
    console.log('teste');
    
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cpf, password: senha }),
      });

      
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        setError(errorData.message || 'CPF ou senha inválidos');
        return;
      }

      // Login bem-sucedido
      router.push('/dashboard');
    } catch (error) {
      setError('Erro ao conectar com o servidor. Tente novamente.');
      console.error('Erro no login:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Permitir login ao pressionar Enter
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSubmit();
    }
  };

  return (
    <div className="flex h-screen">
      {/* Lado Esquerdo - Verde com Logo */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-[#c8e6a0] to-[#a8d67a] items-center justify-center relative">
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Image loading='eager' src={logo} alt='Logo' sizes='100vw'/>
          </div>
        </div>
      </div>

      {/* Lado Direito - Formulário de Login */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-50 p-8">
        <div className="w-full max-w-md">
          {/* Logo mobile */}
          <div className="md:hidden mb-8 text-center">
            <div className="flex items-center justify-center mb-2">
              <Image loading='eager' src={logo} alt='Logo' width={250} height={100} sizes='100vw' />
            </div>
          </div>
            
          <div className="space-y-6">
            {/* Mensagem de erro */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-center text-sm">
                {error}
              </div>
            )}

            {/* Campo CPF */}
            <div>
              <label htmlFor="cpf" className="block text-xl text-gray-500 mb-2 text-center">
                CPF usuário
              </label>
              <input
                type="text"
                id="cpf"
                value={cpf}
                onChange={handleCpfChange}
                onKeyPress={handleKeyPress}
                maxLength={14}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#cceaad] transition text-center hover:shadow-[0_0_2px_2px_rgba(204,234,173,0.2)] focus:shadow-[0_0_2px_2px_rgba(204,234,173,0.2)]"
                placeholder="000.000.000-00"
                disabled={isLoading}
              />
            </div>

            {/* Campo Senha */}
            <div>
              <label htmlFor="senha" className="block text-xl text-gray-500 mb-2 text-center">
                Senha
              </label>
              <input
                type="password"
                id="senha"
                value={senha}
                onChange={handleSenhaChange}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#cceaad] transition text-center hover:shadow-[0_0_2px_2px_rgba(204,234,173,0.2)] focus:shadow-[0_0_2px_2px_rgba(204,234,173,0.2)]"
                placeholder="••••••••"
                disabled={isLoading}
              />
            </div>

            {/* Botão Login */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-gradient-to-t from-[#61A914] to-[#7CD224] text-white font-medium py-3 px-2 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 cursor-pointer tracking-wider uppercase shadow-md"
            >
              {isLoading ? 'Entrando...' : 'login'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}