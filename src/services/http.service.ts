export class HttpService {
  async get<T>(url: string): Promise<T> {
    const response = await fetch(url);

    if (response.ok) {
      return await response.json();
    }

    throw await response.json();
  }
}

export default new HttpService();
