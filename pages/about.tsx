export default function About() {
  return (
    <div>
      <div className="flex flex-col items-center my-12">
        <p className="font-bold text-2xl lg:text-4xl text-center mb-6">
          About Us
        </p>
        <p className="text-lg text-center max-w-screen-sm">
          How many times have you been passed by a full bus when you&apos;re already
          running kinda late? Have you ever been stuck waiting for a bus in the
          rain alongside a growing crowd? Transit can be a bit hectic sometimes.
          Transmiss is the result of a few too many of these experiences, and we
          want to do something about it.
        </p>
      </div>
      <div className="flex flex-col items-center my-12">
        <p className="font-bold text-2xl lg:text-4xl text-center mb-6">
          Region
        </p>
        <p className="text-lg text-center max-w-screen-sm">
          Transmiss is only available in the Metro Vancouver.
        </p>
      </div>
      <div className="flex flex-col items-center my-12">
        <p className="font-bold text-2xl lg:text-4xl text-center mb-6">
          Privacy
        </p>

        <div className="flex flex-col max-w-screen-sm">
          <p className="font-bold text-xl mt-6">1. Objective</p>
          <p className="text-lg">
            By using Transmiss, you accept the terms and conditions described
            here.
          </p>

          <p className="font-bold text-xl mt-6">
            2. What information we collect
          </p>
          <p className="text-lg">
            We collect information provided by you, including:
          </p>
          <ul className="list-disc list-inside">
            <li>Your current location, given your consent</li>
            <li>Stop, bus, and route numbers</li>
          </ul>

          <p className="font-bold text-xl mt-6">
            3. What information we store
          </p>
          <p className="text-lg italic">
            Your location data is collected only at the time of request and is
            never stored
          </p>
          <p className="text-lg">
            We store some of the information provided by you, including:
          </p>
          <ul className="list-disc list-inside">
            <li>Stop, bus, and route numbers</li>
          </ul>

          <p className="font-bold text-xl mt-6">
            4. How we use the information we collect
          </p>
          <p className="text-lg">
            We use the information provided by you to provide the following
            services:
          </p>
          <ul className="list-disc list-inside">
            <li>Locate nearby transit stops</li>
            <li>Research public transportation trends and usage</li>
            <li>Develop and improve Transmiss</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
