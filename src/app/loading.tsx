export default function Loading() {
  return (
    <div className="w-full fixed top-0 left-0 right-0 z-50 pointer-events-none h-1.5">
      <div className="h-1.5 w-full bg-powder overflow-hidden">
        <div className="progress w-full h-full bg-red left-right" />
      </div>
    </div>
  );
}
