import { ReactionTypes } from '@/constants/ReactionTypes'
import { CollectionConfig } from 'payload/types'
import { CollectionSlugs } from './CollectionSlugs'

const Reactions: CollectionConfig = {
  slug: CollectionSlugs.reactions,
  admin: {
    useAsTitle: 'type',
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
}

export default Reactions
