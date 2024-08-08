import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../services/firebase";
import { googleSignIn, signUp } from "../../services/firebaseApi";
import { useQueryClient } from "@tanstack/react-query";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import SmallSpinner from "../../ui/SmallSpinner";

export interface SignData {
  email?: string;
  username?: string;
  password?: string;
  confirm?: string;
}

function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignData>();

  const [createUserWithEmailAndPassword, _, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  async function onSubmit(data: SignData) {
    if (!data.email || !data.password || !data.username) return;
    await createUserWithEmailAndPassword(data.email, data.password);
    console.log("done 1");
    await signUp(data);
    console.log("done 2");
    queryClient.invalidateQueries({ queryKey: ["user"], exact: true });
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
        {error?.code == "auth/email-already-in-use" ? (
          <p className="py-2 text-sm  text-red-600">Email already in use</p>
        ) : (
          error?.message && (
            <p className="py-2 text-sm  text-red-600">Error signing up!</p>
          )
        )}
        <div className="mt-8 flex w-full flex-col">
          <label htmlFor="email" className="mb-2 capitalize text-gray-800">
            email
          </label>
          <input
            {...register("email", {
              required: "This field is required",
              maxLength: {
                value: 14,
                message: "max length is 14 chars !",
              },
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Please provide valid email address",
              },
            })}
            disabled={loading}
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
          <label htmlFor="username" className="mb-2 capitalize text-gray-800">
            username
          </label>

          <input
            {...register("username", {
              required: "This field is required",
              maxLength: {
                value: 14,
                message: "max length is 14 chars !",
              },
              minLength: {
                value: 3,
                message: "min length is 3 chars !",
              },
              pattern: {
                value: /^[A-Za-z0-9]+$/,
                message: "Enter chars or numbers only",
              },
            })}
            disabled={loading}
            id="username"
            className="w-full rounded-md border border-gray-200 px-3 py-2 pr-12 text-gray-800 focus:outline-none focus:ring focus:ring-[var(--color-main)]"
            placeholder="enter your name"
          />
          {errors?.username && (
            <p className="py-2 text-xs capitalize text-red-600">
              {errors?.username?.message as string}
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
              disabled={loading}
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

        <div className="flex w-full flex-col">
          <label htmlFor="confirm" className="mb-2 capitalize text-gray-800">
            Confirm password
          </label>
          <input
            {...register("confirm", {
              required: "This field is required",
              validate: (val, vals) =>
                val == vals.password || "Passwords dont match !",
            })}
            disabled={loading}
            id="confirm"
            className="w-full rounded-md border border-gray-200 px-3 py-2 pr-12 text-gray-800 focus:outline-none focus:ring focus:ring-[var(--color-main)]"
            placeholder="******"
          />

          {errors?.confirm && (
            <p className="py-2 text-xs capitalize text-red-600">
              {errors?.confirm?.message as string}
            </p>
          )}
        </div>

        <div>
          <button
            disabled={loading}
            className="mt-5 w-full rounded-md bg-[var(--color-main)] px-4 py-2 font-semibold capitalize text-white hover:bg-[var(--color-main-dark)]"
          >
            {loading ? <SmallSpinner color="text-white" /> : "register"}
          </button>
        </div>

        <div>
          <div className="relative mt-7 w-full">
            <h3 className="relative z-20 mx-auto w-fit bg-white px-2 text-sm capitalize text-gray-800">
              sign up using
            </h3>
            <span className="absolute top-1/2 z-10 h-[1px] w-full bg-gray-300"></span>
          </div>
          <div
            onClick={() => {
              googleSignIn();
            }}
            className="my-5 flex cursor-pointer items-center justify-center rounded-md bg-gray-100 px-4 py-2 text-2xl hover:bg-gray-200"
          >
            <FcGoogle />
          </div>
        </div>
      </form>
      <div className="mt-8  max-sm:text-sm">
        <h1 className="text-gray-600">
          Already have an account
          <Link
            className="ml-1 text-green-700 underline hover:text-[var(--color-main)] sm:ml-2"
            to="/login"
          >
            Login
          </Link>
        </h1>
      </div>
    </>
  );
}

export default SignupForm;
