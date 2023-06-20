interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button = (props: ButtonProps) => {
  return (
    <button
      className="py-1 px-2 outline text-sm outline-1 outline-gray-300 rounded-md bg-white text-gray-800 hover:bg-gray-100"
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
