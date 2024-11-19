export async function getExports() {
  const apiRoot = process.env.REACT_APP_API_ROOT;
  return fetch(`${apiRoot}/video-builds`).then((res) => res.json());
}

export async function getExportsById(id) {
  const apiRoot = process.env.REACT_APP_API_ROOT;
  return fetch(`${apiRoot}/video-builds/${id}`).then((res) => res.json());
}
