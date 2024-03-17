export default function Home() {
  return (
    <div className="w-full">
      <div className="mt-64 flex flex-col gap-8 justify-center items-center text-center">
        <h1 className="text-4xl font-bold">Transit missing the mark?</h1>
        <a
          href="/stops"
          className="font-bold text-4xl text-blue-400 hover:underline underline-offset-4"
        >
          Report it →
        </a>
      </div>
    </div>
  );
}
