import { Alert } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function Error() {
  const error = useSelector((state) => state.errorState.error);
  return (
    <>
      {error?.body && (
        <div>
          {error.body.map((item) => (
            <Alert key={item} variant="danger">
              {item}
            </Alert>
          ))}
        </div>
      )}
      {error && typeof error === "string" && (
        <Alert variant="danger">{error}</Alert>
      )}
    </>
  );
}
