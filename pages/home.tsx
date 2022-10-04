import Head from 'next/head'
import Image from 'next/image'
import React, { ReactElement } from 'react'
import AppLayout from '../components/Layout'
import LikeButton from '../components/LikeButton'
import { data } from '../data'
import { setPage, useStateValue } from '../lib/state'
import { NextPageWithLayout } from './_app'

const Home: NextPageWithLayout = () => {
  const [, dispatch] = useStateValue()
  React.useEffect(() => {
    dispatch(setPage('home'))
  }, [dispatch])

  return (
    <div className="sm:container min-h-[calc(100vh-3rem)] mx-auto pb-16">
      <Head>
        <title>Styfer | Gallery</title>
        <meta name="description" content="Best images created with Styfer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col gap-4 p-4">
        {data.map((pic) => (
          <div
            key={pic._id}
            className="relative flex flex-col w-full xs:w-80 sm:w-1/2 p-1 mx-auto sm:mx-0 bg-base-200 rounded-lg shadow-md"
          >
            <div className="relative w-full aspect-square text-base rounded overflow-hidden">
              <Image
                objectFit="cover"
                src={pic.image_url}
                alt={pic.title}
                layout="fill"
              />
            </div>
            <div className="flex flex-row gap-2 my-2 items-start justify-between">
              <div className="flex-grow">
                <p className="text-sm font-medium">{pic.artist}</p>
                <p className="text-sm font-light">{pic.title}</p>
                <p className="text-xs text-base-content/50">{pic.created_at}</p>
              </div>
              <div className="flex-grow-0">
                <LikeButton liked={false} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

Home.getLayout = (page: ReactElement) => {
  return <AppLayout>{page}</AppLayout>
}

export default Home
