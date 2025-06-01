import {Flex} from 'antd';
import LogoutIcon from '@mui/icons-material/Logout';

//Obtener el correo del usuario
let user = "2022371049";

const Header = ({ nameSection = "Default", iconSection }) => {
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
                        {user}<a style={{color:"#FFF"}}><LogoutIcon style={{fontSize:"2.25rem"}}></LogoutIcon></a>
                    </Flex>
                </section>
            </Flex>
        </header>
    )
}

export default Header;