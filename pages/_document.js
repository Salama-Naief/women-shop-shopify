import {Html,Head,Main,NextScript} from 'next/document'
import React from 'react'

export default function Document() {
  return (
    <Html>
        <Head>
            <script type='text/javascript' src='https://cdn.weglot.com/weglot.min.js'></script>
        </Head>
        <body>
            <Main/>
            <NextScript/>
        </body>
    </Html>
  )
}
