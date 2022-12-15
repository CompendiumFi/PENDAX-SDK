export default function handler(req, res) {
  if (req.method == "GET") {
    const time = Math.floor(Date.now() / 1000); // In seconds
    res.setHeader("Content-Type", "text/plain").send(time.toString());
  }
}
