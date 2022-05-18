
   
import sanityClient from '@sanity/client'

export const client = sanityClient({
    projectId:'ka2bucze',
    dataset: 'production',
    apiVersion: '2021-10-21',
    useCdn: true,
    token:process.env.NEXT_PUBLIC_TOKEN
})