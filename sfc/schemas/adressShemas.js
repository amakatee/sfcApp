export const addressShema = {
    name:'addressShema',
    type: 'document',
    title:'Addreses',
    fields: [
        {
            name: 'firstName',
            title:'FirstName',
            type:'string'
        },
        {
            name: 'secondName',
            title: 'Second Name',
            type: 'string',

        },
        {
            name: 'email',
            title: 'Email',
            type: 'string',
            
        },
        {
            name: 'phone',
            title: 'Phone Number',
            type: 'string',
            
        },
        {
            name: 'zip',
            title: 'Zipcode',
            type: 'string',
            
        },
        {
            name: 'fetchId',
            title: 'fetchId',
            type: 'string',
            
        },
        {
            name: 'telegram',
            title: 'Telegram',
            type: 'string',
            
        },
     
        {
            name: 'country',
            title: 'Country',
            type: 'string',
            
        },
      
        {
            name: 'address',
            title: 'Address',
            type: 'string',
            
        },
        {
            name: 'user',
            titile: 'User Infomation',
            type: 'reference',
            to:[{ type: 'users'}]
        },
        {
            name:'timestamp',
            title: 'Time Stamp',
            type: 'datetime'
        },


    ]
}