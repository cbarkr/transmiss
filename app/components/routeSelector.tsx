import { useEffect } from "react";

interface IRouteSelectorProps {
  interactive: boolean;
  routes: string;
  handler: (newRouteID: string) => void;
  curr: string;
}

export function RouteSelector({
  interactive,
  routes,
  handler,
  curr,
}: IRouteSelectorProps) {
  const routesArr = routes.split(",");

  useEffect(() => {
    if (interactive) {
      handler(routesArr[0]); // Select first route by default
    }
  }, []);

  return (
    <>
      {interactive && (
        <div className="flex flex-row items-center gap-2 w-fit">
          ↳
          {routesArr.map((route: string, idx: number) => (
            <>
              <button
                key={route}
                type="button"
                onClick={() => handler(route)}
                className={`text-lg font-bold font-mono px-2 ${
                  curr && curr === route ? "bg-white text-black" : "text-white"
                }`}
              >
                {route ? route : "N/A"}
              </button>
              {idx !== routesArr.length - 1 && (
                <div key={`${route}-slash`}>/</div>
              )}
            </>
          ))}
        </div>
      )}
      {!interactive && (
        <div className="flex flex-row items-center">
          {routesArr.map((route: string, idx: number) => (
            <>
              <div key={route} className="text-lg font-bold font-mono px-2">
                {route ? route : "N/A"}
              </div>
              {idx !== routesArr.length - 1 && (
                <div key={`${route}-slash`}>/</div>
              )}
            </>
          ))}
        </div>
      )}
    </>
  );
}
