import { Typography } from "@/components/ui/typography";
import { useUserSelector } from "@/core/store/slice/userSelector";
import { CircleUserRound, LogOut, Trash2 } from "lucide-react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

export default function ProfilePage() {
  const { email } = useUserSelector();
  return (
    <div className="flex flex-col p-4 lg:flex-row-reverse lg:gap-8">
      <div className="flex gap-2 items-center flex-1 p-8 text-cream bg-white/20 rounded-md shadow-sm">
        <CircleUserRound size={60} strokeWidth={1} stroke="currentColor" />
        <Typography variant="h4">{email}</Typography>
      </div>
      <div className="mt-8 lg:mt-0 lg:w-60">
        <div>
          <StyledButton className=" bg-yellow-400 text-darkred">
            <Trash2 size={16} strokeWidth={2.5} />
            Delete Account
          </StyledButton>
        </div>
        <hr className="border-cream/20 m-4" />
        <div>
          <NavLink to="/logout">
            <StyledButton className="bg-darkred text-cream">
              <LogOut size={16} strokeWidth={2.5} />
              Logout
            </StyledButton>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

const StyledButton = styled.button.attrs({
  className:
    "w-full flex gap-2 items-center px-4 py-3 flex justify-center rounded-sm text-sm font-semibold hover:opacity-90 duration-200 trasition-colors",
})``;
