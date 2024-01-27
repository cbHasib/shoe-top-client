import { useGetAllSemestersQuery } from "../../../redux/features/academicSemester/academicSemesterApi";

const AcademicSemester = () => {

    const {data} = useGetAllSemestersQuery(undefined);

    return (
        <div>
            AcademicSemester

            json: {JSON.stringify(data)}
        </div>
    );
};

export default AcademicSemester;