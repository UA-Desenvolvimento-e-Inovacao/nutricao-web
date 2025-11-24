import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 1. O nome do cookie que você usa para armazenar a sessão
const AUTH_COOKIE_NAME = 'token';

export function middleware(request: NextRequest) {  
  
  // console.log(request.nextUrl);
  
  
  // // 2. Pegar o cookie da requisição
  // const sessionToken = request.cookies.get(AUTH_COOKIE_NAME);
  // // console.log(sessionToken);
  

  // // 3. Se não houver token, o usuário não está logado.
  // if (!sessionToken) {
  //   // Redireciona para a página de login
  //   // new URL('/login', request.url) cria a URL absoluta
  //   // ex: http://localhost:3000/login
  //   console.log('Middleware: Sem token, redirecionando para /login');
  //   return NextResponse.redirect(new URL('/login', request.url));
  // }

  // // 4. Se houver um token, deixe a requisição continuar
  // console.log('Middleware: Token encontrado, acesso permitido.');
  // return NextResponse.next();
}

// ... (código da função middleware acima) ...

// 5. O Matcher: define quais rotas devem acionar o middleware
export const config = {
  matcher: [
    /*
     * Combine todas as rotas, EXCETO:
     * - api (rotas de API)
     * - _next/static (arquivos estáticos)
     * - _next/image (arquivos de otimização de imagem)
     * - favicon.ico (ícone do site)
     * - login (a sua página pública de login)
     */
    '/((?!api|_next/static|_next/image|login).*)',
  ],
};