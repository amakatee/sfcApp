
   
import sanityClient from '@sanity/client'

export const client = sanityClient({
    projectId:'ka2bucze',
    dataset: 'production',
    apiVersion: '2021-10-21',
    useCdn: true,
    token:'skg5e51YKM3gGOqg9ekxANdFjrUHCXnKmVEP9rlkXp3WjDj0OtvPcQERvS7P6zhQxEF3fSEpJSEh4wGU29z1CKShhHe1HgUd2kNneoQfhgfki9aBIiWbkRxvMz61fiCPspG5FQVbQCpwpHx5VVcwx7wpE744xcbDodIpM8G8ZMAa6FNNbvcb'
})