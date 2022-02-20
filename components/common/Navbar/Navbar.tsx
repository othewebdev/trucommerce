import { FC, useState, useEffect } from 'react'
import Link from 'next/link'
import s from './Navbar.module.css'
import { Logo, MenuBars, Container } from '@components/ui'
import { Searchbar, UserNav } from '@components/common'
import cn from 'classnames'
import throttle from 'lodash.throttle'
import Butterfly from '@components/ui/Butterfly'

const Navbar: FC = () => {
  const [hasScrolled, setHasScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const ariaLabel = 'Truley Unique'
  const pages = [
    { name: 'Home', ariaLabel: 'Truley Unique Homepage', link: '/' },
    { name: 'Shop', ariaLabel: 'Shop Truley Unique', link: '/search' },
    {
      name: 'FAQ',
      ariaLabel: 'Frequently Asked Questions Truley Unique',
      link: '/en-US/faq',
    },
    {
      name: 'Contact',
      ariaLabel: 'Contact Truley Unique',
      link: '/en-US/contact',
    },
  ]

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
        <div className="relative px-4 grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 justify-between py-4 align-center md:py-6">
          <div className="flex items-center flex-1">
            <div className="sm:block md:hidden lg:hidden">
              <div
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                }}
              >
                <a aria-label={ariaLabel} href="/">
                  <Logo />
                </a>
                <div onClick={() => setIsOpen(!isOpen)}>
                  <MenuBars />
                </div>
              </div>
            </div>

            <nav className="w-200 ml-4 hidden space-x-2 md:block lg:block">
              {pages.map((p) => (
                <Link href={p.link}>
                  <a aria-label={p.ariaLabel} className={s.link}>
                    {p.name}
                  </a>
                </Link>
              ))}
            </nav>
          </div>
          <div className="justify-center flex-1 hidden lg:flex">
            <Searchbar />
          </div>
          <div className="flex justify-center flex-1  sm:block md:hidden lg:hidden " />
          <div className="flex justify-end flex-1 space-x-8">
            <UserNav />
          </div>
        </div>
        <div className={isOpen ? `${s.content}` : `${s.contentShow}`}>
          <nav
            className="flex w-full flex-col mb-4 p-6 items-left sm:block md:hidden lg:hidden"
            style={{ borderTop: '3px solid #ececec' }}
          >
            {pages.map((p) => (
              <Link href={p.link}>
                <a
                  aria-label={p.ariaLabel}
                  onClick={() => setIsOpen(!isOpen)}
                  className={s.mobilelink}
                >
                  {p.name}
                </a>
              </Link>
            ))}
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
