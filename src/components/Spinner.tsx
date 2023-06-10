interface Props {
  className?: string;
}

export const Spinner = (props: Props) => {
  return (
    <div className="flex justify-center" aria-label="loading">
      <div className={"animate-spin h-4 w-4 border-2 border-gray-300 rounded-full border-t-transparent " + props.className}></div>
    </div>
  );
};
