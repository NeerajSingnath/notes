import axios from 'axios';
import { serverURL } from '../App';
import { setUserData } from '../redux/userSlice';

const getCurrentUser = async (dispatch) => {
  try {
    const result = await axios.get(serverURL + '/api/user/currentuser', {
      withCredentials: true,
    });
    // console.log(result.data);
    dispatch(setUserData(result.data));
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const generateNotes = async (payload) => {
  try {
    const result = await axios.post(
      serverURL + '/api/notes/generate-notes',
      payload,
      { withCredentials: true },
    );
    console.log(result.data);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};
export default getCurrentUser;

export const downloadPdf = async (result) => {
  try {
    const response = await axios.post(
      serverURL + '/api/pdf/generate-pdf',
      { result },
      {
        responseType: 'blob',
        withCredentials: true,
      },
    );

    const blob = new Blob([response.data], {
      type: 'application/pdf',
    });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ExamNotesAI.pdf';
    link.click();

    window.URL.revokeObjectURL(url);
  } catch (error) {
    throw new Error('PDF download failed', error);
  }
};
