import { ArrowUpTrayIcon, PencilIcon } from '@heroicons/react/24/solid'
import axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, {
  ChangeEventHandler,
  MouseEventHandler,
  ReactElement,
} from 'react'
import AppLayout from '../components/Layout'
import LoadingLayer from '../components/LoadingLayer'
import UploadImage from '../components/UploadImage'
import { ML_BASE_URL, styles } from '../lib/constants'
import { setPage, useStateValue } from '../lib/state'
import { TransferResponse } from '../lib/types'
import { NextPageWithLayout } from './_app'

const Create: NextPageWithLayout = () => {
  const [selectedTargetImage, setSelectedTargetImage] = React.useState<Blob>()
  const [selectedStyle, setSelectedStyle] = React.useState<number>()
  const [selectedCustomStyle, setSelectedCustomStyle] = React.useState<Blob>()
  const [stylePreview, setStylePreview] = React.useState<string>()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const router = useRouter()

  const [, dispatch] = useStateValue()
  React.useEffect(() => {
    dispatch(setPage('create'))
  }, [dispatch])

  React.useEffect(() => {
    if (!selectedCustomStyle) {
      setStylePreview(undefined)
      return
    }

    const objectUrl = URL.createObjectURL(selectedCustomStyle)
    setStylePreview(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedCustomStyle])

  const handleTargetImageChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedTargetImage(e.target.files[0])
    } else {
      setSelectedTargetImage(undefined)
    }
  }

  const handleStyleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSelectedStyle(Number(e.target.value))
  }

  const handleCustomStyleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedCustomStyle(e.target.files[0])
    } else {
      setSelectedCustomStyle(undefined)
    }
  }

  const uploadCustomStyleButton = () => {
    return !stylePreview ? (
      <div className="w-full h-full overflow-hidden">
        <label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleCustomStyleChange}
            hidden
          />
          <div
            onClick={() => {
              setSelectedStyle(0)
            }}
            className="btn btn-neutral btn-outline w-full h-full font-normal text-lg normal-case"
          >
            <ArrowUpTrayIcon className="hidden 2xs:block w-5 h-5 mr-2" />
            Upload
          </div>
        </label>
      </div>
    ) : (
      <div className="relative grid grid-cols-2 w-full gap-2 xs:gap-4 peer-checked:outline outline-secondary overflow-hidden bg-neutral rounded-lg">
        <img
          className="object-cover aspect-square rounded-lg"
          src={stylePreview}
          alt="Custom style"
        />
        <label className="w-full h-full">
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleCustomStyleChange}
            hidden
          />
          <div
            onClick={() => {
              setSelectedStyle(0)
            }}
            className="btn btn-square w-full h-full rounded-none rounded-l-lg"
          >
            <PencilIcon className="block w-5 h-5" />
          </div>
        </label>
      </div>
    )
  }

  const handleTransferButton: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    if (selectedTargetImage === undefined || selectedStyle === undefined) {
      return
    }
    const formData = new FormData()
    formData.append('input_image', selectedTargetImage)
    formData.append('style_number', selectedStyle.toString())

    transferStyle(formData)
  }

  const transferStyle = async (formData: FormData) => {
    try {
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }
      setIsLoading(true)
      const response = await axios.post<TransferResponse>(
        `${ML_BASE_URL}/transfer`,
        formData,
        config,
      )
      console.log(response)
      const resultUrl = response.data.stylized_image.split('/').pop()
      const url = `/create/result?img=${resultUrl}`
      router.push(url)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  return (
    <div className="relative sm:container min-h-[calc(100vh-3rem)] mx-auto pb-16">
      <Head>
        <title>Styfer | Create</title>
        <meta
          name="description"
          content="Tranfer your favorite artist style to your image"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <form className="flex flex-col gap-2 p-4 pt-2">
        <div className="flex flex-col gap-2">
          <div className="divider font-medium">Target Image</div>
          <UploadImage
            selectedFile={selectedTargetImage}
            handleChange={handleTargetImageChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="divider font-medium">Select or Upload Style</div>
          <div className="grid grid-cols-4 gap-2 xs:gap-4 w-full xs:w-80 sm:w-1/2 mx-auto sm:mx-0">
            {styles.map((style) => {
              if (style.image === undefined) {
                return (
                  <label
                    key={style.value.toString()}
                    className="col-span-2 p-0 cursor-pointer"
                  >
                    <input
                      className="peer absolute opacity-0 w-0 h-0 radio"
                      type="radio"
                      name="style-radio"
                      value={style.value}
                      checked={selectedStyle === style.value}
                      onChange={handleStyleChange}
                    />
                    {uploadCustomStyleButton()}
                  </label>
                )
              }
              return (
                <label
                  key={style.value.toString()}
                  className="label p-0 cursor-pointer"
                >
                  <input
                    className="peer absolute opacity-0 w-0 h-0 radio"
                    type="radio"
                    name="style-radio"
                    value={style.value}
                    checked={selectedStyle === style.value}
                    onChange={handleStyleChange}
                  />
                  <div className="relative w-full aspect-square peer-checked:outline outline-secondary rounded-lg overflow-hidden">
                    <Image
                      className="checked:outline outline-base-content"
                      src={style.image}
                      alt={style.name}
                      layout="fill"
                      objectFit="cover"
                      placeholder="blur"
                      priority
                    />
                  </div>
                </label>
              )
            })}
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={handleTransferButton}
            className="btn btn-primary btn-block btn-lg"
          >
            Transfer Style
          </button>
        </div>
      </form>
      <LoadingLayer isLoading={isLoading} />
    </div>
  )
}

Create.getLayout = (page: ReactElement) => {
  return <AppLayout>{page}</AppLayout>
}

export default Create
