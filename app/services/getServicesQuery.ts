export const getServicesQuery = () => {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/api/services?populate=*`
  url = `${url}`

  return url
}