type InfoLayoutProps = {
  onHide: () => void;
  show: boolean;
};
export const InfoLayout = ({ onHide, show }: InfoLayoutProps) => {
  if (!show) {
    return null;
  }

  const handleConfirm = () => {
    onHide();
  };
  const header = (
    <div>
      <h2>Info </h2>
    </div>
  );

  const footer = <div></div>;
  return { header, body: <div></div>, footer };
};
