// Write your tests here
const request = require('supertest')
const db = require('../data/dbConfig')
const server = require('./server')

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
}) //migrate
afterAll(async () => {
  await db.destroy()
})

describe('[GET] /api/jokes', () => {
  test('gets err when hit w/out token', async () => {
    const res = await request(server).get('/api/jokes')
    expect(res.body).toMatchObject({"message": "token required"})
    expect(res.body).toBeTruthy()
  })
  test('snapshot test', async () => {
    const res = await request(server).get('/api/jokes')
    expect(res.body).toMatchSnapshot()
  })
})

describe('[POST] /api/auth/register', () => {
  test('responds with status code 201', async () => {
    const res = await request(server).post('/api/auth/register').send({
      username: 'bethesda', password: "doom"
    })
    expect(res.status).toBe(201)
  })
  test('responds with newly created username', async () => {
    const res = await request(server).post('/api/auth/register').send({
      username: 'respawn', password: 'apexlegends'
    })
    expect(res.body.username).toMatch('respawn')
  })
})

