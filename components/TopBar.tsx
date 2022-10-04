import Link from 'next/link'
import {
  MoonIcon,
  SunIcon,
  Bars3BottomRightIcon,
} from '@heroicons/react/24/solid'
import { themeChange } from 'theme-change'
import React, { MouseEventHandler } from 'react'

export default function TopBar() {
  const [show, setShow] = React.useState(true)
  const [lastScrollY, setLastScrollY] = React.useState(0)
  const [darkMode, setDarkMode] = React.useState<boolean>(true)

  React.useEffect(() => {
    themeChange(false)
    const isDark = localStorage.getItem('theme')
      ? localStorage.getItem('theme') === 'dark'
        ? true
        : false
      : window.matchMedia('(prefers-color-scheme:dark)').matches

    setDarkMode(isDark)
  }, [])

  const controlNavbar = () => {
    if (typeof window === 'undefined') return

    if (window.scrollY < lastScrollY - 160 || window.scrollY === 0) {
      // if scroll up show the navbar
      setShow(true)
      setLastScrollY(window.scrollY)
    }

    if (window.scrollY > lastScrollY) {
      // if scroll down hide the navbar
      setShow(false)
      setLastScrollY(window.scrollY)
    }
  }

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar)

      // cleanup function
      return () => {
        window.removeEventListener('scroll', controlNavbar)
      }
    }
  }, [lastScrollY])

  const handleDarkMode: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    const newDarkMode = darkMode ? false : true
    setDarkMode(newDarkMode)
  }

  return (
    <div
      className={`bg-primary text-primary-content sticky top-0 shadow-lg z-50 transition-transform duration-200 ${
        show ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <nav className="navbar sm:container px-4 mx-auto w-full justify-center min-h-12">
        <div className="navbar-center link no-underline text-2xl leading-none font-bold tracking-widest">
          <Link href="/">
            <div className="flex gap-2 items-center">
              <img src="/styfer.svg" width={24} />
              STYFER
            </div>
          </Link>
        </div>
        <div className="hidden navbar-center">
          <ul className="menu menu-horizontal hidden md:inline-flex p-0 gap-2 rounded-box font-medium">
            <li>
              <Link href="/create">Create</Link>
            </li>
            <li>
              <Link href="/gallery">Gallery</Link>
            </li>
          </ul>
        </div>
        <div className="hidden navbar-end">
          <button
            className="hidden md:flex btn btn-square btn-ghost"
            onClick={handleDarkMode}
            data-set-theme={darkMode ? 'light' : 'dark'}
            data-act-class="ACTIVECLASS"
          >
            <label className="swap swap-rotate">
              <input type="checkbox" checked={darkMode} readOnly={true} />
              <SunIcon className={`swap-on w-6 h-6 md:w-5 md:h-5`} />
              <MoonIcon className={`swap-off w-6 h-6 md:w-5 md:h-5`} />
            </label>
          </button>
          <div className="dropdown dropdown-end">
            <button className="btn btn-ghost px-2 hidden">
              {' '}
              {/*start of the hamburger button */}
              <Bars3BottomRightIcon className="w-8 h-8" />
            </button>
            <ul
              tabIndex={0}
              className="dropdown-content menu w-52 p-2 shadow bg-base-200 rounded-box gap-2"
            >
              <li>
                <Link href="/create">Create</Link>
              </li>
              <li>
                <Link href="/gallery">Gallery</Link>
              </li>
              <li>
                <Link href="/login">
                  <a className="btn btn-outline btn-block btn-neutral">Login</a>
                </Link>
              </li>
              <li>
                <Link href="/signup">
                  <a className="btn btn-block btn-primary">Sign up</a>
                </Link>
              </li>
              <div className="divider h-2 -mt-1 -mb-1 text-base-content"></div>
              <li className="flex flex-row justify-between items-center">
                <button
                  className="btn btn-block btn-ghost font-normal bg-base-content/10"
                  onClick={handleDarkMode}
                  data-set-theme={darkMode ? 'light' : 'dark'}
                  data-act-class="ACTIVECLASS"
                >
                  Switch theme
                  <label className="swap swap-rotate">
                    <input type="checkbox" checked={darkMode} readOnly={true} />
                    <SunIcon className={`swap-on w-6 h-6 md:w-5 md:h-5`} />
                    <MoonIcon className={`swap-off w-6 h-6 md:w-5 md:h-5`} />
                  </label>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}
