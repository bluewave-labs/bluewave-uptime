export function getPublicApiRef(apiRef) {
  return {
    current: apiRef.current.getPublicApi()
  };
}