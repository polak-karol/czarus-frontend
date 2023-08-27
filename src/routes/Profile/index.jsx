import React, { useContext } from 'react'
import {
  Avatar,
  Badge,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Divider,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import UserContext from '~/contexts/UserContext'
import Page from '~/components/Page'
import { getDecodedFlags } from './utils'
import { nitroMap } from './config'

const Profile = () => {
  const { user } = useContext(UserContext)
  const avatarHeight = 120
  const avatarWidth = 120

  return (
    <Page>
      <Stack flexDirection="row" gap="1.5rem">
        <Card sx={{ flex: 2 }}>
          <CardMedia
            sx={{ height: 120, width: '100%', backgroundColor: `#${user.accent_color}` }}
            image={`https://cdn.discordapp.com/banners/${user.id}/${user.banner}`}
          />
          <Divider style={{ marginTop: -(avatarHeight / 2) }} textAlign="left">
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              badgeContent={
                user.verified && (
                  <Tooltip title="Verified">
                    <Avatar
                      sx={{
                        height: 30,
                        width: 30,
                        outlineWidth: 5,
                        outlineColor: '#1E1E1E',
                        outlineStyle: 'solid',
                        bgcolor: '#5865F2',
                      }}
                    >
                      <CheckRoundedIcon sx={{ color: 'white' }} />
                    </Avatar>
                  </Tooltip>
                )
              }
            >
              <Avatar
                sx={{
                  width: avatarWidth,
                  height: avatarHeight,
                  outlineWidth: 5,
                  outlineColor: '#1E1E1E',
                  outlineStyle: 'solid',
                }}
                alt={user.username}
                src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`}
              />
            </Badge>
          </Divider>
          <CardContent>
            <Container sx={{ width: `calc(80% - ${avatarHeight}px)` }}>
              <Typography variant="h3" component="h3">
                {user.global_name}
              </Typography>
              <Typography variant="h5" component="h5">
                {user.username}
              </Typography>
              <Stack sx={{ marginTop: '1.5rem' }} alignItems="flex-start">
                {getDecodedFlags(user.flags).map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Stack>
            </Container>
          </CardContent>
        </Card>
        <Stack sx={{ flex: 1 }} flexDirection="column" gap="1.5rem">
          <Card sx={{ flex: 1, padding: '2rem' }}>
            <Typography component="h6" variant="h6">
              Email
            </Typography>
            <Typography component="span" variant="body1">
              {user.email}
            </Typography>
          </Card>
          <Card sx={{ flex: 1, padding: '2rem' }}>
            <Typography component="h6" variant="h6">
              Nitro type
            </Typography>
            <Typography component="span" variant="body1">
              {nitroMap[user.premium_type]}
            </Typography>
          </Card>
        </Stack>
      </Stack>
    </Page>
  )
}

export default Profile
