/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter } from "lucide-react";
import Error from "@/components/Error";
import { UrlState } from "@/context/context";
import useFetch from "@/hooks/useFetch";
import { getUrls } from "@/db/apiUrls";
import { getClicks } from "@/db/apiClicks";
import LinkCard from "@/components/LinkCard";
import CreateLink from "@/components/CreateLink";

const DashBoard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = UrlState();
  const {
    data: urls,
    error,
    loading,
    fn: fnUrls,
  } = useFetch(getUrls, user?.id);
  const {
    loading: loadingClicks,
    data: clicks,
    error: errorClicks,
    fn: fnClicks,
  } = useFetch(
    getClicks,
    urls?.map((url) => url.id)
  );
  // fetch urls

  useEffect(() => {
    fnUrls();
  }, []);

  useEffect(() => {
    if (urls?.length) fnClicks(); //fetch clicks only when the urls are loaded
  }, [urls?.length]);
  // filter url by title
  const filtredUrls = urls?.filter((url) =>
    url.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8">
      {(loading || loadingClicks) && (
        <BarLoader width={"100%"} color="#36d7b7" />
      )}
      <div className="grid grid-cols-2 gap-4">
        {/*total links card */}
        <Card>
          <CardHeader>
            <CardTitle>Links Created</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{urls?.length}</p>
          </CardContent>
        </Card>
        {/* total click card */}
        <Card>
          <CardHeader>
            <CardTitle>Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{clicks?.length}</p>
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-between">
        <h1 className="text-4xl font-extrabold">My Links</h1>
        <CreateLink />
      </div>
      <div className="relative">
        <Input
          type={"text"}
          placeholder="Filter Links"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Filter className="absolute top-2 right-2 p-1" />
      </div>
      {error && <Error message={error?.message} />}
      {/* render filtered urls */}
      {(filtredUrls || []).map((url, i) => {
        return <LinkCard url={url} fetchUrls={fnUrls} key={i} />;
      })}
    </div>
  );
};

export default DashBoard;
