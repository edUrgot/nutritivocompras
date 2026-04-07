export const draftStorage = {
  get() {
    if (typeof window === "undefined") return null;
    const raw = window.localStorage.getItem("nutritivo-draft");
    return raw ? JSON.parse(raw) : null;
  },
  set(value: unknown) {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("nutritivo-draft", JSON.stringify(value));
  }
};
