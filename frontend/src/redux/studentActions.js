// studentActions.js
import { setStudents } from './studentSlice'; // Adjust path as needed
import axios from 'axios';

export const fetchStudents = () => async (dispatch) => {
    try {
        const response = await axios.get('/api/users/students');
        dispatch(setStudents(response.data.students));
    } catch (error) {
        console.error("Error fetching students:", error);
    }
};
