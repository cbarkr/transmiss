export default function StopError({ error }: { error: string }) {
  return (
    <div className="flex flex-row items-center gap-8 p-2 bg-yellow-500 text-black rounded-bl-3xl rounded-r-3xl">
      <div className="text-2xl font-bold pl-8">!</div>
      <p className="mx-2text-lg font-bold">
        {error}
      </p>
    </div>
  );
}
