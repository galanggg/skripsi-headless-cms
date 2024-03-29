import React from 'react'
import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import PostList from './ExperimentalBlog'
import HeroBlog2 from './HeroBlog2'
import Container from '../Container'
import CardList2 from './CardList2'
import Header from '../migrate/Header'
import { motion } from 'framer-motion'

//Animation for blog section
let easing = [0.175, 0.85, 0.42, 0.96]

const imageVariants = {
  exit: { y: 50, opacity: 0, transition: { duration: 0.5, ease: easing } },
  enter: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: easing,
    },
  },
}
//End of animation

export const PostsQuery = gql`
  query GET_PAGINATED_POSTS(
    $first: Int
    $last: Int
    $after: String
    $before: String
  ) {
    posts(first: $first, last: $last, after: $after, before: $before) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        cursor
        node {
          id
          postId
          title
          excerpt
          slug
          date
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  }
`

const Posts = () => {
  const variables = {
    first: 4,
    last: null,
    after: null,
    before: null,
  }
  const { data, error, loading, fetchMore } = useQuery(PostsQuery, {
    variables,
  })

  if (error) {
    return <pre>{JSON.stringify(error)}</pre>
  }

  if (loading) {
    return null
  }
  const {
    posts: { edges },
  } = data
  const {
    posts: { pageInfo },
  } = data
  // console.log(edges)
  // console.log(pageInfo)

  const heroPost = edges[0]?.node
  const morePost = edges.slice(1)

  const updateQuery = (previousResult, { fetchMoreResult }) => {
    return fetchMoreResult.posts.edges.length ? fetchMoreResult : previousResult
  }
  return (
    <div className="blogs">
      <Header />
      <Container>
        <motion.div initial="exit" animate="enter" exit="exit">
          <motion.div variants={imageVariants} className="lg:px-16 px-6 mt-10">
            {heroPost && (
              <HeroBlog2
                title={heroPost.title}
                coverImage={heroPost.featuredImage.node}
                date={heroPost.date}
                author={heroPost.author}
                slug={heroPost.slug}
                excerpt={heroPost.excerpt}
              />
            )}
            {morePost.length > 0 && (
              <CardList2
                error={error}
                loading={loading}
                data={data}
                posts={morePost}
                fetchMore={fetchMore}
              />
            )}
          </motion.div>
        </motion.div>
        <div className="flex my-5 justify-center">
          {pageInfo.hasPreviousPage ? (
            <button
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              onClick={() => {
                fetchMore({
                  variables: {
                    first: null,
                    after: null,
                    last: 4,
                    before: pageInfo.startCursor || null,
                  },
                  updateQuery,
                })
              }}
            >
              Previous
            </button>
          ) : null}
          {pageInfo.hasNextPage ? (
            <button
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              onClick={() => {
                fetchMore({
                  variables: {
                    first: 4,
                    after: pageInfo.endCursor || null,
                    last: null,
                    before: null,
                  },
                  updateQuery,
                })
              }}
            >
              Next
            </button>
          ) : null}
        </div>
      </Container>
    </div>
  )
}

export default Posts
