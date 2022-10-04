import { MagnifyingGlassIcon, PencilIcon } from '@heroicons/react/24/solid'
import React, { ChangeEventHandler } from 'react'

interface UploadImageProps {
  selectedFile?: Blob;
  handleChange: ChangeEventHandler<HTMLInputElement>;
}

export default function UploadImage({
  selectedFile,
  handleChange,
}: UploadImageProps) {
  const [preview, setPreview] = React.useState<string>()

  React.useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined)
      return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  return !preview ? (
    <div className="relative flex justify-center items-center w-full xs:w-80 sm:w-1/2 mx-auto sm:mx-0 aspect-square bg-base-300 rounded-lg overflow-hidden">
      <label>
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleChange}
          hidden
        />
        <div className="btn btn-neutral bg-base-100 btn-outline 2xs:btn-lg font-normal normal-case">
          <MagnifyingGlassIcon className="hidden 2xs:block w-5 h-5 mr-2" />
          Browse
        </div>
      </label>
    </div>
  ) : (
    <div className="relative flex justify-center items-center w-full xs:w-80 sm:w-1/2 mx-auto sm:mx-0 aspect-square bg-base-300 rounded-lg overflow-hidden">
      <img
        className="object-cover aspect-square"
        src={preview}
        alt="selected picture"
      />
      <label className="absolute right-0 bottom-0">
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleChange}
          hidden
        />
        <div className="btn btn-square bg-neutral/75 rounded-none rounded-tl-lg">
          <PencilIcon className="block w-5 h-5" />
        </div>
      </label>
    </div>
  )
}
