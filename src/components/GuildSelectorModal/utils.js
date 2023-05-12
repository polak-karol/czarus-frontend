const formatAvatarNameToAcronym = (name) =>
  name
    .split(' ')
    .splice(0, 3)
    .map((word) => word[0])

export const getAvatarProps = (guild) => {
  if (!guild.icon) return { children: formatAvatarNameToAcronym(guild.name), alt: guild.name }

  return { src: `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}`, alt: guild.name }
}
