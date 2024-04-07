import { RotateLoader } from "react-spinners";

type LoaderProps = {
  isLoading: boolean;
};

const Loader = ({ isLoading }: LoaderProps) => {
  return (
    <RotateLoader
      color="#295cba"
      loading={isLoading}
      size={50}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default Loader;
