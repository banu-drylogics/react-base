import { useEffect, useState } from "react";
import { HeaderRow } from "./HeaderRow";
import LoadMoreButton from "./LoadMoreButton";
import Loader from "./Loader";
import { TableRow } from "./TableRow";
import { ColState, ApiDataFormat } from "./types";
import { useTopicsQuery } from "../../hooks/useTopicsQuery";
import _ from "lodash";

interface TopicsTableProps {
  data: ApiDataFormat;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const TopicsTable = ({ data, page, setPage }: TopicsTableProps) => {
  const [topics, setTopics] = useState<ColState[]>([]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const cloumnArray = _.keys(data.items[0])
    .map((d: string) => d.split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' '));

  useEffect(() => {
    if (data) {
      setTopics((prevTopics) => [...prevTopics, ...data.items])
    }
  }, [data])

  return (
    <div>
      <h1>Git Topics</h1>
      <div className="container">
        <table>
          <HeaderRow headers={cloumnArray} />
          <TableRow records={topics} />
        </table>
      </div>
      {data && data.total_count > page * 20 && (
        <LoadMoreButton handleLoadMore={handleLoadMore} />
      )}
    </div>
  );
}

const TableWithLoader = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useTopicsQuery({ q: 'javascript-applications', per_page: 20, page });

  return (
    <Loader isLoading={isLoading} isError={isError}>
      <TopicsTable data={data} page={page} setPage={setPage} />
    </Loader>
  )
};

export default TableWithLoader