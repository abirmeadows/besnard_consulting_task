import axios from 'axios'

import { singleValue, values, singlePrinciple, principles } from '../data'

export default function mockedAxios() {
  axios.get.mockImplementation((url) => {
    switch (url) {
      case '/api/value/all':
        return Promise.resolve({ data: values })
      case '/api/principle/all':
        return Promise.resolve({ data: principles })
      default:
        return Promise.reject(new Error('not found'))
    }
  })
  axios.post.mockImplementation((url, { body }) => {
    switch (true) {
      case url === '/api/value' && body !== '':
        return Promise.resolve({ data: { ...singleValue, body } })
      case url === '/api/value' && body === '':
        return Promise.reject({
          response: { data: ['Body must not be empty'] },
        })
      case url === '/api/principle' && body !== '':
        return Promise.resolve({ data: { ...singlePrinciple, body } })
      case url === '/api/principle' && body === '':
        return Promise.reject({
          response: { data: ['Body must not be empty'] },
        })
      default:
        return Promise.reject(new Error('not found'))
    }
  })
  axios.put.mockImplementation((url, { body }) => {
    switch (true) {
      case url === '/api/value/1' && body !== '':
        return Promise.resolve({ data: { ...singleValue, body, uuid: '1' } })
      case url === '/api/value/1' && body === '':
        return Promise.reject({
          response: { data: ['Body must not be empty'] },
        })
      case url === '/api/principle/4' && body !== '':
        return Promise.resolve({
          data: { ...singlePrinciple, body, uuid: '4' },
        })
      case url === '/api/principle/4' && body === '':
        return Promise.reject({
          response: { data: ['Body must not be empty'] },
        })
      default:
        return Promise.reject(new Error('not found'))
    }
  })
  axios.delete.mockImplementation((url) => {
    switch (url) {
      case '/api/value/1':
        return Promise.resolve()
      case '/api/principle/4':
        return Promise.resolve()
      default:
        return Promise.reject(new Error('not found'))
    }
  })
}
