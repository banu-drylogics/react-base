import './styles.css';

interface HeaderProps {
  headers: string[];
}

export const HeaderRow = ({ headers }: HeaderProps) => {
  return (
    <thead>
      <tr>
        {
          headers.map((col: string, index: number) =>
            <th key={index} className="text-center">{col}
            </th>
          )
        }
      </tr>
    </thead>
  )
};
