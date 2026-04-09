import { mockBootstrap } from "@/mock/bootstrap";

async function safeJson(response: Response) {
  if (!response.ok) {
    const text = await response.text();
    let message = text || `Error ${response.status}`;
    try {
      const parsed = JSON.parse(text) as { error?: string };
      message = parsed.error || message;
    } catch {
      message = text || `Error ${response.status}`;
    }
    throw new Error(message);
  }
  return response.json();
}

export const apiClient = {
  async getBootstrap() {
    try {
      return await safeJson(await fetch("/api/bootstrap"));
    } catch {
      return mockBootstrap;
    }
  },
  async parsePrices(rawText: string, supplierId?: string) {
    return safeJson(
      await fetch("/api/parse-prices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rawText, supplierId })
      })
    );
  },
  async savePurchase(payload: unknown) {
    return safeJson(
      await fetch("/api/purchases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
    );
  },
  async getLatestPrices(supplierId?: string) {
    return safeJson(await fetch(`/api/latest-prices${supplierId ? `?supplierId=${encodeURIComponent(supplierId)}` : ""}`));
  },
  async getNextDocumentNumber(purchaseDate: string) {
    return safeJson(await fetch(`/api/next-document-number?date=${encodeURIComponent(purchaseDate)}`));
  },
  async getCompare() {
    return safeJson(await fetch("/api/compare"));
  },
  async saveLatestPrice(payload: unknown) {
    return safeJson(
      await fetch("/api/latest-prices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
    );
  },
  async getDashboard() {
    return safeJson(await fetch("/api/dashboard"));
  },
  async saveProvider(supplierName: string) {
    return safeJson(
      await fetch("/api/providers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ supplierName })
      })
    );
  },
  async saveSettings(payload: unknown) {
    return safeJson(
      await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
    );
  }
};
