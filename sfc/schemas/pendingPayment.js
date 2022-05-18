export const pendingPayment = {
    name: 'pendingPayment',
    title: 'Pending Payment',
    type: 'document',
    fields: [
        {
            name: 'recipient',
            title: 'Recipient',
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