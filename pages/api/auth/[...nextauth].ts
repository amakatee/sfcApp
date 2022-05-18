import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { client } from "../../../lib/client";
import { useState } from "react";





export default NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Email", type: "email", placeholder: "jsmith" },
                password: {  label: "Password", type: "password" }
            },

           
            authorize: (credentials) =>{
                if(credentials?.username == "dfs@test.com" && credentials.password === "test") {
                    return {
                        id: 2,
                        name: "dfs",
                        email: 'test@test.com'
                    }
                }
                //failedn
                return null
            },

            
        })
    ],
    callbacks: {
        jwt: async ({token, user}) => {
            if(user) {
                token.id = user.id
            } 
            return token
        },
        session: ({session, token}) =>{
            if(token) {
                session.id = token.id
               
            }
            return session
        }
    },
    secret:"test",
    jwt: {
        secret:"test",
        // encryption: true,
    }
})

// export const getServerSideProps = async () => {
//     const query = "*[_type == 'users']"
//     const users = await client.fetch(query)
//     console.log(users)
//     return {
//       props: {users}
//     }
//   }

