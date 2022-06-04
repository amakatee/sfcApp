import { string } from "prop-types";

export const storagePayments = {
    name: 'storagePayments',
    title: 'storagePayments',
    type:'document',
    fields: [
        {
            name: 'type',
            title: 'type',
            type:'string',

        },
        {
            name: 'recipient',
            title:'recipient',
            type: 'string',
            
            
        },
        {
            name: 'billing',
            title:'billing',
            type: 'string',
            
            
        },
        {
            name: 'order',
            title:'order',
            type: 'string',
            
            
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
        },
    ]


}