import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="my-10 sm:my-16 text-3xl sm:text-6xl lg:text-7xl font-extrabold text-center text-white">
        The only URL Shortener <br /> you&rsquo;ll ever need!👇
      </h2>
      <form className="sm:h-14 flex flex-col sm:flex-row w-full md:w-2/4 gap-2">
        <Input
          type={"url"}
          placeholder="Enter your loooooong URL"
          className={"h-full flex-1 p-4"}
        />
        <Button
          className={"h-full"}
          size={"lg"}
          variant={"destructive"}
          type="submit"
        >
          Shorten!
        </Button>
      </form>
      <img src="/banner.jpeg" alt="Banner" className="w-full md:px-11 my-11" />
    </div>
  );
};

export default LandingPage;
