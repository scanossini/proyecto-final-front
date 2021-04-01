import React from 'react';
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as IoIcons from "react-icons/io5";

export const SidebarData = [
    {
        title: 'Inicio',
        path: '/admin',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Donantes',
        path: '/admin/donantes',
        icon: <BiIcons.BiDonateBlood />,
        cName: 'nav-text'
    },
    {
        title: 'Solicitudes',
        path: '/admin/solicitudes',
        icon: <AiIcons.AiFillDatabase />,
        cName: 'nav-text'
    },
    {
        title: 'Parámetros de donación',
        path: '/admin/parametros',
        icon: <IoIcons.IoOptions />,
        cName: 'nav-text'
    },
    {
        title: 'Hospitales',
        path: '/admin/hospitales',
        icon: <AiIcons.AiFillEnvironment />,
        cName: 'nav-text'
    },
    {
        title: 'Gestionar Administradores',
        path: '/admin/admins',
        icon: <AiIcons.AiFillUnlock/>,
        cName: 'nav-text'
    }
] 