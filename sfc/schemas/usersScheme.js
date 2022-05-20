export const usersScheme = {
    name:'users',
    type: 'document',
    title:'Users',
    fields: [
        {
            name:'nickname',
            title:'Name',
            type: 'string'

        },
        {
            name: 'walletAddress',
            title: 'Wallet Address',
            type: 'string'
        },
        {
            name: 'packages',
            title: 'Packages',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{ type:'packages'}]
                }
               

            ] 
        },
        {
            name: 'pendingStorage',
            title: 'Pending Storage',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{ type:'pendingStorage'}]
                }
               

            ] 
        }
    ]
}
// export default {
//     name: 'users',
//     type: 'document',
//     title: 'Users',
//     fields: [
//         {
//             name:'nickname',
//             title:'Name',
//             type: 'string'

//         },
//         {
//             name: 'email',
//             title: 'E-mail',
//             type: 'string'
//         },
//         {
//             name: 'password',
//             title: 'Password',
//             type: 'string'
//         }
//     ]
// }