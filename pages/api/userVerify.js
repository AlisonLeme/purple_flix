import nextConnect from 'next-connect'
import { post } from '../../src/controllers/userVerify'

const route = nextConnect()

route.post(post)

export default route