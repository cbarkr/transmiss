export default function StopError({ error }: { error: string }) {
  return (
    <div className="rounded-3xl p-4 bg-zinc-700">
      <div className="flex flex-row justify-center">
        <div className="flex flex-col">
          <div className="text-center">{error}</div>
        </div>
      </div>
    </div>
  );
}
