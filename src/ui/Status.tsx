interface Props {
  status: string;
  className: string;
}

function Status({ status, className = "" }: Props) {
  return status == "online" ? (
    <h4 className={`${className} text-green-600`}> online</h4>
  ) : (
    <h4 className={`${className} text-red-600`}> offline</h4>
  );
}

export default Status;
