export default function About() {
  return (
    <div>
      <div className="flex flex-col items-center my-12">
        <div className="flex flex-col px-2 max-w-screen-sm">
          <div className="mt-4">
            <p className="font-bold text-2xl lg:text-4xl text-center">Why</p>
            <p className="text-lg text-center max-w-screen-sm">
              How many times have you been passed by a full bus when you&apos;re
              already running late? How about stuck waiting in the rain or snow
              Have you ever been stuck waiting for a bus in the rain alongside a
              growing crowd? Transit can be a bit hectic sometimes.
            </p>
          </div>
          <div className="mt-4">
            <p className="font-bold text-2xl lg:text-4xl text-center">What</p>
            <p className="text-lg text-center max-w-screen-sm">
              Transmiss is a web application for reporting transit
              &quot;misses&quot;. Maybe it&apos;s a crowded stop or perhaps a
              bus that passes by you because it&apos;s full.
            </p>
          </div>
          <div className="mt-4">
            <p className="font-bold text-2xl lg:text-4xl text-center">How</p>
            <p className="text-lg text-center max-w-screen-sm">
              We use real-time data from Translink to get stop, route, and bus
              information.
            </p>
          </div>
          <div className="mt-4">
            <p className="font-bold text-2xl lg:text-4xl text-center">Where</p>
            <p className="text-lg text-center max-w-screen-sm">
              Transmiss is only available in the Metro Vancouver.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
