import { FC, useState, useEffect } from 'react'
import Link from 'next/link'
import s from './Navbar.module.css'
import { Logo, LogoAlt, Container } from '@components/ui'
import { Searchbar, UserNav } from '@components/common'
import cn from 'classnames'
import throttle from 'lodash.throttle'

const Navbar: FC = () => {
  const [hasScrolled, setHasScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsOpen(!isOpen)
    const handleScroll = throttle(() => {
      const offset = 0
      const { scrollTop } = document.documentElement
      const scrolled = scrollTop > offset
      setHasScrolled(scrolled)
    }, 200)

    document.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className={cn(s.root, { 'shadow-magical': hasScrolled })}>
      <Container>
        <div className="relative px-2 flex flex-row justify-between py-4 align-center md:py-6">
          <div className="flex items-center flex-1">
            <div className=" sm:block md:hidden lg:hidden">
              <div onClick={() => setIsOpen(!isOpen)}>
                <a className={s.logo} aria-label="Logo">
                  <Logo />
                </a>
              </div>
            </div>

            <div className=" hidden md:block lg:block">
              <div onClick={() => setIsOpen(!isOpen)}>
                <a className={s.logo} href="/" aria-label="Logo">
                  <Logo />
                </a>
              </div>
            </div>

            <nav className="w-200 ml-4 hidden space-x-2 md:block lg:block">
              <Link href="/search">
                <a className={s.link}>Products</a>
              </Link>
              <Link href="/en-US/faq">
                <a className={s.link}>FAQ</a>
              </Link>
              <Link href="/en-US/contact">
                <a className={s.link}>Contact</a>
              </Link>
            </nav>
          </div>

          <div className="justify-center flex-1 hidden lg:flex">
            <Searchbar />
          </div>

          <div className="flex justify-end flex-1 space-x-8">
            <UserNav />
          </div>
        </div>
        <div className={isOpen ? `${s.content}` : `${s.contentShow}`}>
          <nav className="flex w-full flex-col mb-4 items-center sm:block md:hidden lg:hidden">
            <Link href="/">
              <a onClick={() => setIsOpen(!isOpen)} className={s.mobilelink}>
                Home
              </a>
            </Link>
            <Link href="/search">
              <a onClick={() => setIsOpen(!isOpen)} className={s.mobilelink}>
                Products
              </a>
            </Link>
            <Link href="/en-US/faq">
              <a onClick={() => setIsOpen(!isOpen)} className={s.mobilelink}>
                FAQ
              </a>
            </Link>
            <Link href="/en-US/contact">
              <a onClick={() => setIsOpen(!isOpen)} className={s.mobilelink}>
                Contact
              </a>
            </Link>
          </nav>
        </div>
        <div className="flex pb-4 lg:px-6 lg:hidden">
          <Searchbar id="mobile-search" />
        </div>
      </Container>
    </div>
  )
}

export default Navbar
