import React from "react";
import { useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Login from "@/components/Login";
import Signup from "@/components/Signup";

const AuthPage = () => {
  const [searchParams] = useSearchParams();
  return (
    <div className="mt-36 flex flex-col items-center gap-10">
      <h1 className="text-5xl font-extrabold">
        {searchParams.get("createNew")
          ? "Hold up! Let's Login First..."
          : "Login / Signup"}
      </h1>
      {/* tabs */}
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className={"grid w-full grid-cols-2"}>
          <TabsTrigger className={"cursor-pointer"} value="login">
            Login
          </TabsTrigger>
          <TabsTrigger className={"cursor-pointer"} value="signup">
            Signup
          </TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Login />
        </TabsContent>
        <TabsContent value="signup">
          <Signup />{" "}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthPage;
