export default function Keterangan({ desc, color }) {
  return (
    <div className="flex items-center justify-center space-x-3">
      <div
        style={{ backgroundColor: color }}
        className="h-6 w-6 rounded-full"
      />
      <p className="font-semibold">{desc}</p>
    </div>
  );
}
