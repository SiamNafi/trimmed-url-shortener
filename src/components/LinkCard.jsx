import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Copy, Delete, Download, Trash } from "lucide-react";
import useFetch from "@/hooks/useFetch";
import { deleteUrl } from "@/db/apiUrls";
import { BeatLoader } from "react-spinners";

const LinkCard = ({ url, fetchUrls }) => {
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
  // delete url
  const { loading: loadingDelete, fn: fnDeleteUrl } = useFetch(
    deleteUrl,
    url?.id
  );
  return (
    <div className="flex flex-col gap-5 rounded-lg border p-4 bg-gray-900 md:flex-row">
      <img
        src={url?.qr}
        className="h-33 object-contain ring ring-blue-500 self-start"
      />
      <Link to={`/link/${url?.id}`} className="flex flex-col flex-1">
        <span className="text-3xl font-extrabold hover:underline cursor-pointer">
          {url?.title}
        </span>
        <span className="text-2xl font-bold text-blue-500 hover:underline cursor-pointer">
          https://trimmr.in/{url?.custom_url ? url?.custom_url : url.short_url}
        </span>
        <span className="flex items-center gap-1 hover:underline cursor-pointer">
          {url?.original_url}
        </span>
        <span className="flex items-end text-sm font-extralight flex-1">
          {new Date(url?.created_at).toLocaleDateString()}
        </span>
      </Link>
      <div className="flex gap-2">
        <Button
          variant={"ghost"}
          onClick={() =>
            navigator.clipboard.writeText(`https://trimmr.in/${url?.short_url}`)
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
            fnDeleteUrl().then(() => fetchUrls());
          }}
        >
          {loadingDelete ? <BeatLoader size={5} color="white" /> : <Trash />}
        </Button>
      </div>
    </div>
  );
};

export default LinkCard;
