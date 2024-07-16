import { CollectionSlugs } from '@/collections/CollectionSlugs'
import { CollectionAfterChangeHook } from 'payload/types'

const notifyAdmin: CollectionAfterChangeHook = async ({
  doc, // full document data
  req, // full express request
  previousDoc, // document data before updating the collection
  operation, // name of the operation ie. 'create', 'update',
  collection,
}) => {
  const message = `Hi, someone just made an ${operation} operation in the ${
    collection.slug
  } collection. The document ID is ${
    doc.id || ''
  }. Please go to the admin console and check it out.\n${
    process.env.CLIENT_URL
  }/admin.`

  //ignore login
  if (
    [CollectionSlugs.users, CollectionSlugs.admins].includes(
      collection.slug as CollectionSlugs
    ) &&
    operation === 'update'
  ) {
    return
  }

  req.payload.sendEmail({
    from: process.env.RESEND_FROM_EMAIL,
    to: process.env.NOTIFY_EMAIL,
    subject: 'TrustCompany Update',
    text: message,
  })
}

export { notifyAdmin }
