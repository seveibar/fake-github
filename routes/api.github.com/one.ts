import { withEdgeSpec } from "lib/with-edge-spec"
import { z } from "zod"

export default withEdgeSpec({
  methods: ["GET", "POST"],
  auth: "none",
  jsonResponse: z.any(),
})(async (req, ctx) => {
  return ctx.json({
    ok: true,
  })
})
