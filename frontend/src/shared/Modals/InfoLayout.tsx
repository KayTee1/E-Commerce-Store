import Button from "../Button";

type InfoLayoutProps = {
  onHide: () => void;
  show: boolean;
  info: string;
};

export const InfoLayout = ({ onHide, show, info }: InfoLayoutProps) => {
  if (!show) {
    return null;
  }

  const handleConfirm = () => {
    onHide();
  };
  const header = (
    <div>
      <h2>Info</h2>
    </div>
  );
  const body = (
    <div>
      <h2 className="text-lg">{info}</h2>
    </div>
  );

  const footer = (
    <div>
      <Button
        className="w-48"
        onClick={handleConfirm}
        content="Close"
        variant="primary"
      />
    </div>
  );
  return { header, body, footer };
};
