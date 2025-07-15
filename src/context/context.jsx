import { getUser } from "@/db/apiAuth";
import useFetch from "@/hooks/useFetch";
import { createContext, useContext, useEffect } from "react";
const UrlContext = createContext();

const UrlProvider = ({ children }) => {
  const { data: user, loading, fn: fetchUser } = useFetch(getUser);
  const isAthenticated = user?.role === "authenticated";

  //   fetching the user
  useEffect(() => {
    fetchUser();
  }, []);
  console.log(user);
  // provide here
  const data = {
    user,
    fetchUser,
    loading,
    isAthenticated,
  };
  return <UrlContext.Provider value={data}>{children}</UrlContext.Provider>;
};

export const UrlState = () => {
  return useContext(UrlContext) || {};
};

export default UrlProvider;
