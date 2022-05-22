export const pendingStorage = {
    name: 'pendingStorage',
    title: 'Pending Storage',
    type:'document',
    fields: [
        {
            name: 'weight',
            title: 'Weight',
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