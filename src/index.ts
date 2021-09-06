import { UserConfigApp } from "@factor/api"
import { listTypesArray } from "./api/types"

/**
 * Primary view components
 * Vue natively has support for the dynamic imports format below
 * treat these as working components
 */
const itemView = (): Promise<any> => import("./el/PageItem.vue")
const userView = (): Promise<any> => import("./el/PageUser.vue")
const listView = (): Promise<any> => import("./el/PageList.vue")

export const setup = (): UserConfigApp => {
  return {
    routes: [
      { path: "/v/:view", component: listView },
      { path: "/v/:view/:page", component: listView },
      { path: "/item/:id", component: itemView },
      { path: "/user/:id", component: userView },
      { path: "/", redirect: "/v/top" },
    ],
  }
}

/**
 * Add a webpack alias to load in different versions of the HN fetching routine based on
 * if user is in client or server.
 *
 * This is a pain and sometimes technical to deal with but relates to the environmental differences
 * between the server and a bundled webpack application
 */
addFilter({
  hook: "webpack-aliases",
  key: "addApiAlias",
  callback: (aliases, { target }) => {
    aliases["create-api"] =
      target == "client" ? "./create-api-client" : "./create-api-server"
    return aliases
  },
})
