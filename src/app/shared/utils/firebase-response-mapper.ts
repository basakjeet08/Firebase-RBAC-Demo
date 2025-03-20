// This function maps the firebase list response to the desired object
export function mapFirebaseListResponse<T>(
  response: { [key: string]: T } | null
): T[] {
  // If the list is empty then we return an empty array
  if (!response) return [];

  // Mapping the firebase response to the desired list
  return Object.keys(response).map((key) => ({
    ...response[key],
    id: key,
  }));
}

// This function maps the firebase object response to the desired object
export function mapFirebaseObjectResponse<T>(
  response: T | null,
  id: string
): T | null {
  return response ? { ...response, id } : null;
}
