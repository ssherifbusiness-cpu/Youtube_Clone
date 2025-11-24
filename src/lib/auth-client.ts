import { createAuthClient } from "better-auth/react"
import { twoFactorClient, adminClient, organizationClient } from "better-auth/client/plugins"
import { createAccessControl } from "better-auth/plugins/access"
import { defaultStatements, userAc, adminAc } from "better-auth/plugins/admin/access"

const ac = createAccessControl(defaultStatements)

export const user = ac.newRole({
  ...userAc.statements,
  user: [...userAc.statements.user, "list"],
})

const admin = ac.newRole(adminAc.statements)

export interface UserSession {
  id: string
  email: string
  roles: string[]
  activeOrganizationId?: string
  image?: string
}

export const authClient = createAuthClient({
  baseURL: import.meta.env.APP_URL,
  plugins: [
    twoFactorClient({
      onTwoFactorRedirect: () => {
        window.location.href = "/auth/2fa"
      },
    }),
    adminClient({
      ac,
      roles: {
        admin,
        user,
      },
    }),
    organizationClient(),
  ],
})
