import { DeleteLayout } from "./Modals/DeleteLayout";
import { EditLayout } from "./Modals/EditLayout";

type ModalTypes = "Delete" | "Edit" | "";

type Listing = {
  id: number;
  product_id: string;
  title: string;
  price: string;
  description: string;
  image: string;
  owner: string;
};

type ModalProps = {
  onHide: () => void;
  show: boolean;
  modalType: ModalTypes;
  item?: Listing;
  setProductData?: React.Dispatch<React.SetStateAction<Listing>>;
};
const Modal = ({ onHide, show, modalType, ...props }: ModalProps) => {
  let layout = {
    header: <div></div>,
    body: <div></div>,
    footer: <div></div>,
  };

  if (!show) {
    return null;
  }

  let modalContent;
  switch (modalType) {
    case "Delete":
      modalContent = DeleteLayout({
        onHide,
        item: props.item!,
        show: true,
      });
      break;
    case "Edit":
      modalContent = EditLayout({
        item: props.item!,
        show: true,
        setProductData: props.setProductData!,
      });
      break;

    default:
      modalContent = null;
  }

  layout = {
    header: modalContent!.header,
    body: modalContent!.body,
    footer: modalContent!.footer,
  };

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
      onClick={onHide}
    >
      <div
        className="relative top-20 mx-auto p-5 border max-w-xl shadow-lg rounded-md bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center border-b-2 pb-2">
          <h5 className="text-xl font-medium text-gray-900 mb-2">
            {layout.header}
          </h5>
          <button
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            onClick={onHide}
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div className="mt-2 flex justify-center">{layout.body}</div>
        <div className="flex justify-around p-6">{layout.footer}</div>
      </div>
    </div>
  );
};

export default Modal;
