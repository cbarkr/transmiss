import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function Confirmation({ params }: { params: { id: string } }) {
  console.log(params.id);

  return (
    <div className="w-full">
      <div className="mt-64 flex flex-col gap-8 justify-center items-center text-center">
        <div className="flex flex-col items-center text-center">
          <div className="flex flex-row items-center gap-2 font-bold">
            <div className="text-xl my-2">
              <CheckCircleIcon fontSize="large" />
            </div>
            <h3 className="text-xl leading-6">Thanks!</h3>
          </div>
          <div>We received your report</div>
        </div>
        <a
          href="/stops"
          className="text-2xl font-mono text-blue-400 hover:underline underline-offset-4"
        >
          ← Make a new report
        </a>
      </div>
    </div>
  );
}
