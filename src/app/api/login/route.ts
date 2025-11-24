import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { cpf, password } = body;
    
    // Validação dos campos
    if (!cpf || !password) {
      return NextResponse.json(
        { message: "CPF e senha são obrigatórios" }, 
        { status: 400 }
      );
    }

    // Remove formatação do CPF para comparação
    const cpfLimpo = cpf.replace(/\D/g, "");

    // Simulação de usuário (substitua por consulta ao banco de dados)
    const cpfValido = "18285623785"; // CPF sem formatação
    const senhaValida = "123456";

    if (cpfLimpo !== cpfValido || password !== senhaValida) {
      return NextResponse.json(
        { message: "CPF ou senha inválidos" }, 
        { status: 401 }
      );
    }
    
    // TODO: Implementar JWT real
    // const token = jwt.sign(
    //   { cpf: cpfLimpo, userId: user.id }, 
    //   process.env.JWT_SECRET!, 
    //   { expiresIn: '24h' }
    // );
    
    const token = "meu-token-jwt-temporario";

    const response = NextResponse.json({ 
      ok: true,
      message: "Login realizado com sucesso",
      user: {
        cpf: cpf // Retorna formatado
      }
    });
    

    console.log('responde login api', response);
    
    // Configuração do cookie
    response.cookies.set("token", token, {
      httpOnly: true, // IMPORTANTE: Deve ser true para segurança
      // secure: process.env.NODE_ENV === "production", // true em produção
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 // 24 horas
    });

    return response;

  } catch (error) {
    console.error("Erro no login:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor" }, 
      { status: 500 }
    );
  }
}