import { useLocation, useSearchParams } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";
import { useAppDispatch } from "@/store/store";
import { setSearch } from "../store/slice/searchSlice";
import { useEffect } from "react";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { state } = useLocation();

  // every time i land on /search, i want to set the search state to the query in the url
  useEffect(() => {
    const query = searchParams.get("q") || "";
    dispatch(setSearch({ query, page: 1, selectedArtistId: null }));
    return () => {
      dispatch(setSearch({ query: "", page: 1, selectedArtistId: null }));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <div>
      <SearchBar className="p-4 sticky top-0 z-20 bg-gradient lg:hidden" />
      <SearchResults />
    </div>
  );
}
