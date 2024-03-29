import { Othewebdev } from '@components/icons'
import { Container, Logo } from '@components/ui'
import type { Page } from '@framework/api/operations/get-all-pages'
import getSlug from '@lib/get-slug'
import cn from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'

interface Props {
  className?: string
  children?: any
  pages?: Page[]
}

const footer_date = new Date().getFullYear()

const LEGAL_PAGES = ['terms-of-use', 'shipping-returns', 'privacy-policy']

const Footer: FC<Props> = ({ className, pages }) => {
  const { sitePages, legalPages } = usePages(pages)
  const rootClassName = cn(className)

  return (
    <footer className={rootClassName}>
      <Container>
        <div className="grid px-4 mx-4 grid-cols-1 lg:grid-cols-2 gap-8 border-b border-accents-2 py-12 text-primary bg-primary transition-colors duration-150">
          <div className="col-span-1 lg:col-span-2">
            <Link href="/">
              <a className="flex flex-initial items-center font-bold md:mr-24">
                <span className=" mr-4 ">
                  <Logo />
                </span>
              </a>
            </Link>
          </div>
          <div className="col-span-1 py-12 lg:col-span-2">
            <ul className="flex flex-initial flex-col md:flex-1">
              <li className="py-3 md:py-0 md:pb-4">
                <Link href="/">
                  <a className="text-primary hover:text-accents-6 transition font-light ease-in-out duration-150">
                    Home
                  </a>
                </Link>
              </li>

              {sitePages.map((page) => (
                <li key={page.url} className="py-3 md:py-0 md:pb-4">
                  <Link href={page.url!}>
                    <a className="text-primary hover:text-accents-6 transition font-light ease-in-out duration-150">
                      {page.name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-1 py-12 lg:col-span-2"></div>
          <div className="col-span-1 lg:col-span-6 flex items-start lg:justify-end text-primary">
            <div className="flex space-x-6 items-center h-10"></div>
          </div>
        </div>
        <div className="py-12 flex flex-col md:flex-row justify-between items-center space-y-4">
          <div>
            <span>
              &copy; {footer_date} Truley Unique LLC. All rights reserved.
            </span>
          </div>
          <div className="flex items-center text-primary">
            <span className="text-primary">Developed by</span>
            <a
              rel="noopener"
              href="https://www.otheweb.dev"
              aria-label="Visit The Developers Site"
              target="_blank"
              className="text-primary"
            >
              <Othewebdev
                className="inline-block h-6 ml-4 text-primary"
                alt="Othewebdev Logo"
              />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  )
}

function usePages(pages?: Page[]) {
  const { locale } = useRouter()
  const sitePages: Page[] = []
  const legalPages: Page[] = []

  if (pages) {
    pages.forEach((page) => {
      const slug = page.url && getSlug(page.url)

      if (!slug) return
      if (locale && !slug.startsWith(`${locale}/`)) return

      if (isLegalPage(slug, locale)) {
        legalPages.push(page)
      } else {
        sitePages.push(page)
      }
    })
  }

  return {
    sitePages: sitePages.sort(bySortOrder),
    legalPages: legalPages.sort(bySortOrder),
  }
}

const isLegalPage = (slug: string, locale?: string) =>
  locale
    ? LEGAL_PAGES.some((p) => `${locale}/${p}` === slug)
    : LEGAL_PAGES.includes(slug)

// Sort pages by the sort order assigned in the BC dashboard
function bySortOrder(a: Page, b: Page) {
  return (a.sort_order ?? 0) - (b.sort_order ?? 0)
}

export default Footer
