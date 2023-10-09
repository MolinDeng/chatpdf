const SignUpLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="overflow-auto bg-primary bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-slate-400 to-yellow-100">
      <div className="block m-0">{children}</div>
    </div>
  );
};

export default SignUpLayout;
