export const pendingReciept = {
    name: 'pendingReciept',
    title: 'Pending Reciept ',
    type: 'document',
    fields: [
        {
            name: 'recipient',
            title: 'Recipient',
            type: 'string'
        },
        {
            name: 'internationalCode',
            title: 'International Code',
            type: 'string'
        },
        {
            name: 'type',
            title: 'Type',
            type: 'string'
        },
        {
            name: 'weight',
            title: 'Weight',
            type: 'string'
        },
        {
            name: 'billing',
            title: 'Billing',
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