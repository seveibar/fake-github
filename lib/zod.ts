import { z } from "zod"
export { simple_user } from "./github-zodios"

export type SimpleUser = z.infer<typeof simple_user>
