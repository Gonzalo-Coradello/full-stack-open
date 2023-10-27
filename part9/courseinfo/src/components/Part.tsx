import { CoursePart } from '../types/types';
import { assertNever } from '../utils/utils';

type Props = {
  part: CoursePart;
};

export default function Part({ part }: Props) {
  switch (part.kind) {
    case 'basic':
      return (
        <div>
          <h2>
            {part.name} {part.exerciseCount}
          </h2>
          <p>{part.description}</p>
        </div>
      );
      break;
    case 'background':
      return (
        <div>
          <h2>
            {part.name} {part.exerciseCount}
          </h2>
          <p>{part.description}</p>
          <p>submit to: {part.backgroundMaterial}</p>
        </div>
      );
      break;
    case 'group':
      return (
        <div>
          <h2>
            {part.name} {part.exerciseCount}
          </h2>
          <p>project exercises: {part.groupProjectCount}</p>
        </div>
      );
    case 'special':
      return (
        <div>
          <h2>
            {part.name} {part.exerciseCount}
          </h2>
          <p>{part.description}</p>
          <p>required skills: {part.requirements.join(', ')}</p>
        </div>
      );
    default:
      return assertNever(part);
      break;
  }
}
