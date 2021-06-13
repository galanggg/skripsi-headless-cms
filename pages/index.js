// import dynamic from 'next/dynamic'
// const Nav = dynamic(() => import('../components/home/Navbar'))
// const Hero = dynamic(() => import('../components/home/Hero'))
// const Services = dynamic(() => import('../components/home/Services'))
// const Photography = dynamic(() => import('../components/home/Photography'))
// const Videography = dynamic(() => import('../components/home/Videography'))
// const OurClient = dynamic(() => import('../components/home/OurClient'))
// const Contact = dynamic(() => import('../components/home/Contact'))

import Header from '../components/migrate/Header'
import Main from '../components/migrate/Main'
import Footer from '../components/migrate/Footer'

import { getAllPages, getAllPageById } from '../lib/api'

export default function Home({ homePage }) {
  const homepage = homePage
  console.log(homePage)

  return (
    <div className="bg-white">
      {/* <Nav />
      <Hero
        tagline={homepage.tagline.tagline}
        heroImage={homepage.featuredImage.node.sourceUrl}
      />
      <Services />
      <Photography gallery={homepage.gallery.gallery} />
      <Videography videography={homepage.videography.videography.sourceUrl} />
      <OurClient client={homepage.client.client} />
      <Contact /> */}
      <Header />
      <Main
        heroImage={homepage.featuredImage.node.sourceUrl}
        tagline={homepage.tagline.tagline}
        heroTitle={homepage.heroTitle.herotitle}
        heroImageRight={homepage.heroImageRight.heroimageright.sourceUrl}
        heroImageLeft={homepage.heroImageLeft.heroimageleft.sourceUrl}
        textLeft={homepage.textLeft.textleft}
        textRight={homepage.textRight.textright}
        textLeftDescription={homepage.textLeft.textleftdescription}
        textRightDescription={homepage.textRight.textrightdescription}
        client={homepage.client.client}
        advantagesSection={homePage.advantagesSection}
      />
      <Footer />
    </div>
  )
}

export async function getStaticProps({ preview = false }) {
  const homePage = await getAllPageById(preview)
  return {
    props: {
      homePage,
    },
    revalidate: 1,
  }
}
