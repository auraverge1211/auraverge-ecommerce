import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import RazorpayPkg from "razorpay";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Razorpay API
  app.post("/api/create-order", async (req, res) => {
    try {
      const { amount, currency = "INR" } = req.body;
      const keyId = process.env.RAZORPAY_KEY_ID;
      const keySecret = process.env.RAZORPAY_KEY_SECRET;

      if (!keyId || !keySecret) {
        return res.status(500).json({ error: "Razorpay keys not configured" });
      }

      const Razorpay = (RazorpayPkg as any).default || RazorpayPkg;
      const rzp = new Razorpay({ key_id: keyId, key_secret: keySecret });
      
      const order = await rzp.orders.create({
        amount: Math.round(amount * 100),
        currency,
        receipt: `receipt_${Date.now()}`
      });
      res.json(order);
    } catch (error) {
      console.error("Razorpay Error:", error);
      res.status(500).json({ error: "Failed to create order" });
    }
  });

  const isProduction = process.env.NODE_ENV === "production";

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa", // Standard SPA mode is more robust for dev
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
