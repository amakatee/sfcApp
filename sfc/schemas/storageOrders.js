import { string } from "prop-types";

export const storageOrders = {
    name: 'storageOrders',
    title: 'StorageOrders',
    type:'document',
    fields: [
        {
            name: 'packInfo',
            title: 'Packafes Info',
            type:'string',

        },
        {
            name: 'address',
            title:'Adress',
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