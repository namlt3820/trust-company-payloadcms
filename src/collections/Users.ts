import { deleteUserData } from '@/hooks/deleteUserData'
import { checkSchema } from '@/utilities/validateWithJoi'
import joi from 'joi'
import { CollectionConfig } from 'payload/types'
import { CollectionSlugs } from './CollectionSlugs'

const Users: CollectionConfig = {
  slug: CollectionSlugs.users,
  auth: {
    verify: {
      generateEmailHTML: ({ req, token }) => {
        const locale = req.cookies?.NEXT_LOCALE || 'en'
        const { body } = req
        const url = `${process.env.CLIENT_URL}/${locale}/account/verify?token=${token}`
        return `Hi ${body.name}, to access the user feature of TrustCompany website, please verify your email by clicking here: ${url}`
      },
      generateEmailSubject: () => 'Verify your email',
    },
    forgotPassword: {
      generateEmailHTML: ({ req, token }) => {
        const locale = req.cookies?.NEXT_LOCALE || 'en'
        const url = `${process.env.CLIENT_URL}/${locale}/account/reset?token=${token}`
        return `You are receiving this because you (or someone else) have requested the reset of the password for your account. Please click on the following link, or paste this into your browser to complete the process: ${url}. If you did not request this, please ignore this email and your password will remain unchanged.`
      },
      generateEmailSubject: () => 'Forgot password',
    },
  },
  admin: {
    useAsTitle: 'email',
  },

  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: 'name',
      type: 'text',
      validate: (val) => {
        return checkSchema(
          val,
          joi
            .string()
            .required()
            .max(50)
            .regex(/^\w+(?:\s+\w+)*$/)
        )
      },
      required: true,
    },
  ],

  access: {
    create: () => true,
    read: () => true,
  },
  hooks: {
    afterDelete: [deleteUserData],
  },
}

export default Users
