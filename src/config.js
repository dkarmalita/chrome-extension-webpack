export const CRM_DOMAIN_ID = 'ptscrm.com' // 'http://localhost'
export const MOCK_USER_JWT = false
export const MOCK_API_CALLS_ONLY = true

export const POLLING_INTERVAL = 3000
export const POLLING_ENABLED = true // false - block the polling
export const MAX_POLLINGS = 0 // 0 - unlimt

// KARD: remove the mock
// parsedJwtMock
export const PARSED_JWT_MOCK = {
  exp: '1560357869',
  iat: '1560354269',
  ip: '62.244.35.42',
  user: {
    id: '3860',
  },
  localhost: true,
}
