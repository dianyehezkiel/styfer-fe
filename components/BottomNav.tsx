import {
  UserCircleIcon as SettingsIcon,
  SparklesIcon as CreateIcon,
  HomeIcon,
} from '@heroicons/react/24/outline'
import {
  UserCircleIcon as SettingsIconSelected,
  SparklesIcon as CreateIconSelected,
  HomeIcon as HomeIconSelected,
} from '@heroicons/react/24/solid'
import Link from 'next/link'
import React from 'react'
import { setPage, useStateValue } from '../lib/state'

export default function BottomNav() {
  const [{ page }, dispatch] = useStateValue()

  const homeIcon = () => {
    return page === 'home' ? (
      <HomeIconSelected className="w-7 h-7" />
    ) : (
      <HomeIcon className="w-7 h-7" />
    )
  }

  const createIcon = () => {
    return page === 'create' ? (
      <CreateIconSelected className="w-7 h-7" />
    ) : (
      <CreateIcon className="w-7 h-7" />
    )
  }

  const settingsIcon = () => {
    return page === 'account' ? (
      <SettingsIconSelected className="w-7 h-7" />
    ) : (
      <SettingsIcon className="w-7 h-7" />
    )
  }

  return (
    <div className="sticky bottom-0 z-50">
      <div className="flex w-full fixed bottom-0 h-14 bg-base-300">
        <div className="h-full w-1/3 text-center">
          <Link href="/home">
            <a
              onClick={() => dispatch(setPage('home'))}
              className="btn btn-block h-full flex-col btn-link"
            >
              {homeIcon()}
            </a>
          </Link>
        </div>
        <div className="h-full w-1/3 text-center">
          <Link href="/create">
            <a
              onClick={() => dispatch(setPage('create'))}
              className="btn btn-block h-full flex-col btn-link"
            >
              {createIcon()}
            </a>
          </Link>
        </div>
        <div className="h-full w-1/3 text-center">
          <Link href="/account">
            <a
              onClick={() => dispatch(setPage('account'))}
              className="btn btn-block h-full flex-col btn-link"
            >
              {settingsIcon()}
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}
