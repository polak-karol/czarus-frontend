export const createData = (name, code, population, size) => {
  const density = population / size
  return { name, code, population, size, density }
}
