import { useRouter } from "next/navigation";

export default function StopError({ error }: { error: string }) {
  const router = useRouter();

  const handleClick = () => {
    router.push("/stops")
  };

  return (
    <div className="flex flex-col text-center gap-8">
      <div className="flex flex-row items-center gap-8 p-2 bg-yellow-400 text-black">
        <div className="text-2xl font-bold pl-8">!</div>
        <p className="mx-2 text-lg font-bold">{error}</p>
      </div>
      <div>
        <button
          onClick={handleClick}
          type="button" 
          className="p-2 border-2 rounded-2xl font-mono"
        >
          ← Go back
        </button>
      </div>
    </div>
  );
}
