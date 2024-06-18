import Pagination from "./Components/Pagination";
import NavBar from "./NavBar";

export default function Home() {
  return <Pagination itemCount={30} pageSize={10} currentPage={2} />;
}
