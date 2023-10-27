import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { NonSensitiveDiaryEntry } from '../types';

const getAll = async () => {
  const { data } = await axios.get<NonSensitiveDiaryEntry[]>(
    `${apiBaseUrl}/diaries`
  );
  return data;
};

export default {
  getAll,
};
