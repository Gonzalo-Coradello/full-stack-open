import { CoursePart } from '../types/types';
import Part from './Part';

type Props = {
  courseParts: CoursePart[];
};

export default function Content({ courseParts }: Props) {
  return (
    <div>
      {courseParts.map(part => (
        <Part key={part.name} part={part} />
      ))}
    </div>
  );
}
