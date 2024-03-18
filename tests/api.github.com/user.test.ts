import test from "ava"
import { getTestServer } from "tests/fixtures/get-test-server"

test("GET /user", async (t) => {
  const { api_axios } = await getTestServer(t)

  const user = await api_axios.get("/user").then((r) => r.data)

  t.is(user.login, "jane")
})
