interface IRouteSelectorProps {
  routes: string;
  handler: (newRouteID: string) => void;
  curr: string;
}

export function RouteSelector({ routes, handler, curr }: IRouteSelectorProps) {
  return (
    <div className="flex flex-row items-center">
      {routes.split(",").map((route: string) => (
        <button
          key={route}
          type="button"
          disabled={curr === route}
          onClick={() => handler(route)}
          className="rounded-full py-2 px-4 mx-1 text-sm font-bold text-primary-200 bg-primary-950 dark:text-primary-950 dark:bg-primary-200 transition-all hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-75 disabled:shadow-none"
        >
          {route ? route : "N/A"}
        </button>
      ))}
    </div>
  );
}
