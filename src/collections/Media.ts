import path from 'path'
import type { CollectionConfig } from 'payload/types'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    enableRichTextLink: false,
    enableRichTextRelationship: false,
  },
  upload: {
    staticDir: path.resolve(__dirname, '../../media'),
    mimeTypes: ['image/*'],
    imageSizes: [
      {
        name: 'small',
        height: 150,
        width: 150,
      },
    ],
    adminThumbnail: 'small',
  },
  access: {
    read: () => true,
  },
  fields: [],
}
