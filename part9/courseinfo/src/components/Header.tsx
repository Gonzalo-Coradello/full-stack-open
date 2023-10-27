type Props = {
  name: string;
};

export default function Header({ name }: Props) {
  return <h1>{name}</h1>;
}
