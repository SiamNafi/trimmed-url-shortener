/* eslint-disable react-hooks/exhaustive-deps */
import DeviceStats from "@/components/DeviceStats";
import Location from "@/components/Location";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UrlState } from "@/context/context";
import { getClicksForUrl } from "@/db/apiClicks";
import { deleteUrl, getUrl } from "@/db/apiUrls";
import useFetch from "@/hooks/useFetch";
import { Copy, Download, LinkIcon, Trash } from "lucide-react";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BarLoader, BeatLoader } from "react-spinners";

const LinkPage = () => {
  const downloadImage = () => {
    const imageUrl = url?.qr;
    const fileName = url?.title;
    const anchor = document.createElement("a");
    anchor.href = imageUrl;
    anchor.download = fileName;

    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };
  const { id } = useParams();
  const { user } = UrlState();
  const navigate = useNavigate();
  const {
    loading,
    data: url,
    fn,
    error,
  } = useFetch(getUrl, { id, user_id: user?.id });
  const {
    loading: loadingStats,
    data: stats,
    fn: fnStats,
  } = useFetch(getClicksForUrl, id);
  const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl, id);
  useEffect(() => {
    fn();
    fnStats();
  }, []);
  if (error) {
    navigate("/dashboard");
  }
  let link = "";
  link = url?.custom_url ? url?.custom_url : url?.short_url;
  console.log(stats);
  return (
    <>
      {(loading || loadingStats) && (
        <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
      )}
      {/* main div */}
      <div className="flex flex-col gap-8 sm:flex-row justify-between">
        {/* left side div */}
        <div className="flex flex-col items-start gap-8 rounded-lg sm:w-2/5">
          <span className="text-6xl font-extrabold hover:underline cursor-pointer">
            {url?.title}
          </span>
          <a
            href={`https://trimmed-url-shortener-cfov.vercel.app/${link}`}
            target="_blank"
            className="text-3xl sm:text-4xl text-blue-400 hover:underline cursor-pointer"
          >
            https://trimmed-url-shortener-cfov.vercel.app/{link}
          </a>
          <a
            href={`https://trimmed-url-shortener-cfov.vercel.app/${url?.original_url}`}
            target="_blank"
            className="flex items-center gap-1 hover:underline cursor-pointer"
          >
            <LinkIcon className="p-1" />
            {url?.original_url}
          </a>
          <span className="flex items-end font-extralight text-sm">
            {new Date(url?.created_at).toLocaleString()}
          </span>
          <div className="flex gap-2">
            <Button
              variant={"ghost"}
              onClick={() =>
                navigator.clipboard.writeText(
                  `https://trimmed-url-shortener-cfov.vercel.app/${url?.short_url}`
                )
              }
            >
              <Copy />
            </Button>
            <Button variant={"ghost"} onClick={downloadImage}>
              <Download />
            </Button>
            <Button
              variant={"ghost"}
              onClick={() => {
                fnDelete();
              }}
            >
              {loadingDelete ? (
                <BeatLoader size={5} color="white" />
              ) : (
                <Trash />
              )}
            </Button>
          </div>
          <img
            src={url?.qr}
            className="w-full self-center sm:self-start ring ring-blue-500 p-1 object-contain"
            alt="qr code"
          />
        </div>
        {/* right side div */}
        <Card className="sm:w-3/5">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
          </CardHeader>
          {stats && stats?.length ? (
            <CardContent className={"flex flex-col gap-6"}>
              <Card>
                <CardHeader>
                  <CardTitle>Total Clicks</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{stats?.length}</p>
                </CardContent>
              </Card>

              <CardTitle>Location Data</CardTitle>
              <Location stats={stats} />
              <CardTitle>Device Info</CardTitle>
              <DeviceStats stats={stats} />
            </CardContent>
          ) : (
            <CardContent>
              {loadingStats === false ? "No Stats Yet" : "Loading statics."}
            </CardContent>
          )}
        </Card>
      </div>
    </>
  );
};

export default LinkPage;
