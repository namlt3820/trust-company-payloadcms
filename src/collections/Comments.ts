import { getCommentCountByReview } from '@/endpoints/getCommentCountByReview'
import { populatedUserField } from '@/fields/populatedUser'
import { populateUser } from '@/hooks/populateUser'
import { Comment } from 'payload/generated-types'
import { CollectionConfig } from 'payload/types'
import { CollectionSlugs } from './CollectionSlugs'

const Comments: CollectionConfig = {
  slug: CollectionSlugs.comments,
  admin: {
    useAsTitle: 'summary',
  },
  fields: [
    {
      name: 'content',
      type: 'textarea',
      maxLength: 5000,
      required: true,
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: CollectionSlugs.users,
      required: true,
      index: true,
      label: 'User',
    },
    {
      name: 'review',
      type: 'relationship',
      relationTo: CollectionSlugs.reviews,
      required: true,
      index: true,
      label: 'Review',
    },
    {
      name: 'summary',
      type: 'text',
      maxLength: 120,
      hooks: {
        beforeChange: [
          ({ data }: { data?: Partial<Comment> }) => {
            return data?.content?.substring(0, 100) + '...' || ''
          },
        ],
      },
    },
    populatedUserField(),
  ],
  access: {
    read: () => true,
  },
  hooks: {
    afterRead: [populateUser],
  },
  endpoints: [
    {
      path: '/count-by-review',
      method: 'get',
      handler: getCommentCountByReview,
    },
  ],
}

export default Comments
