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
            name: 'email',
            title: 'E-mail',
            type: 'string'
        },
        {
            name: 'password',
            title: 'Password',
            type: 'string'
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