import { User as UserData } from "../../../graphql/queries/__generated__/User";

export interface UserProfileProps {
  user: UserData["user"],
  viewerIsUser: boolean
}