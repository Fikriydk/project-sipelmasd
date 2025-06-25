export async function fetchLaporan({ status, kategori, lokasi }) {
  const query = `
    query GetLaporan($status: String, $kategori: String, $lokasi: String) {
      laporan(status: $status, kategori: $kategori, lokasi: $lokasi) {
        _id
        judul
        isi
        nama
        kategori
        lokasi
        status
        tanggal
      }
    }
  `;

  const variables = { status, kategori, lokasi };

  const response = await fetch("http://localhost:5000/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });

  const data = await response.json();
  return data.data.laporan;
}
