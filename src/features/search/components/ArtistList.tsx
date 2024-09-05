import { ArrowBigLeft, ArrowBigRight, Disc3 } from "lucide-react";
import { useSearchSelector } from "../store/slice/searchSelector";
import { ArtistData } from "../types";
import ArtistListItem from "./ArtistListItem";
import useElementObserver from "@/hooks/use-element-observer";
import { useEffect, useRef, useState } from "react";
import { setPage } from "../store/slice/searchSlice";
import { useAppDispatch } from "@/store/store";
import useIsDesktop from "@/hooks/use-is-desktop";

interface ArtistListProps {
  artists: ArtistData[] | undefined;
}

const SCROLL_AMOUNT = 400;

export default function ArtistList({ artists }: ArtistListProps) {
  const { page, selectedArtistId } = useSearchSelector();
  const divRef = useRef<HTMLDivElement>(null);
  const { isNearScreen } = useElementObserver(divRef);
  const dispatch = useAppDispatch();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();
  const [showLeftArrow, setShowLeftArrow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const scrollLeft = scrollContainerRef.current.scrollLeft;
        if (scrollLeft > 40) {
          setShowLeftArrow(true);
        }
        if (scrollLeft <= 40) {
          setShowLeftArrow(false);
        }
      }
    };

    const scrollContainer = scrollContainerRef.current;

    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
      return () => {
        scrollContainer.removeEventListener("scroll", handleScroll);
      };
    }
  }, []); // Empty dependency array to ensure this effect runs once on mount

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: SCROLL_AMOUNT, behavior: "smooth" });
    }
  };

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -SCROLL_AMOUNT, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (isNearScreen) {
      dispatch(setPage(page + 1));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNearScreen]);

  if (artists === undefined) {
    return <div>No artists to show</div>;
  }

  return (
    <div className="flex relative">
      {isDesktop && showLeftArrow && (
        <div
          onClick={handleScrollLeft}
          className="flex pr-3 justify-end cursor-pointer items-center absolute left-0 top-0 h-full z-10 bg-gradient text-cream"
        >
          <ArrowBigLeft size={30} fill="currentColor" />
        </div>
      )}
      <div
        ref={scrollContainerRef}
        className="flex gap-2 px-2 lg:py-4 overflow-x-auto items-center hide-scrollbar lg:snap-x [&>div]:snap-start "
      >
        {artists.map((artist) => (
          <ArtistListItem
            key={artist.id}
            artist={artist}
            isSelected={selectedArtistId === artist.id}
          />
        ))}
        <div ref={divRef} className="mx-4">
          <Disc3 size={30} className="animate-spin z-50 mb-4 lg:mr-8" />
        </div>
      </div>
      {isDesktop && (
        <div
          onClick={handleScrollRight}
          className="flex pl-3 justify-end cursor-pointer items-center absolute right-0 top-0 h-full z-10 bg-gradient text-cream"
        >
          <ArrowBigRight size={30} fill="currentColor" />
        </div>
      )}
    </div>
  );
}
