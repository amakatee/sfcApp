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
            name: 'order',
            title: 'order No',
            type: 'string'
        },
        {
            name: 'info',
            title: 'Info',
            type: 'string'
        },
        {
            name:'timestamp',
            title: 'Time Stamp',
            type: 'datetime'
        },
        {
            name: 'user',
            titile: 'User Infomation',
            type: 'reference',
            to:[{ type: 'users'}]
        }
        
    ]
}