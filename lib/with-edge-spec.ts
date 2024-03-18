import { createWithEdgeSpec } from "node_modules/edgespec/dist/create-with-edge-spec"

export const withEdgeSpec = createWithEdgeSpec({
  authMiddleware: {},
  beforeAuthMiddleware: [],
})
