const request = require('supertest')
const app = require('../server')

// Endpoints
describe('Value endpoints', () => {
  let uuid = ''

  // Get all
  it('should get all proper values', async () => {
    const res = await request(app).get('/api/value/all')

    const data = res.body

    expect(res.statusCode).toEqual(200)
    expect(Array.isArray(data)).toBe(true)

    data.forEach((item) => {
      expect(item).toHaveProperty('uuid')
      expect(item).toHaveProperty('body')
      expect(item).toHaveProperty('createdAt')
      expect(item).toHaveProperty('updatedAt')
    })
  })
  // Create
  it('should create value', async () => {
    const body = 'new value'

    const res = await request(app).post('/api/value').send({ body })

    const data = res.body

    expect(res.statusCode).toEqual(200)
    expect(data).toHaveProperty('uuid')
    expect(data).toHaveProperty('body')
    expect(data.body).toEqual(body)
    expect(data).toHaveProperty('createdAt')
    expect(data).toHaveProperty('updatedAt')

    uuid = data.uuid
  })
  it('should not create if body is empty', async () => {
    const res = await request(app).post('/api/value').send({ body: '' })

    const data = res.body

    expect(res.statusCode).toEqual(400)
    expect(Array.isArray(data)).toBe(true)
  })
  // Update
  it('should update value', async () => {
    const body = 'updated value'

    const res = await request(app).put(`/api/value/${uuid}`).send({ body })

    const data = res.body

    expect(res.statusCode).toEqual(200)
    expect(data).toHaveProperty('uuid')
    expect(data).toHaveProperty('body')
    expect(data.body).toEqual(body)
    expect(data).toHaveProperty('createdAt')
    expect(data).toHaveProperty('updatedAt')
  })
  it('should not update if body is empty', async () => {
    const res = await request(app).put(`/api/value/${uuid}`).send({ body: '' })

    const data = res.body

    expect(res.statusCode).toEqual(400)
    expect(Array.isArray(data)).toBe(true)
  })
  it('should not update value if value is not found', async () => {
    const res = await request(app)
      .put('/api/value/123456')
      .send({ body: 'updated value' })

    const data = res.body

    expect(res.statusCode).toEqual(404)
    expect(data).toHaveProperty('msg')
  })
  // Delete
  it('should delete value', async () => {
    const res = await request(app).delete(`/api/value/${uuid}`)

    const data = res.body

    expect(res.statusCode).toEqual(200)
    expect(data).toHaveProperty('msg')
  })
  it('should not delete value if value is not found', async () => {
    const res = await request(app).delete('/api/value/123456')

    const data = res.body

    expect(res.statusCode).toEqual(404)
    expect(data).toHaveProperty('msg')
  })
})
