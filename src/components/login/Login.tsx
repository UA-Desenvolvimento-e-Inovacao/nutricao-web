'use client';

import Image from 'next/image';
import { useState, ChangeEvent, useEffect } from 'react';
import { useActionState } from 'react'; // React 19 ou Next 14/15
import { useRouter } from 'next/navigation';
import logo from './../../../public/assets/logoLogin.png';
import login, { LoginState } from '@/src/actions/login'; // Importe a Action e o Tipo

const initialState: LoginState = {
  status: null,
  message: '',
};

export default function Login() {
  const router = useRouter();
  
  // Hook do Server Action
  const [state, formAction, isPending] = useActionState(login, initialState);

  // Estados apenas para controle visual do input (máscara)
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');

  // Efeito para redirecionar em caso de sucesso
  useEffect(() => {
    if (state.status === 'success') {
      console.log('Login OK, dados:', state.data);
      router.push('/dashboard'); // Redirecionamento no cliente
    }
  }, [state.status, router, state.data]);

  // Função de máscara do CPF
  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, ''); // Remove tudo que não é número
    return numbers
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
      .substring(0, 14); // Limita tamanho
  };

  const handleCpfChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCPF(e.target.value);
    setCpf(formatted);
  };

  return (
    <div className="flex h-screen">
      {/* Lado Esquerdo - Verde com Logo */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-[#c8e6a0] to-[#a8d67a] items-center justify-center relative">
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Image loading='eager' src={logo} alt='Logo' sizes='50vw' style={{ width: 'auto', height: 'auto' }} />
          </div>
        </div>
      </div>

      {/* Lado Direito - Formulário de Login */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-50 p-8">
        <div className="w-full max-w-md">
          
          {/* Logo Mobile */}
          <div className="md:hidden mb-8 text-center">
             <div className="flex items-center justify-center mb-2">
               <Image loading='eager' src={logo} alt='Logo' width={250} height={100} />
             </div>
          </div>
            
          {/* O form action aponta para o hook */}
          <form action={formAction} className="space-y-6">
            
            {/* Mensagem de Erro vinda do Server Action */}
            {state.status === 'error' && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-center text-sm">
                {state.message}
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
                name="cpfColaborador" // Este name deve bater com o formData.get na action
                value={cpf}
                onChange={handleCpfChange}
                placeholder="000.000.000-00"
                disabled={isPending} // Usa o isPending do hook
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#cceaad] transition text-center hover:shadow-[0_0_2px_2px_rgba(204,234,173,0.2)] focus:shadow-[0_0_2px_2px_rgba(204,234,173,0.2)]"
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
                name="senhaColaborador" // Name correto
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="••••••••"
                disabled={isPending}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#cceaad] transition text-center hover:shadow-[0_0_2px_2px_rgba(204,234,173,0.2)] focus:shadow-[0_0_2px_2px_rgba(204,234,173,0.2)]"
              />
            </div>

            {/* Botão Login */}
            <button
              type="submit"
              disabled={isPending} // Desabilita automaticamente enquanto a server action roda
              className="w-full bg-gradient-to-t from-[#61A914] to-[#7CD224] text-white font-medium py-3 px-2 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 cursor-pointer tracking-wider uppercase shadow-md"
            >
              {isPending ? 'ENTRANDO...' : 'LOGIN'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}