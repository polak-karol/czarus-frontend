import React from 'react'
import { Button, Card, CardContent } from '@mui/material'

const Login = () => (
  <div>
    <Card>
      <CardContent>
        <Button href="https://discord.com/api/oauth2/authorize?client_id=993578103538458664&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2F&response_type=code&scope=identify%20guilds%20email">
          Login using Discord
        </Button>
      </CardContent>
    </Card>
  </div>
)

export default Login
