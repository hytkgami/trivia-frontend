interface ButtonProps {
  title: string;
  onClick?: () => void;
}

const Button = (props: ButtonProps) => {
  return (
    <div className="mt-10 flex items-center justify-center gap-x-6">
      <a
        href="#"
        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={props.onClick}
      >
        {props.title}
      </a>
    </div>
  );
};

export { Button };
