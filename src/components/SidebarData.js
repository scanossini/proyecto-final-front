import React from 'react';
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as IoIcons from "react-icons/io5";

export const SidebarData = [
    {
        title: 'Inicio',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Donantes',
        path: '/donantes',
        icon: <BiIcons.BiDonateBlood />,
        cName: 'nav-text'
    },
    {
        title: 'Parámetros de donación',
        path: '/parametros',
        icon: <IoIcons.IoOptions />,
        cName: 'nav-text'
    },
    {
        title: 'Cerrar Sesión',
        path: '/logout',
        icon: <AiIcons.AiOutlineLogout />,
        cName: 'nav-text'
    }
] 