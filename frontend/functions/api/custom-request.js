const recipient = 'tiankangrong46@gmail.com'
const maxImageSize = 5 * 1024 * 1024
const maxTotalImageSize = 20 * 1024 * 1024
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function headers() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }
}

function json(body, status = 200) {
  return Response.json(body, { status, headers: headers() })
}

function buildEmail(service, selections) {
  const titles = {
    computer: '电脑配置调试需求',
    fpv: '穿越机配置定制需求',
    model: '3D 模型定制需求',
  }
  const title = titles[service]
  if (!title || !selections || typeof selections !== 'object') return null

  const text = Object.entries(selections).map(([label, value]) => {
    const display = Array.isArray(value)
      ? (value.length ? value.join('、') : '未选择')
      : (String(value || '').trim() || '未填写')
    return `${label}：${display}`
  }).join('\n')

  return { title, text: `${title}\n\n${text}` }
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: headers() })
}

export async function onRequestPost({ request, env }) {
  if (!env.RESEND_API_KEY || !env.EMAIL_FROM) {
    return json({ error: '邮件服务尚未配置，请联系网站管理员。' }, 503)
  }

  const formData = await request.formData()
  let selections
  try {
    selections = JSON.parse(formData.get('selections'))
  } catch {
    return json({ error: '提交内容格式不正确。' }, 400)
  }

  const email = buildEmail(formData.get('service'), selections)
  if (!email) return json({ error: '提交内容不完整。' }, 400)

  const contactEmail = String(formData.get('contactEmail') || '').trim()
  if (!emailPattern.test(contactEmail)) {
    return json({ error: '请填写有效的联系邮箱。' }, 400)
  }

  const message = {
    from: env.EMAIL_FROM,
    to: [recipient],
    subject: email.title,
    text: email.text,
    reply_to: contactEmail,
  }
  const images = formData.getAll('referenceImage').filter((image) => image instanceof File && image.size > 0)
  if (images.length) {
    const totalImageSize = images.reduce((total, image) => total + image.size, 0)
    if (totalImageSize > maxTotalImageSize || images.some((image) => !image.type.startsWith('image/') || image.size > maxImageSize)) {
      return json({ error: '参考图必须是 5MB 以内的图片文件。' }, 400)
    }
    message.attachments = []
    for (const image of images) {
      const bytes = new Uint8Array(await image.arrayBuffer())
      let binary = ''
      for (const byte of bytes) binary += String.fromCharCode(byte)
      message.attachments.push({ filename: image.name, content: btoa(binary) })
    }
  }

  const result = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  })
  if (!result.ok) {
    console.error('Resend request failed:', await result.text())
    return json({ error: '邮件发送失败，请稍后重试。' }, 502)
  }

  return json({ ok: true })
}
