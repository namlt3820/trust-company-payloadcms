import path from 'path'
import type { CollectionConfig } from 'payload/types'
import { CollectionSlugs } from './CollectionSlugs'

export const Media: CollectionConfig = {
  slug: CollectionSlugs.media,
  admin: {
    enableRichTextLink: false,
    enableRichTextRelationship: false,
  },
  upload: {
    staticDir: path.resolve(__dirname, '../../media'),
    mimeTypes: ['image/*'],
  },
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [],
}
