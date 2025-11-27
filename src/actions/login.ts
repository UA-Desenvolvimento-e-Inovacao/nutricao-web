'use server'

// Definição do tipo de retorno para o TypeScript saber o que esperar
export type LoginState = {
  status: 'success' | 'error' | null;
  message: string;
  data?: any;
}

// O primeiro argumento OBRIGATÓRIO é o estado anterior (prevState)
export default async function login(prevState: LoginState, formData: FormData): Promise<LoginState> {
  // 1. Pegar dados do FormData
  const cpfRaw = formData.get('cpfColaborador') as string;
  const senhaColaborador = formData.get('senhaColaborador') as string;

  // 2. Limpar o CPF (remover pontos e traços para enviar só números para a API)
  // Se a sua API aceita com pontuação, remova o .replace
  const cpfColaborador = cpfRaw ? cpfRaw.replace(/\D/g, '') : '';

  // 3. Validação Básica
  if (!cpfColaborador || !senhaColaborador) {
    return { status: 'error', message: 'Preencha CPF e Senha.' };
  }

  // Opcional: Validar tamanho do CPF limpo
  if (cpfColaborador.length !== 11) {
    return { status: 'error', message: 'CPF inválido (necessário 11 dígitos).' };
  }

  // 4. Montar o Payload JSON
  const payload = {
    cpfColaborador,     // Envia apenas números
    senhaColaborador,
    codSistema: 1       // Campo que estava faltando
  };

  try {
    const res = await fetch('https://pesquisa.unimedararuama.com.br/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const responseData = await res.json().catch(() => null);

    if (!res.ok) {
      // Retorna erro vindo da API ou mensagem genérica
      return { 
        status: 'error', 
        message: responseData?.message || 'Credenciais inválidas ou erro na API.' 
      };
    }

    // 5. Sucesso
    // Se precisar redirecionar, use redirect('/dashboard') aqui
    return { 
      status: 'success', 
      message: 'Login realizado com sucesso!', 
      data: responseData 
    };

  } catch (error) {
    console.error('Erro na Action:', error);
    return { status: 'error', message: 'Falha ao conectar com o servidor.' };
  }
}