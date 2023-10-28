import axios from "axios";
import { apiBaseUrl } from "../constants";
import { NewDiaryEntry, NonSensitiveDiaryEntry } from "../types";

const getAll = async () => {
  const { data } = await axios.get<NonSensitiveDiaryEntry[]>(
    `${apiBaseUrl}/diaries`
  );
  return data;
};

const create = async (newDiaryEntry: NewDiaryEntry) => {
  const { data } = await axios.post<NonSensitiveDiaryEntry>(
    `${apiBaseUrl}/diaries`,
    newDiaryEntry
  );
  return data;
};

export default {
  getAll,
  create,
};
