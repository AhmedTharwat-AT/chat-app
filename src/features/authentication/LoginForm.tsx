import { useState } from "react";
import { Link } from "react-router-dom";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { auth } from "../../services/firebase";
import { useQueryClient } from "@tanstack/react-query";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import SmallSpinner from "../../ui/SmallSpinner";
import useGoogleSignIn from "./hooks/useGoogleSignIn";
import GoogleButton from "./GoogleButton";

interface Data {
  email?: string;
  password?: string;
}

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate: googleSignIn, isPending } = useGoogleSignIn();

  const [signInWithEmailAndPassword, _, loading, error] =
    useSignInWithEmailAndPassword(auth);

  function onSubmit(data: Data | null) {
    if (!data?.email || !data?.password) return;
    signInWithEmailAndPassword(data.email, data.password).then(() => {
      queryClient.invalidateQueries({ queryKey: ["user"], exact: true });
    });
  }

  function handleShowPass(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault?.();
    setShowPassword((s) => !s);
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onKeyDown={(e) => {
          if (e.key == "Enter") handleSubmit(onSubmit)();
        }}
        className="w-full max-w-96 space-y-4 sm:w-2/3 "
      >
        {error?.message && (
          <p className="py-2 text-sm  text-red-600">
            incorrect email or password !
          </p>
        )}
        <div className="mt-8 flex w-full flex-col">
          <label htmlFor="email" className="mb-2 capitalize text-gray-800">
            email
          </label>
          <input
            {...register("email", {
              required: "This field is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Please provide valid email address",
              },
            })}
            id="email"
            className="rounded-md border border-gray-200 px-3 py-2 text-gray-800 focus:outline-none focus:ring focus:ring-[var(--color-main)]"
            placeholder="example@example.com"
          />
          {errors?.email && (
            <p className="py-2 text-xs capitalize text-red-600">
              {errors?.email?.message as string}
            </p>
          )}
        </div>

        <div className="flex w-full flex-col">
          <label htmlFor="password" className="mb-2 capitalize text-gray-800">
            password
          </label>
          <div className="relative">
            <input
              {...register("password", {
                required: "This field is required",
                maxLength: {
                  value: 14,
                  message: "max length is 14 chars !",
                },
                minLength: {
                  value: 5,
                  message: "min length is 5 chars !",
                },
              })}
              id="password"
              className="w-full rounded-md border border-gray-200 px-3 py-2 pr-12 text-gray-800 focus:outline-none focus:ring focus:ring-[var(--color-main)]"
              type={showPassword ? "text" : "password"}
              placeholder="******"
            />
            <button
              onClick={handleShowPass}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors?.password && (
            <p className="py-2 text-xs capitalize text-red-600">
              {errors?.password?.message as string}
            </p>
          )}
        </div>

        <div className="pt-4">
          <button
            disabled={loading}
            className="w-full rounded-md bg-[var(--color-main)] px-4 py-2 font-semibold capitalize text-white hover:bg-[var(--color-main-dark)]"
          >
            {loading ? <SmallSpinner color="text-white" /> : "log in"}
          </button>
        </div>

        <GoogleButton
          googleSignIn={googleSignIn}
          isPending={isPending}
          text="sign in with"
        />
      </form>
      <div className="mt-8  max-sm:text-sm">
        <h1 className="text-gray-600">
          Don't have an account ?
          <Link
            className="ml-1 text-green-700 underline hover:text-[var(--color-main)] sm:ml-2"
            to="/signup"
          >
            Register
          </Link>
        </h1>
      </div>
    </>
  );
}

export default LoginForm;
