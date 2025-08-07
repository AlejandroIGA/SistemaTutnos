import React from 'react';
import { Flex } from 'antd';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

const Header = ({ nameSection = "Default", iconSection }) => {
    const navigate = useNavigate();

    const user = localStorage.getItem('username');

    const handleLogout = async () => { // Hacer la función asíncrona
        try {
            // 1. Limpiar todos los datos de sesión y tokens del cliente
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('id');
            localStorage.removeItem('user_role');
            sessionStorage.removeItem('oauth_state');
            sessionStorage.removeItem('code_verifier');

            const form = document.createElement('form');
  form.method = 'POST';
  form.action = 'http://localhost:9000/logout'; // Endpoint de logout de tu servidor de autorización
  document.body.appendChild(form);
  form.submit();

        } catch (error) {
            console.error('Error durante el proceso de logout:', error);
            // Puedes mostrar un mensaje al usuario si el logout falla
        }    };

    return (
        <header style={{padding:"1.25rem", fontSize:"2.25rem", fontWeight: "bold", backgroundColor:"#387478", paddingBottom:"1.2rem", paddingTop:"1.2rem", color:"#FFF"}}>
            <Flex justify='space-between' align='center'>
                <section>
                    <Flex gap={"small"} align='center'>
                        {iconSection}<p style={{margin:0}}>{nameSection}</p>
                    </Flex>
                </section>
                <section>
                    <Flex gap={"small"} align='center'>
                        {user}
                        <a style={{color:"#FFF", cursor: "pointer"}} onClick={handleLogout}>
                            <LogoutIcon style={{fontSize:"2.25rem"}}></LogoutIcon>
                        </a>
                    </Flex>
                </section>
            </Flex>
        </header>
    )
}

export default Header;
