import { useParams } from "react-router-dom";

const StudentManage = () => {
    const { id } = useParams<{ id: string }>();
    
    return (
        <div>
            <h2>学生管理</h2>
            <p>班级ID: {id}</p>
        </div>
    )
}

export default StudentManage;