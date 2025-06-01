import {Row, Col} from 'antd';
import SideBar from '../components/SideBar/SideBar'
import Header from '../components/Header/Header';

const PanelLayout = ({icon, name, content}) => {
    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            {/* Header con altura fija */}
            <Row style={{ flexShrink: 0 }}>
                <Col span={24}>
                    <Header nameSection={name} iconSection={icon} />
                </Col>
            </Row>

            {/* Contenido principal que ocupa el alto restante */}
            <Row style={{ flex: 1, overflow: 'hidden' }}>
                <Col span={4} style={{ height: '100%', overflowY: 'auto' }}>
                    <SideBar />
                </Col>
                <Col span={20} style={{ height: '100%', overflowY: 'auto', padding:"1.2rem" }}>
                    {content}
                </Col>
            </Row>
        </div>
    );
};

export default PanelLayout;