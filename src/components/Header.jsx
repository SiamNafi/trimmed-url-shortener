import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LinkIcon, LogOut } from "lucide-react";
import { UrlState } from "@/context/context";

const Header = () => {
  const navigate = useNavigate();
  // const { user, loading } = UrlState();
  const user = false;
  return (
    <nav className="flex items-center justify-between py-4">
      <Link to={"/"}>
        <img src="/logo.png" alt="" className="h-16" />
      </Link>
      <div>
        {!user ? (
          <Button onClick={() => navigate("/auth")} size={"lg"}>
            Login
          </Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger className="w-10 rounded-full overflow-hidden outline-none">
              <Avatar>
                <AvatarImage
                  className={"cursor-pointer"}
                  src={user?.user_metadata?.profile_pic}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Nafiul Siam</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className={"cursor-pointer"}>
                <LinkIcon className="mr-2 h-4 w-4" />
                <span>My Links</span>
              </DropdownMenuItem>
              <DropdownMenuItem className={"cursor-pointer text-red-500"}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </nav>
  );
};

export default Header;
