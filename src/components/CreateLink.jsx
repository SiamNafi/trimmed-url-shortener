/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { UrlState } from "@/context/context";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Error from "./Error";
import { Card } from "./ui/card";
import * as yup from "yup";
import { QRCode } from "react-qrcode-logo";
import useFetch from "@/hooks/useFetch";
import { createUrl } from "@/db/apiUrls";
import { BeatLoader } from "react-spinners";

const CreateLink = () => {
  const { user } = UrlState();
  const navigate = useNavigate();
  const ref = useRef();
  const [searchParams, setSearchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");
  const [error, setError] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    longUrl: longLink ? longLink : "",
    customUrl: "",
  });
  const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    longUrl: yup
      .string()
      .url("Mus be a valid URL")
      .required("Long URL is requried"),
    customUrl: yup.string(),
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const {
    loading,
    error: errorUrl,
    data,
    fn: fnCreateUrl,
  } = useFetch(createUrl, { ...formData, user_id: user?.id });
  useEffect(() => {
    if (errorUrl === null && data) {
      navigate(`/link/${data[0].id}`);
    }
  }, [errorUrl, data]);
  const createNewUrl = async () => {
    setError([]);
    try {
      await schema.validate(formData, { abortEarly: true });
      const canvas = ref.current.canvasRef.current;
      const blob = await new Promise((resolve) => canvas.toBlob(resolve));
      await fnCreateUrl(blob);
    } catch (e) {
      const newError = {};
      e?.inner?.forEach((err) => {
        newError[err.path] = err.message;
      });
      setError(newError);
    }
  };
  return (
    <div>
      <Dialog
        defaultOpen={longLink}
        onOpenChange={(res) => {
          if (!res) setSearchParams({});
        }}
      >
        <DialogTrigger>
          <Button variant={"destructive"}>Create New Link</Button>
        </DialogTrigger>
        <DialogContent className={"sm:max-w-md"}>
          <DialogHeader>
            <DialogTitle className={"font-bold text-2xl"}>
              Create New
            </DialogTitle>
          </DialogHeader>
          {/* render qr code */}
          {formData?.longUrl && (
            <QRCode value={formData?.longUrl} size={250} ref={ref} />
          )}
          <Input
            id="title"
            placeholder="Short Link's Title"
            value={formData.title}
            onChange={handleChange}
          />
          <Input
            id="longUrl"
            placeholder="Enter your looooong URL"
            value={formData.longUrl}
            onChange={handleChange}
          />
          {error && <Error message={error.longUrl} />}
          <div className="flex items-center gap-2">
            <Card className={"p-1.5 rounded-lg bg-transparent"}>trimmr.in</Card>{" "}
            /
            <Input
              id="customUrl"
              placeholder="Custom Link (optional)"
              value={formData.customUrl}
              onChange={handleChange}
            />
          </div>
          {errorUrl && <Error message={errorUrl?.message} />}
          <DialogFooter className={"sm:justify-start"}>
            <Button
              onClick={createNewUrl}
              variant={"destructive"}
              disabled={loading}
            >
              {loading ? <BeatLoader size={10} color="white" /> : "Create"}{" "}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateLink;
