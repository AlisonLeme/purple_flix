import nextConnect from 'next-connect'
import { remove } from '../../../src/controllers/movies'

const route = nextConnect()

route.delete(remove)

export default route 