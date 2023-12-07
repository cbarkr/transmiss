export default function Privacy() {
  return (
    <div>
      <div className="flex flex-col items-center my-12">
        <div className="flex flex-col px-2 max-w-screen-sm">
          <h1 className="font-bold text-2xl lg:text-4xl text-center">
            Privacy
          </h1>
          <div className="mt-4">
            <p className="font-bold text-xl">1. Objective</p>
            <p className="text-lg">
              By using Transmiss, you accept the terms and conditions described
              here.
            </p>
          </div>
          <div className="mt-4">
            <p className="font-bold text-xl">2. What information we collect</p>
            <p className="text-lg">
              We collect information provided by you, including:
            </p>
            <ul className="list-disc list-inside">
              <li>Your current location, given your consent</li>
              <li>Stop, bus, and route numbers</li>
            </ul>
          </div>
          <div className="mt-4">
            <p className="font-bold text-xl">3. What information we store</p>
            <p className="text-lg">
              We store some of the information provided by you, including:
            </p>
            <ul className="list-disc list-inside">
              <li>Stop, bus, and route numbers</li>
            </ul>
            <p className="text-lg italic">
              Note: Your location data is collected only at the time of request
              and is never stored
            </p>
          </div>
          <div className="mt-4">
            <p className="font-bold text-xl">
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
    </div>
  );
}
