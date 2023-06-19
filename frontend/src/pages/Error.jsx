import { useRouteError } from "react-router-dom";

function Error() {
  const error = useRouteError();

  return (
    <div className="bg-gray-100">
      <div className="flex justify-center items-center h-screen">
        <div>
          <h1 className="font-bold text-4xl">اوپس! خطای {error.status || error.message}</h1>
        </div>
      </div>
    </div>
  );
}

export default Error;
