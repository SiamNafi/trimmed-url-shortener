/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BeatLoader } from "react-spinners";
import * as Yup from "yup";
import Error from "./Error";
import useFetch from "@/hooks/useFetch";
import { login } from "@/db/apiAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UrlState } from "@/context/context";

const Login = () => {
  const { fetchUser } = UrlState();
  const [error, seterror] = useState([]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const {
    data,
    error: loginError,
    loading,
    fn: fnLogin,
  } = useFetch(login, formData);
  useEffect(() => {
    if (loginError === null && data) {
      fetchUser();
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
    }
  }, [data, loginError]);
  const handleLogin = async () => {
    seterror([]);
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email("Invalid Email")
          .required("Email is Required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is Required"),
      });
      await schema.validate(formData, { abortEarly: false });
      //   api call
      await fnLogin();
    } catch (error) {
      const newError = {};
      error?.inner?.forEach((err) => {
        newError[err.path] = err.message;
      });
      seterror(newError);
    }
  };
  return (
    <div>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className={"text-3xl"}>Login </CardTitle>
          <CardDescription>
            to your account if you already have one
          </CardDescription>
          {loginError && <Error message={loginError.message} />}
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  onChange={handleInputChange}
                  required
                />
                {error.email && <Error message={error.email} />}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  name="password"
                  type="password"
                  required
                  placeholder="********"
                  onChange={handleInputChange}
                />
                {error.password && <Error message={error.password} />}
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button onClick={handleLogin} type="submit" className="w-full">
            {loading ? <BeatLoader size={10} color="#36d7b7" /> : "Login"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
