'use client';

import { useState, useEffect, startTransition } from 'react';
import { ChevronDown, Users, Apple, FileText, ChevronLeft, ChevronRight, Tag, HandPlatter, Settings, LogOut } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link'; // Importante: Usar Link ao invés de tag <a>
import { usePathname } from 'next/navigation'; // Importante: Para pegar a rota atual
import logo from './../../../public/assets/logoLogin.png';
import logoFolha from './../../../public/assets/folha.png';

export default function Sidebar() {
  // Inicializa nulo, pois o useEffect vai decidir quem abre
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const [isCollapsed, setIsCollapsed] = useState<boolean | null>(false);
  
  const pathname = usePathname(); // Hook para pegar a URL atual

  // Definição dos itens do menu (Mantive igual)
  const menuItems = [
    {
      id: 'pacientes',
      label: 'Pacientes',
      subtitle: 'Pacientes e Dietas',
      icon: Users,
      subItems: [
        { label: 'Pacientes', path: '/paciente' },
        { label: 'Dietas', path: '/paciente/dieta' },
        { label: 'Prescrições', path: '/paciente/prescricao' }
      ]
    },
    {
      id: 'nutricao',
      label: 'Nutrição',
      subtitle: 'Cardápios e Pratos',
      icon: Apple,
      subItems: [
        { label: 'Cardápio', path: '/nutricao/cardapio' }, // Corrigi typo 'Cadrdápio' e adicionei a barra inicial
        { label: 'Prato', path: '/nutricao/prato' },
      ]
    },
    {
      id: 'etiquetas',
      label: 'Etiquetas',
      subtitle: 'Gerenciar Etiquetas',
      icon: Tag,
      subItems: [
        { label: 'Etiquetas', path: '/etiqueta' },
      ]
    },
    {
      id: 'delivery',
      label: 'Delivery',
      subtitle: 'Gerenciar Pedidos',
      icon: HandPlatter,
      subItems: [
        { label: 'Pedidos', path: '/pedidos' },
        { label: 'Acompanhar', path: '/acompanhar' },
      ]
    },
    {
      id: 'relatorios',
      label: 'Relatórios',
      subtitle: 'Estatísticas e Análises',
      icon: FileText,
      subItems: [
        { label: 'Dashboard', path: '/dashboard' },
        { label: 'Relatórios', path: '/relatorios' },
        { label: 'Exportar Dados', path: '/exportar' }
      ]
    }
  ];

  // Efeito para manter o menu aberto baseado na rota atual
  useEffect(() => {
    if (!isCollapsed) {
      // Encontra qual menu pai contém a rota atual
      const activeMenu = menuItems.find(menu => 
        menu.subItems.some(sub => sub.path === pathname)
      );
      
      if (activeMenu) {
        // Use startTransition to schedule a non-urgent update and avoid synchronous cascading renders,
        // and only update if the value actually changes.
        startTransition(() => {
          setExpandedMenu(prev => prev === activeMenu.id ? prev : activeMenu.id);
        });
      }
    }
  }, [pathname, isCollapsed]);

  const toggleMenu = (menuName: string) => {
    if(menuName){
      setExpandedMenu(expandedMenu === menuName ? null : menuName);
    }
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    if (!isCollapsed) {
      setExpandedMenu(null);
    }
  };

  async function logout() {
    await fetch("/api/logout", { method: "POST" });
    window.location.href = "/login";
  }
  return (
    <nav 
      className={`
        bg-white h-full p-4 border border-red-50 relative
        transition-all duration-300 ease-in-out flex flex-col
        ${isCollapsed ? 'w-20' : 'w-80'}
      `}
    >
      {/* Botão de Expandir/Colapsar */}
      <button
        onClick={toggleSidebar}
        className="
          absolute -right-3 top-6 bg-white border border-[#77C526]
          rounded-full p-1.5 shadow-md hover:bg-[#EDFFDA]
          transition-colors z-10 cursor-pointer
        "
        title={isCollapsed ? 'Expandir menu' : 'Recolher menu'}
      >
        {isCollapsed ? <ChevronRight color='#1D2A0F' size={16} /> : <ChevronLeft color='#1D2A0F' size={16} />}
      </button>

      {/* Header */}
      <div className="mb-6 pb-4 border-b border-gray-200/40 flex justify-center">
        {isCollapsed ? (
          <div className="flex justify-center">
            <div className="w-9 h-15  rounded-lg flex items-center justify-center">
              <Image src={logoFolha} width={50} height={50} alt='logo de folha'/>
              {/* <span className="text-white font-bold text-sm">SN</span> */}
            </div>
          </div>
        ) : (
          <Image loading='eager' src={logo} alt='Logo' width={150} height={150} sizes='50vw'/>
        )}
      </div>

      {/* Menu Items - Usando flex-1 para ocupar espaço disponível e permitir scroll se necessário */}
      <div className="flex-1 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((menu) => {
            const Icon = menu.icon;
            const isExpanded = expandedMenu === menu.id;
            // Verifica se algum subitem deste menu é a rota ativa para destacar o ícone pai também
            const isActiveParent = menu.subItems.some(sub => sub.path === pathname);
            
            return (
              <li key={menu.id}>
                {/* Botão Principal */}
                <button
                  onClick={() => !isCollapsed && toggleMenu(menu.id)}
                  className={`
                    cursor-pointer w-full flex items-center justify-between p-3 rounded-lg 
                    transition-all duration-200
                    ${(isExpanded || isActiveParent)
                      ? 'bg-green-50 text-green-700' 
                      : 'text-gray-700 hover:bg-gray-50'
                    }
                    ${isCollapsed ? 'justify-center' : ''}
                  `}
                  title={isCollapsed ? menu.label : ''}
                >
                  <div className={`flex items-center gap-3 ${isCollapsed ? '' : 'w-full'}`}>
                    <Icon size={20} />
                    {!isCollapsed && (
                      <div className="text-left flex-1">
                        <div className="font-medium">{menu.label}</div>
                        <div className="text-xs text-gray-500 opacity-80">{menu.subtitle}</div>
                      </div>
                    )}
                  </div>
                  {!isCollapsed && (
                    <ChevronDown 
                      size={20}
                      className={`
                        transition-transform duration-200
                        ${isExpanded ? 'rotate-180' : ''}
                      `}
                    />
                  )}
                </button>

                {/* Submenu Expansível */}
                {!isCollapsed && (
                  <div
                    className={`
                      overflow-hidden transition-all duration-200
                      ${isExpanded ? 'max-h-48 mt-1' : 'max-h-0'}
                    `}
                  >
                    <ul className="ml-4 space-y-1 py-2 border-l-2 border-green-100 pl-2">
                      {menu.subItems.map((subItem, index) => {
                        const isActiveSubItem = pathname === subItem.path;

                        return (
                          <li key={index}>
                            <Link
                              href={subItem.path}
                              className={`
                                flex items-center gap-3 p-2 rounded-lg text-sm
                                transition-colors
                                ${isActiveSubItem 
                                  ? 'text-green-700 font-semibold bg-green-50/50' 
                                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                }
                              `}
                            >
                              <span className={`
                                w-1.5 h-1.5 rounded-full transition-colors
                                ${isActiveSubItem ? 'bg-green-600' : 'bg-gray-400'}
                              `}></span>
                              {subItem.label}
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
      
      {/* Footer Config */}
      <div className="mt-auto pt-4 border-t border-gray-100">
        {isCollapsed ? (
          <div className="flex justify-center">
            <button 
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              title="Configurações"
            >
              <Settings size={20} className="text-gray-600" />
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between p-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-semibold text-lg">W</span>
              </div>
              
              <div className="overflow-hidden">
                <h3 className="text-sm font-semibold text-gray-900 truncate">Wellington Santos</h3>
                <p className="text-xs text-gray-500">Administrador</p>
              </div>
            </div>

            {/* <button 
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              title="Configurações"
            >
              <Settings size={20} color='#1D2A0F' className="text-gray-600" />
            </button> */}
            <button 
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              title="Configurações"
              onClick={logout}
            >
              <LogOut size={20} color='#1D2A0F' className="text-gray-600 ml-2" />
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}