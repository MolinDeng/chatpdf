const SignUpLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <body className="overflow-auto bg-primary lg:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-200 via-red-200 to-yellow-100">
      <div className="block m-0">{children}</div>
    </body>
  );
};

export default SignUpLayout;
