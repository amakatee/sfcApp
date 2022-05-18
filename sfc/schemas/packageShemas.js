export const packageShemas = {
    name: 'packages',
    title: 'Packages',
    type: 'document',
    fields: [
        {
            name: 'domesticTrack',
            title: 'Domestic Track Code',
            type: 'string'
        },
        {
            name: 'user',
            titile: 'User Infomation',
            type: 'reference',
            to:[{ type: 'users'}]
        }
        
    ]
}