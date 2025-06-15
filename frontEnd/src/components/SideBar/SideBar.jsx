import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import SchoolIcon from '@mui/icons-material/School';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import { Link } from 'react-router-dom';
import { Menu, ConfigProvider } from 'antd';

const items = [
  { key: '1', icon: <CoPresentIcon />, label: 'Maestros'},
  { key: '2', icon: <SchoolIcon />, label: 'Alumnos' },
  { key: '3', icon: <GroupIcon />,  label: <Link to="/grupos">Grupos</Link>,},
  { key: '4', icon: <PersonIcon />, label: <Link to="/usuarios">Usuarios</Link>, },
];

const SideBar = () => {
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
                        itemSelectedBg: "none",
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
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    inlineCollapsed={false} // se cambia a false, el anterior "collapsed" no funcionaba
                    items={items}
                    style={{ height: "100%", fontWeight: "bold" }}
                />
            </div>
        </ConfigProvider>
    );
};
export default SideBar;