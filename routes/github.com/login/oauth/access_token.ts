import { withEdgeSpec } from "lib/with-edge-spec"
import { z } from "zod"

export default withEdgeSpec({
  methods: ["POST"],
  jsonBody: z
    .object({
      client_id: z.string(),
      client_secret: z.string(),
      code: z.string(),
      redirect_uri: z.string().url(),
    })
    .or(z.object({})),
})(async (req, ctx) => {
  throw new Error("not implemented")
})
