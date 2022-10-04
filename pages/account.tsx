import Head from "next/head"
import { NextPageWithLayout } from "./_app"
import Link from "next/link"
import { ReactElement } from "react"
import StyferLogo from "../components/StyferLogo"
import AppLayout from "../components/Layout"

const Account: NextPageWithLayout = () => {
  return (
    <div className="sm:container min-h-[calc(100vh-3rem)] mx-auto">
      <Head>
        <title>Styfer | Account</title>
        <meta
          name="description"
          content="Login or Sign up to Styfer"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col justify-center gap-8 w-full h-[calc(100vh-6.5rem)] px-4 pt-12 pb-12">
        <div className="text-center">
          <StyferLogo />
          <h1 className="text-4xl font-bold leading-none">
            STY
            <span className="text-primary">FER</span>
          </h1>
          <h2 className="text-xs leading-none font-light tracking-[0.2em]">
            by braincore
          </h2>
        </div>

        <div className="mx-auto flex flex-col md:flex-row gap-2 justify-center">
          <Link href="/login">
            <a
              className="w-64 btn btn-lg btn-primary rounded-full btn-outline"
            >
              Login
            </a>
          </Link>
          <Link href="/signup">
            <a
              className="w-64 btn btn-lg btn-primary rounded-full"
            >
              Sign Up
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}

Account.getLayout = (page: ReactElement) => {
  return (
    <AppLayout>
      {page}
    </AppLayout>
  )
}

export default Account
