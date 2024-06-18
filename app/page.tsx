import Pagination from "./Components/Pagination";
import NavBar from "./NavBar";

export default function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  return (
    <Pagination
      itemCount={30}
      pageSize={10}
      currentPage={parseInt(searchParams.page)}
    />
  );
}
