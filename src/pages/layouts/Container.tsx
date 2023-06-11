interface Props {
  children: React.ReactNode;
}

export const Container = (props: Props) => {
  return <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{props.children}</div>;
};
