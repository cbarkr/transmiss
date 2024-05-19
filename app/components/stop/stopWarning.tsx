export default function StopWarning() {
  return (
    <div className="flex flex-row items-center gap-8 p-2 bg-orange-500 text-black">
      <div className="text-2xl font-bold pl-8">!</div>
      <div className="mx-2">
        <p className="text-lg font-bold">
          Issues reported within the past hour
        </p>
        <p>Submit a report to help!</p>
      </div>
    </div>
  );
}
