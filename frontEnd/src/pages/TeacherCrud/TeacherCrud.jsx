import TeacherFormCrud from "../../components/TeacherFormCrud/TeacherFormCrud";
import PanelLayout from "../../layout/PanelLayout";
import CoPresentIcon from '@mui/icons-material/CoPresent';



const TeacherCrud = () => {
let iconAux = <CoPresentIcon style={{fontSize:"2.25rem"}}/>
    return(
        <PanelLayout
        icon={iconAux}
        name="Maestros"
        content={
            <div>
                <TeacherFormCrud/>
            </div>
        }
        />
    )
}

export default TeacherCrud;