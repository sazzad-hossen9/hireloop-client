import { betterAuth } from "better-auth"
import { MongoClient } from "mongodb"
import { mongodbAdapter } from "@better-auth/mongo-adapter"
import { admin } from "better-auth/plugins"
import { adminAc, userAc } from "better-auth/plugins/admin/access"

const client = new MongoClient(process.env.BETTER_AUTH_DB_URI as string)
const db = client.db("hireloopdb")

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  user: {
    additionalFields: {
      role: {
        type: ["seeker", "recruiter", "admin"],
        input: true, // allow the sign-up client to send the role
        defaultValue: "seeker",
      },
    },
  },
  plugins: [
    admin({
      // Match the custom `role` field above so admin endpoints and their types
      // understand seeker/recruiter/admin instead of the plugin's user/admin.
      defaultRole: "seeker",
      roles: {
        seeker: userAc,
        recruiter: userAc,
        admin: adminAc,
      },
    }),
  ],
  database: mongodbAdapter(db, {
    client,
  }),
})
