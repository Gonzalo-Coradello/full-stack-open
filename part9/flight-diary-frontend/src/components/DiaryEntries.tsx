import { useState, useEffect } from 'react';
import { NonSensitiveDiaryEntry } from '../types';
import diaryService from '../services/diaries';
import DiaryEntry from './DiaryEntry';

export default function DiaryEntries() {
  const [entries, setEntries] = useState<NonSensitiveDiaryEntry[]>([]);

  useEffect(() => {
    diaryService.getAll().then(data => setEntries(data));
  }, []);

  return (
    <div>
      <h2>Diary entries</h2>
      <div>
        {entries.map(entry => (
          <DiaryEntry key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  );
}
