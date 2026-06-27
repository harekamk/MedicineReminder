exports.getNearbyPharmacies = async (req, res) => {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({ message: "lat and lon are required" });
    }

    const url =
      `https://api.tomtom.com/search/2/nearbySearch/.json` +
      `?key=${process.env.TOMTOM_API_KEY}` +
      `&lat=${lat}` +
      `&lon=${lon}` +
      `&radius=15000` +
      `&limit=100` +
      `&categorySet=7326`;

    const response = await fetch(url);
    const data = await response.json();

    res.json(data);
  } catch (err) {
    console.error("TomTom proxy error:", err);
    res.status(500).json({ message: "Failed to fetch nearby pharmacies" });
  }
};