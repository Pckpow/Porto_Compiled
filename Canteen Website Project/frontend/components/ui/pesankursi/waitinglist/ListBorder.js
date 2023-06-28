export default function ListBorder({ children }) {
  return (
    <div className="flex w-full rounded-3xl border-4 border-solid border-main-black py-5 px-3">
      {children}
    </div>
  );
}
