export const isActive = (
  query: any,
  path: string,
  active: string,
  nonActive: string,
) => (query.page === path ? active : nonActive)
