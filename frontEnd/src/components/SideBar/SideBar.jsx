import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import SchoolIcon from '@mui/icons-material/School';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import { Link, useLocation } from 'react-router-dom';
import { Menu, ConfigProvider } from 'antd';
import { useMemo } from 'react';

const items = [
  { key: '1', icon: <CoPresentIcon />, label: 'Maestros'},
  { key: '2', icon: <SchoolIcon />,  label: <Link to="/alumnos">Alumnos</Link>,},
  { key: '3', icon: <GroupIcon />,  label: <Link to="/grupos">Grupos</Link>,},
  { key: '4', icon: <PersonIcon />, label: <Link to="/usuarios">Usuarios</Link>, }
];

const SideBar = () => {
    const location = useLocation();
    
    // Mapear rutas a claves del menú
    const routeToKeyMap = {
        '/maestros': '1',
        '/alumnos': '2',
        '/grupos': '3',
        '/usuarios': '4'
    };
    
    // Obtener la clave seleccionada basada en la ruta actual
    const selectedKey = useMemo(() => {
        return routeToKeyMap[location.pathname] || '1';
    }, [location.pathname]);

    const items = [
        { 
            key: '1', 
            icon: <CoPresentIcon />, 
            label: <Link to='/maestros'>Maestros</Link>
        },
        { 
            key: '2', 
            icon: <SchoolIcon />, 
            label: <Link to='/alumnos'>Alumnos</Link>
        },
        { 
            key: '3', 
            icon: <GroupIcon />,  
            label: <Link to="/grupos">Grupos</Link>
        },
        { 
            key: '4', 
            icon: <PersonIcon />, 
            label: <Link to="/usuarios">Usuarios</Link>
        },
    ];

    return (
        <ConfigProvider
            theme={{
                token: {
                },
                components: {
                    Menu: {
                        colorPrimary: "#243642", //Color del texto en Hover
                        itemActiveBg: "#38747899", //Color al presionar sobre una opción
                        itemBg: "#38747899", //Color de todo el menu
                        itemColor: "#FFF", //Color del texto por defecto
                        itemHoverBg: "none", //Color de hover sobre item
                        itemSelectedBg: "#transparent", //Color cuando está seleccionado
                        itemSelectedColor: "#243642", //Color del texto cuando está seleccionado
                        iconSize: 32,
                        fontSize: 24,
                        itemMarginBlock: 10,
                        iconMarginInlineEnd: 10,
                        fontFamily: "Inter, sans-serif"
                    }
                }
            }}
        >
            <div style={{ width: "100%", height: "100%", margin: 0, padding: 0 }}>
                <Menu
                    selectedKeys={[selectedKey]} // Usar selectedKeys dinámicamente
                    mode="inline"
                    inlineCollapsed={false}
                    items={items}
                    style={{ height: "100%", fontWeight: "bold" }}
                />
            </div>
        </ConfigProvider>
    );
};

export default SideBar;