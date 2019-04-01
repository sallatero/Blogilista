const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: "Viimeistä murua myöten",
    author: "Virpi Mikkonen",
    url: "http://www.viimeistamuruamyoten.com/",
    likes: 15,
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)
  const titles = blogsAtEnd.map(b => b.title)
  expect(titles).toContain('Viimeistä murua myöten')
})

test('blog without title is not added', async () => {
  const newBlog = {
    author: "Virpi Mikkonen",
    url: "http://www.viimeistamuruamyoten.com/",
    likes: 15,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body.length).toBe(helper.initialBlogs.length)
})

test('a specific blog is within the returned ones', async () => {
  const response = await api.get('/api/blogs')
  const titles = response.body.map(b => b.title)
  expect(titles).toContain('Sallan reseptit')
})

afterAll(() => {
  mongoose.connection.close()
})