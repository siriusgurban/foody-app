import Head from 'next/head'
import React from 'react'

function MetaSeo({
  title,
  description,
  img_url,
}: {
  title: string
  description: string
  img_url: string
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={img_url} />
      <meta property="og:url" content={img_url} />
    </Head>
  )
}

export default MetaSeo
