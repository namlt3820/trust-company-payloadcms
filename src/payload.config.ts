import path from 'path'

import { webpackBundler } from '@payloadcms/bundler-webpack'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloud } from '@payloadcms/plugin-cloud'
import { slateEditor } from '@payloadcms/richtext-slate'
import { buildConfig } from 'payload/config'
import Admins from './collections/Admins'
import { CollectionSlugs } from './collections/CollectionSlugs'
import Comments from './collections/Comments'
import Companies from './collections/Companies'
import Feedbacks from './collections/Feedback'
import { Media } from './collections/Media'
import Reactions from './collections/Reactions'
import Reports from './collections/Reports'
import Reviews from './collections/Reviews'
import Users from './collections/Users'
import { dropDevCollections } from './endpoints/dropDevCollections'

export default buildConfig({
  admin: {
    user: CollectionSlugs.admins,
    bundler: webpackBundler(),
    webpack: (config) => ({
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          '@': path.resolve(__dirname),
        },
      },
    }),
  },
  editor: slateEditor({}),
  collections: [
    Users,
    Admins,
    Media,
    Companies,
    Reviews,
    Comments,
    Reactions,
    Feedbacks,
    Reports,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [payloadCloud()],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
  endpoints: [
    {
      path: '/drop-dev-collections',
      method: 'delete',
      handler: dropDevCollections,
    },
  ],
  upload: {
    limits: {
      fileSize: 500000, // 0.5MB, written in bytes
    },
  },
  csrf: [process.env.CLIENT_URL, process.env.SERVER_URL],
  cors: [process.env.CLIENT_URL, process.env.SERVER_URL],
})
