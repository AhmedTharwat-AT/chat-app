interface Props {
  status: string;
  className: string;
}

function StatusDot({ status, className = "" }: Props) {
  return status == "online" ? (
    <span className={`${className} absolute bottom-0 right-0 text-green-600`}>
      {" "}
      🟢
    </span>
  ) : (
    <span
      className={`${className} absolute bottom-0 right-0 rounded-full border-2 border-white text-red-600`}
    >
      {" "}
      🔴
    </span>
  );
}

export default StatusDot;
