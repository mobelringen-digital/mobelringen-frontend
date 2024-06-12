import { Loader } from "@/components/_ui/loader/Loader";

export default function Loading() {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-15 pointer-events-none z-50 flex justify-center items-center h-screen">
      <Loader />
    </div>
  );
}
