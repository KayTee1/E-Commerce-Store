/*
USAGE:
  const [isLoading, setIsLoading] = useState<boolean>(true);

  <Loader isLoading={isLoading} />

NOTE:
  use className prop to add custom stylings
*/

import { RotateLoader } from "react-spinners";
import { twMerge } from "tailwind-merge";

type LoaderProps = {
  isLoading: boolean;
  className?: string;
};

const Loader = ({ isLoading, className }: LoaderProps) => {
  return (
    <div className={twMerge("p-5", className)}>
      <RotateLoader
        color="#295cba"
        loading={isLoading}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loader;
