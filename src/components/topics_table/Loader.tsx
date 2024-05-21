
interface LoaderProps {
  isLoading: boolean;
  isError: boolean;
  children: React.ReactNode;
}

const Loading = () => {
  return (
    <div className='loader'>Loading...</div>
  )
};

const ErrorPage = () => {
  return (
    <div>Error: Unable to fetch topics.</div>
  )
};

const Loader = ({ isLoading, isError, children }: LoaderProps) => {
  return (
    isLoading ? <Loading /> : isError ? <ErrorPage /> : <>{children}</>
  )

};

export default Loader;
