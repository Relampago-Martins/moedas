import { getServerSession, type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { redirect } from "next/navigation";
import { MySession, MyUser } from "../../types/auth";
import { getUser, login, loginGoogle } from "./fetchAPI";


export const authConfig: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "bgmartins" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const resp = await login({
                    username: credentials?.username,
                    password: credentials?.password,
                })

                if (resp.status === 200) {
                    const APIKey = resp.data.key
                    const userRes = await getUser(APIKey)
                    return {
                        id: String(userRes.data.pk),
                        name: userRes.data.first_name + userRes.data.last_name,
                        email: userRes.data.email,
                        token: APIKey,
                    } as MyUser
                }

                return null
            }
        }),
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID as string,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        })
    ],

    callbacks: {
        async jwt({ token, user, account, profile}) {
            // console.log("jwt", token, user, account, profile)
            if (account?.provider === 'google') {
                await loginGoogle({
                    id_token: account?.id_token,
                    access_token: account?.id_token
                })
                .then((resp) => {
                    token.apiKey = resp.data.key
                })
                .catch(err => {})
            }
            
            if ((user as MyUser)?.token){
                token.apiKey = (user as MyUser).token
            }

            return token
        },
        async session({ session, token, user } ) {
            // console.log("session", session, token, user)
            (session as MySession).apiKey = token.apiKey as string
            if (user){
                session.user = user
            }

            return session
        }
    },
}


export async function loginIsRequiredServer(){
    const session = await getServerSession(authConfig);
    if (!session) return redirect('/login')
}

// export async function loginIsRequiredClient(){
//     if (typeof window !== 'undefined'){
//         // eslint-disable-next-line react-hooks/rules-of-hooks
//         const session = useSession()
//         // eslint-disable-next-line react-hooks/rules-of-hooks
//         const router = useRouter()
//         if (!session) {
//             router.push('/login')
//         }
//     }
// }