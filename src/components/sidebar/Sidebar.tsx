'use client';

import { useState } from 'react';
import { ChevronDown, Users, Apple, FileText, ChevronLeft, ChevronRight, Tag, HandPlatter, Settings, Settings2,   } from 'lucide-react';

export default function Sidebar() {
  const [expandedMenu, setExpandedMenu] = useState('pacientes');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleMenu = (menuName) => {
    setExpandedMenu(expandedMenu === menuName ? null : menuName);
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    // Fecha todos os menus quando colapsar
    if (!isCollapsed) {
      setExpandedMenu(null);
    }
  };

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
        { label: 'Cadrdápio', path: 'nutricao/cardapio' },
        { label: 'Prato', path: '/nutricao/prato' },
        // { label: 'Planos Alimentares', path: '/planos' }
      ]
    },
    {
      id: 'etiquetas',
      label: 'Etiquetas',
      subtitle: 'Gerenciar Etiquetas',
      icon: Tag,
      subItems: [
        { label: 'Etiquetas', path: '/etiqueta' },
        // { label: 'Prato', path: '/nutricao/prato' },
        // { label: 'Planos Alimentares', path: '/planos' }
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
        // { label: 'Planos Alimentares', path: '/planos' }
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

  return (
    <nav 
      className={`
        bg-white h-screen p-4 border border-red-50 relative
        transition-all duration-300 ease-in-out
        ${isCollapsed ? 'w-20' : 'w-80'}
      `}
    >
      {/* Botão de Expandir/Colapsar */}
      <button
        onClick={toggleSidebar}
        className="
          absolute -right-3 top-6 bg-white border border-gray-300 
          rounded-full p-1.5 shadow-md hover:bg-gray-50
          transition-colors z-10 cursor-pointer
        "
        title={isCollapsed ? 'Expandir menu' : 'Recolher menu'}
      >
        {isCollapsed ? <ChevronRight color='gray' size={16} /> : <ChevronLeft color='gray' size={16} />}
      </button>

      {/* Header */}
      <div className="mb-6 pb-4 border-b border-gray-200">
        {isCollapsed ? (
          <div className="flex justify-center">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SN</span>
            </div>
          </div>
        ) : (
          <h3 className="text-xl font-bold text-gray-800">Sistema Nutrição</h3>
        )}
      </div>

      {/* <h2 className='text-gray-700 text-2xl mb-5'>Módulos</h2> */}
      {/* Menu Items */}
      <ul className="space-y-2">
        {menuItems.map((menu) => {
          const Icon = menu.icon;
          const isExpanded = expandedMenu === menu.id;
          
          
          return (
            <li key={menu.id}>
              {/* Botão Principal */}
              <button
                onClick={() => !isCollapsed && toggleMenu(menu.id)}
                className={`
                  cursor-pointer w-full flex items-center justify-between p-3 rounded-lg 
                  transition-all duration-200
                  ${isExpanded 
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
                      <div className="text-xs text-gray-500">{menu.subtitle}</div>
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
                  <ul className="ml-4 space-y-1 py-2">
                    {menu.subItems.map((subItem, index) => (
                      <li key={index}>
                        <a
                          href={subItem.path}
                          className="
                            flex items-center gap-3 p-2 pl-9 rounded-lg
                            text-gray-600 hover:bg-gray-100 hover:text-gray-900
                            transition-colors
                          "
                        >
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                          {subItem.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          );
        })}
      </ul>
      
        {/* config */}
      <div className="absolute bottom-4 left-4 right-4">
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
          <div className="flex items-center justify-between p-4 bg-white">
            {/* Avatar e Informações */}
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-semibold text-lg">W</span>
              </div>
              
              {/* Nome e Cargo */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Wellington Santos</h3>
                <p className="text-xs text-gray-500">Administrador</p>
              </div>
            </div>

            {/* Botão de Configurações */}
            <button 
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              title="Configurações"
            >
              <Settings size={20} className="text-gray-600" />
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}