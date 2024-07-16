import { getCommentCountByReview } from '@/endpoints/getCommentCountByReview'
import { deletecCommentData } from '@/hooks/deleteCommentData'
import { notifyAdmin } from '@/hooks/notifyAdmin'
import { Comment } from 'payload/generated-types'
import { Access, CollectionConfig } from 'payload/types'
import { CollectionSlugs } from './CollectionSlugs'

const isAdminOrCreator: Access = async ({ req: { user, payload }, id }) => {
  if (user?.collection === CollectionSlugs.admins) return true

  const comment = await payload.findByID({
    collection: CollectionSlugs.comments,
    id,
    depth: 0,
  })
  if (!comment) return true

  return comment.user === user.id
}

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
  ],
  access: {
    read: () => true,
    update: isAdminOrCreator,
    delete: isAdminOrCreator,
  },
  hooks: {
    afterDelete: [deletecCommentData],
    afterChange: [notifyAdmin],
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
