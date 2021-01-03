const request = require('supertest')
const app = require('../server')

// Endpoints
describe('Principle endpoints', () => {
  let uuid = ''

  // Get all
  it('should get all proper principles', async () => {
    const res = await request(app).get('/principle/all')

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
  it('should create principle', async () => {
    const body = 'new principle'

    const res = await request(app).post('/principle').send({ body })

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
    const res = await request(app).post('/principle').send({ body: '' })

    const data = res.body

    expect(res.statusCode).toEqual(400)
    expect(Array.isArray(data)).toBe(true)
  })
  // Update
  it('should update principle', async () => {
    const body = 'updated principle'

    const res = await request(app).put(`/principle/${uuid}`).send({ body })

    const data = res.body

    expect(res.statusCode).toEqual(200)
    expect(data).toHaveProperty('uuid')
    expect(data).toHaveProperty('body')
    expect(data.body).toEqual(body)
    expect(data).toHaveProperty('createdAt')
    expect(data).toHaveProperty('updatedAt')
  })
  it('should not update if body is empty', async () => {
    const res = await request(app).put(`/principle/${uuid}`).send({ body: '' })

    const data = res.body

    expect(res.statusCode).toEqual(400)
    expect(Array.isArray(data)).toBe(true)
  })
  it('should not update principle if principle is not found', async () => {
    const res = await request(app)
      .put('/principle/123456')
      .send({ body: 'updated principle' })

    const data = res.body

    expect(res.statusCode).toEqual(404)
    expect(data).toHaveProperty('msg')
  })
  // Delete
  it('should delete principle', async () => {
    const res = await request(app).delete(`/principle/${uuid}`)

    const data = res.body

    expect(res.statusCode).toEqual(200)
    expect(data).toHaveProperty('msg')
  })
  it('should not delete principle if principle is not found', async () => {
    const res = await request(app).delete('/principle/123456')

    const data = res.body

    expect(res.statusCode).toEqual(404)
    expect(data).toHaveProperty('msg')
  })
})
