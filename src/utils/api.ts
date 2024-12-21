const getBaseUrl = () => {
  // If we're running in the browser
  if (typeof window !== "undefined") {
    // Use window.location.origin for the current domain
    return window.location.origin;
  }

  // If we're running on the server
  if (process.env.VERCEL_URL) {
    return `${process.env.VERCEL_URL}`;
  }

  // Fallback for local development
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
};

export const api = {
  get: async (endpoint: string) => {
    const baseUrl = getBaseUrl();
    console.log("Making GET request to:", `${baseUrl}${endpoint}`); // Debug log

    const response = await fetch(`${baseUrl}${endpoint}`, {
      headers: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        message: response.statusText,
      }));
      throw new Error(
        `API Error: ${response.status} - ${JSON.stringify(errorData)}`
      );
    }

    return response.json();
  },

  post: async (endpoint: string, data: unknown) => {
    const baseUrl = getBaseUrl();
    console.log("Making POST request to:", `${baseUrl}${endpoint}`); // Debug log

    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        message: response.statusText,
      }));
      throw new Error(
        `API Error: ${response.status} - ${JSON.stringify(errorData)}`
      );
    }

    return response.json();
  },

  put: async (endpoint: string, data: unknown) => {
    const baseUrl = getBaseUrl();
    console.log("Making PUT request to:", `${baseUrl}${endpoint}`); // Debug log

    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        message: response.statusText,
      }));
      throw new Error(
        `API Error: ${response.status} - ${JSON.stringify(errorData)}`
      );
    }

    return response.json();
  },

  delete: async (endpoint: string) => {
    const baseUrl = getBaseUrl();
    console.log("Making DELETE request to:", `${baseUrl}${endpoint}`); // Debug log

    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        message: response.statusText,
      }));
      throw new Error(
        `API Error: ${response.status} - ${JSON.stringify(errorData)}`
      );
    }

    return response.json();
  },
};
