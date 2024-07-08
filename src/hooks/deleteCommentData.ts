import { CollectionSlugs } from '@/collections/CollectionSlugs'
import { AfterDeleteHook } from 'payload/dist/collections/config/types'
import { Comment } from 'payload/generated-types'

export const deletecCommentData: AfterDeleteHook<Comment> = async ({
  doc,
  req: { payload },
}) => {
  await payload.delete({
    collection: CollectionSlugs.reactions,
    where: {
      'target.value': {
        equals: doc.id,
      },
      'target.relationTo': {
        equals: CollectionSlugs.comments,
      },
    },
  })

  await payload.delete({
    collection: CollectionSlugs.reports,
    where: {
      'target.value': {
        equals: doc.id,
      },
      'target.relationTo': {
        equals: CollectionSlugs.comments,
      },
    },
  })
}
