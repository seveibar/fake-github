import defaultAxios, { AxiosError, AxiosInstance } from "axios"
import { getTestServer as getEdgespecTestServer } from "edgespec/testing/ava"

const errorRefs: Record<string, AxiosError> = {}
class BetterAxiosError extends Error {
  errorRefKey: string
  requestDescription: string
  constructor(originalAxiosError: AxiosError) {
    super(
      `Response Error [${
        originalAxiosError?.response?.status
      }] ${JSON.stringify(originalAxiosError?.response?.data)}`,
    )
    this.errorRefKey = Math.random().toString(36).slice(2)
    this.requestDescription = `${originalAxiosError?.config?.method?.toUpperCase()} ${
      originalAxiosError?.config?.url
    }`
    errorRefs[this.errorRefKey] = originalAxiosError
  }
  get axiosError() {
    return errorRefs[this.errorRefKey]
  }
  get status() {
    return this.axiosError?.status
  }
  get response() {
    return this.axiosError.response
  }
  get request() {
    return this.axiosError.request
  }
  get config() {
    return this.axiosError.config
  }
}

export interface TestFixture {
  server_url: string
  api_axios: AxiosInstance
}

export const getTestServer = async (t: any) => {
  const fixture: TestFixture = {} as any

  const { port } = await getEdgespecTestServer(t, {
    middleware: [
      (req: any, ctx: any, next: any) => {
        return next(req, ctx)
      },
    ],
  })

  const server_url = `http://localhost:${port}`
  fixture.server_url = server_url

  fixture.api_axios = defaultAxios.create({
    baseURL: `${server_url}/api.github.com`,
  })

  fixture.api_axios.interceptors.response.use(
    (response) => response,
    (regularError) => {
      throw new BetterAxiosError(regularError)
    },
  )

  return fixture
}
