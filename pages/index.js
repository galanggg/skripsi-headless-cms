import Head from 'next/head'
import Link from 'next/link'
import Nav from '../components/Navbar'
import Hero from '../components/Hero'
import Services from '../components/Services'
import { getAllPages } from '../lib/api'

export default function Home({ homePage: { edges } }) {
  const homepage = edges[0]?.node
  console.log(homepage)
  return (
    <div className="">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <Hero tagline={homepage.tagline.tagline} />
      <Services />
      <footer></footer>
    </div>
  )
}

export async function getStaticProps({ preview = false }) {
  const homePage = await getAllPages(preview)
  return {
    props: {
      homePage,
    },
  }
}
