const endpoint = '/api/custom-request'

export async function submitCustomRequest({ service, selections, file }) {
  const payload = new FormData()
  payload.append('service', service)
  payload.append('selections', JSON.stringify(selections))

  if (file) payload.append('referenceImage', file)

  const response = await fetch(endpoint, { method: 'POST', body: payload })
  const result = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(result.error || '提交失败，请稍后重试。')

  return result
}
