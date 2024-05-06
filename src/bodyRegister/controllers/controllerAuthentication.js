import Authentication from '../services/serviceAuthentication.js'

const registro = async (req, res) => {
  try {
    await Authentication.registro(req.body.username, req.body.password)
    const response = {
      status: 'ÉXITO',
    }
    res.status(201).json(response)
  } catch (err) {
    res.status(500).send(err.message)
  }
}

const login = async (req, res) => {
  try {
    const tokenEnter = await Authentication.login(
      req.body.username,
      req.body.password,
    )
    const response = {
      status: 'ÉXITO',
      data: {
        username: req.body.username,
        token: tokenEnter,
      },
    }
    res.status(200).json(response)
  } catch (err) {
    res.status(400).send(err.message)
  }
}

export default {
  registro,
  login,
}

