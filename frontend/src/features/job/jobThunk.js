import customFetch from '../../utils/axios';
import { showLoading, hideLoading, getAllJobs } from '../allJobs/allJobsSlice';
import { clearValues } from './jobSlice';
import authHeader from '../../utils/authHeader';

export const createJobThunk = async (job, thunkAPI) => {
  try {
    const res = await customFetch.post('/jobs', job, authHeader(thunkAPI));
    thunkAPI.dispatch(clearValues());
    return res.data.msg;
  } catch (error) {
    // logout user
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue('Unauthorized! Logging Out...');
    }
    return thunkAPI.rejectWithValue(error.response.data.msg);
    // basic setup
    // return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const editJobThunk = async ({ jobId, job }, thunkAPI) => {
  try {
    const res = await customFetch.patch(
      `/jobs/${jobId}`,
      job,
      authHeader(thunkAPI),
    );
    thunkAPI.dispatch(clearValues());
    return res.data.msg;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const deleteJobThunk = async (jobId, thunkAPI) => {
  thunkAPI.dispatch(showLoading());
  try {
    const res = await customFetch.delete(
      `/jobs/${jobId}`,
      authHeader(thunkAPI),
    );
    thunkAPI.dispatch(getAllJobs());
    return res.data.msg;
  } catch (error) {
    thunkAPI.dispatch(hideLoading());
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
