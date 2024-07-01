import { ReactionTypes } from '@/constants/ReactionTypes'
import { getReactionCountByType } from '@/endpoints/getReactionCountByType'
import { Access, CollectionConfig } from 'payload/types'
import { CollectionSlugs } from './CollectionSlugs'

const isAdminOrCreator: Access = async ({ req: { user, payload }, id }) => {
  if (user?.collection === CollectionSlugs.admins) return true

  const reaction = await payload.findByID({
    collection: CollectionSlugs.reactions,
    id,
    depth: 0,
  })
  if (!reaction) return true

  return reaction.user === user.id
}

const Reactions: CollectionConfig = {
  slug: CollectionSlugs.reactions,
  admin: {
    useAsTitle: 'type',
  },
  access: {
    read: () => true,
    delete: isAdminOrCreator,
    update: isAdminOrCreator,
  },
  fields: [
    {
      name: 'type',
      type: 'select',
      options: [
        {
          label: 'Thumbs up',
          value: ReactionTypes.ThumbsUp,
        },
        {
          label: 'Thumbs down',
          value: ReactionTypes.ThumbsDown,
        },
        {
          label: 'Red heart',
          value: ReactionTypes.RedHeart,
        },
        {
          label: 'Skull',
          value: ReactionTypes.Skull,
        },
      ],
      defaultValue: ReactionTypes.ThumbsUp,
      required: true,
    },
    {
      name: 'target',
      type: 'relationship',
      relationTo: [CollectionSlugs.comments, CollectionSlugs.reviews],
      required: true,
      index: true,
      label: 'Target',
      hasMany: false,
    },

    {
      name: 'user',
      type: 'relationship',
      relationTo: CollectionSlugs.users,
      required: true,
      index: true,
      label: 'User',
    },
  ],
  endpoints: [
    {
      path: '/count-by-type',
      method: 'get',
      handler: getReactionCountByType,
    },
  ],
}

export default Reactions
