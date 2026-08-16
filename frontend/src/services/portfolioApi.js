const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://api.tkr-studio.com/api/v1'

async function get(path) {
  const response = await fetch(`${baseUrl}${path}`)
  if (!response.ok) throw new Error('Unable to load projects')
  return response.json()
}

export const getCategories = () => get('/categories/')
export const getProjects = (params = {}) => {
  const query = new URLSearchParams({ page: '1', page_size: '50', ...params })
  return get(`/projects/?${query}`)
}
export const getProject = (slug) => get(`/projects/${encodeURIComponent(slug)}/`)
