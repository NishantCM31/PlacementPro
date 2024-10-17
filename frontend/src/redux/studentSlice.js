// studentSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    students: [],
    searchStudentByText: "",
};

const studentSlice = createSlice({
    name: 'student',
    initialState,
    reducers: {
        setStudents: (state, action) => {
            state.students = action.payload;
        },
        setSearchStudentByText: (state, action) => {
            state.searchStudentByText = action.payload;
        },
    },
});

export const { setStudents, setSearchStudentByText } = studentSlice.actions;
export default studentSlice.reducer;
