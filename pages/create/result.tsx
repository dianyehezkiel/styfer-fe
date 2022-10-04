import axios from 'axios'
import Image from 'next/image'
import React from 'react'
import fileDownload from 'js-file-download'
import {
  ArrowDownTrayIcon,
  ShareIcon,
} from '@heroicons/react/24/solid'
import { NextPageWithLayout } from '../_app'
import { GetServerSideProps } from 'next'
import AppLayout from '../../components/Layout'
import { setPage, useStateValue } from '../../lib/state'

interface ResultProps {
  resultImgUrl: string;
}

export const getServerSideProps: GetServerSideProps<ResultProps> = async (
  context,
) => {
  const resultQuery = context.query.img
  let resultImgUrl: string
  if (resultQuery !== undefined && resultQuery.length !== 0) {
    resultImgUrl = typeof resultQuery === 'string'
      ? `https://storage.googleapis.com/styfer/results/${resultQuery}`
      : `https://storage.googleapis.com/styfer/results/${resultQuery[0]}`
  } else {
    resultImgUrl = '/fallback_image.jpg'
  }

  return {
    props: {
      resultImgUrl,
    },
  }
}

const Result: NextPageWithLayout<ResultProps> = ({ resultImgUrl }) => {
  const [, dispatch] = useStateValue()
  React.useEffect(() => {
    dispatch(setPage('create'))
  }, [dispatch])

  const handleDownload: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    let filename = resultImgUrl.split('/').pop()
    if (!filename) {
      filename = 'Stylized image result'
    }
    console.log(filename)
    downloadImage(resultImgUrl, filename)
  }

  const downloadImage = async (url: string, filename: string) => {
    try {
      const response = await axios.get(url)
      fileDownload(response.data, filename)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="relative sm:container min-h-[calc(100vh-3rem)] mx-auto pb-16">
      <div className="flex flex-col gap-4 p-4 pt-2">
        <div className="divider font-medium mb-2">Result</div>
        <div className="w-full xs:w-80 sm:w-1/2 p-1 mx-auto sm:mx-0 bg-base-200 rounded-lg shadow-md">
          <div className="relative w-full aspect-square rounded overflow-hidden">
            <Image
              src={resultImgUrl}
              alt="Stylized image result"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
        <div className="grid grid-cols-5 sm:grid-cols-2 gap-2">
          <button
            onClick={handleDownload}
            className="btn btn-block bg-sky-500 hover:bg-sky-600 h-auto aspect-square"
          >
            {/* twitter logo */}
            <svg
              className="w-6 h-6 fill-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
            </svg>
            <span className="hidden sm:inline-flex">Download</span>
          </button>
          <button
            onClick={handleDownload}
            className="btn btn-block bg-blue-800 hover:bg-blue-900 h-auto aspect-square"
          >
            {/* facebook logo */}
            <svg
              className="w-6 h-6 fill-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
            </svg>
            <span className="hidden sm:inline-flex">Copy URL</span>
          </button>
          <button
            onClick={handleDownload}
            className="btn btn-block bg-pink-600 hover:bg-pink-700 h-auto aspect-square"
          >
            {/* instagram logo */}
            <svg
              className="w-7 h-7 fill-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
            </svg>
            <span className="hidden sm:inline-flex">Share</span>
          </button>
          <button
            onClick={handleDownload}
            className="btn btn-block bg-gray-100 hover:bg-gray-200 h-auto aspect-square"
          >
            <ShareIcon className="w-6 h-6 fill-black stroke-black" />
          </button>
          <button
            onClick={handleDownload}
            className="btn btn-block h-auto bg-zinc-800 hover:bg-zinc-900 aspect-square"
          >
            <ArrowDownTrayIcon className="w-6 h-6 fill-white stroke-white" />
          </button>
        </div>
        <form className="flex flex-col gap-2">
          <div className="form-control">
            <label className="label hidden">
              <span className="label-text">Description</span>
            </label>
            <textarea
              className="textarea textarea-bordered w-full h-32 resize-none"
              placeholder="description"
              defaultValue="#styfer #create_with_styfer"
            />
          </div>
          <button
            type="submit"
            className="btn btn-lg w-32 btn-primary self-end"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  )
}

Result.getLayout = (page: React.ReactElement) => {
  return <AppLayout>{page}</AppLayout>
}

export default Result
