import { House, Search, Disc3, CircleUserRound, AudioLines, LucideLogOut } from "lucide-react";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import { Typography } from "../ui/typography";
import SearchBar from "@/features/search/components/SearchBar";
import Dropdown from "./Dropdown";
import { useUserSelector } from "@/core/store/slice/userSelector";
import useIsDesktop from "@/hooks/use-is-desktop";

export default function Header() {
  const { email } = useUserSelector();
  const firstEmailChar = email ? email[0].toUpperCase() : "";
  const isDesktop = useIsDesktop();

  const items = [
    { name: "Home", path: "/", icon: <House /> },
    { name: "Search", path: "/search", icon: <Search /> },
    { name: "Collection", path: "/collection", icon: <Disc3 /> },
    { name: "Create Playlist", path: "/create-playlist", icon: <AudioLines /> },
    { name: "Profile", path: "/profile", icon: <CircleUserRound /> },
  ];

  return isDesktop ? (
    <nav className="top-0 left-0 w-full py-4 px-8 bg-darkred z-50 sticky flex items-center h-[70px] mb-4">
      {/* Logo */}
      <NavLink to="/">
        <div className="w-36 mr-2">
          <Logo />
        </div>
      </NavLink>
      {/* Navigation Elements */}
      <ul className="flex gap-6 pl-16 flex-1">
        {items.map((item, idx) => {
          if (idx === 4 || idx === 1) return;
          return (
            <li
              key={item.name}
              className="flex items-center h-full text-cream  transition-all duration-200"
            >
              <NavLink to={item.path}>
                {({ isActive }) => (
                  <Typography
                    variant="p"
                    className={`whitespace-nowrap transition-all duration-200 font-semibold hover:opacity-85 ${
                      isActive
                        ? "text-cream opacity-100 underline decoration-2 underline-offset-[3px]"
                        : "opacity-70"
                    }`}
                  >
                    {item.name}
                  </Typography>
                )}
              </NavLink>
            </li>
          );
        })}
      </ul>
      <div className="flex  items-center gap-8">
        {/* SearchBar */}
        <SearchBar />
        <div className="h-6 border border-cream/60"></div>
        {/* Profile */}
        <Dropdown>
          <Dropdown.Toggle>
            <div className="text-cream opacity-80 hover:opacity-100 duration-200">
              {/* <FaUserCircle className="text-4xl" /> */}
              <div className="h-9 w-9 flex items-center justify-center bg-gradient rounded-full ">
                <Typography variant="h4" className="text-center">
                  {firstEmailChar}
                </Typography>
              </div>
            </div>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="/profile" icon={<CircleUserRound size={16} />}>
              Profilo
            </Dropdown.Item>
            <Dropdown.Separator />
            <Dropdown.Item
              href="/logout"
              icon={<LucideLogOut size={16} />}
              variant="!text-custom-yellow2"
            >
              Esci
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </nav>
  ) : (
    <nav className="fixed bottom-0 right-0 py-1 w-full h-fit bg-darkred z-50 flex justify-center border-t border-cream/20">
      <ul className="flex justify-center h-fit w-full max-w-[400px] mx-8 py-1">
        {items.map((item) => (
          <li
            key={item.name}
            className="flex flex-col  items-center justify-center h-full flex-1 text-cream/70  rounded-[20px] transition-all duration-200"
          >
            <NavLink to={item.path} className="px-2 py-1 transition-all duration-200">
              {({ isActive }) => (
                <div className={`${isActive ? "text-cream/100" : ""}`}>
                  <div
                    className={`flex items-center justify-center  ${
                      isActive ? "[&>svg]:stroke-[2.25px]" : "[&>svg]:stroke-[1.5px]"
                    }`}
                  >
                    {item.icon}
                  </div>
                </div>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
