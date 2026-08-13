const endpoint = '/api/custom-request'

export async function submitCustomRequest({ service, selections, contactEmail, files = [] }) {
  const payload = new FormData()
  payload.append('service', service)
  payload.append('selections', JSON.stringify(selections))
  payload.append('contactEmail', contactEmail)

  files.filter(Boolean).forEach((file) => payload.append('referenceImage', file))

  const response = await fetch(endpoint, { method: 'POST', body: payload })
  const result = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(result.error || '提交失败，请稍后重试。')

  return result
}
