function MembersSkeleton() {
  return Array(5)
    .fill(0)
    .map((_, i) => (
      <div
        key={i}
        className=" mb-2 h-8 animate-pulse items-center rounded-md bg-gray-300 px-2 py-1"
      ></div>
    ));
}

export default MembersSkeleton;
