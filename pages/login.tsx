import { LockClosedIcon, UserIcon } from '@heroicons/react/24/solid'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import StyferLogo from '../components/StyferLogo'
import { setPage, useStateValue } from '../lib/state'

const Login: NextPage = () => {
  const [, dispatch] = useStateValue()
  React.useEffect(() => {
    dispatch(setPage('account'))
  }, [dispatch])

  return (
    <div className="sm:container min-h-screen mx-auto flex flex-col gap-16 items-center py-12 px-4">
      <Head>
        <title>Styfer | Login</title>
        <meta name="description" content="Login to Styfer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <Link href={'/'}>
          <a className="flex gap-2">
            <StyferLogo />
            <div className="text-center">
              <h1 className="text-5xl font-bold leading-none tracking-widest">
                STY
                <span className="text-primary">FER</span>
              </h1>
              <h2 className="text-xs leading-none font-light tracking-[0.2em]">
                transfer your style
              </h2>
            </div>
          </a>
        </Link>
      </div>

      <div className="flex flex-col gap-4 w-full px-4">
        <p className="font-bold text-center mb-2">Login to your account</p>
        <form className="form-control flex flex-col gap-4">
          <label className="relative label p-0">
            <span className="label-text hidden">Username or Email</span>
            <input
              name="username"
              type="text"
              placeholder="username or email"
              className="input input-lg input-bordered w-full rounded-full pl-12"
            />
            <UserIcon className="absolute left-4 top-5 w-6 h-6 fill-neutral/60" />
          </label>
          <label className="relative label p-0">
            <span className="label-text hidden">Password</span>
            <input
              name="password"
              type="password"
              placeholder="password"
              className="input input-lg input-bordered w-full rounded-full pl-12"
            />
            <LockClosedIcon className="absolute left-4 top-5 w-6 h-6 fill-neutral/60" />
          </label>
          <Link href="/login">
            <a className="text-primary font-bold text-sm text-right">
              forgot password?
            </a>
          </Link>
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault()
            }}
            className="btn btn-primary btn-block btn-lg rounded-full normal-case"
          >
            Login to Account
          </button>
        </form>
        <div className="divider m-0">or</div>
        <button
          onClick={(e) => {
            e.preventDefault()
          }}
          className="btn btn-block btn-lg btn-outline shadow-[0_0_16px_-8px] shadow-base-content border-none rounded-full normal-case font-medium"
        >
          {/* Google Logo */}
          <svg
            className="w-6 h-6 mr-2"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
              <path
                fill="#4285F4"
                d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
              />
              <path
                fill="#34A853"
                d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
              />
              <path
                fill="#FBBC05"
                d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
              />
              <path
                fill="#EA4335"
                d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
              />
            </g>
          </svg>
          Login with Google
        </button>
      </div>

      <div className="font-bold">
        <p>
          {"Don't have an account? "}
          <Link href="/signup">
            <a className="text-primary">Sign up</a>
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
