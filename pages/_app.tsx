import '@assets/chrome-bug.css'
import '@assets/main.css'
import { Head } from '@components/common'
import { ManagedUIContext } from '@components/ui/context'
import 'keen-slider/keen-slider.min.css'
import type { AppProps } from 'next/app'
import { FC, useEffect } from 'react'
import { useRouter } from 'next/router'
import * as gtag from '../lib/gtag'

const Noop: FC = ({ children }) => <>{children}</>

export default function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop

  useEffect(() => {
    document.body.classList?.remove('loading')
  }, [])

  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: any) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>
      <Head />
      <ManagedUIContext>
        <Layout pageProps={pageProps}>
          <Component {...pageProps} />
        </Layout>
      </ManagedUIContext>
    </>
  )
}
