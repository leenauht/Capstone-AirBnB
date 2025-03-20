class CacheLocalService {
  private readonly USER_NAME_KEY = "userName";

  getDataCache() {
    const keyCache = this._getNameCache();
    const data = localStorage.getItem(keyCache);
    if (data) return JSON.parse(data);
  }

  saveDataCache(data) {
    const keyCache = this._getNameCache();
    const currentData = this.getDataCache() || {};
    localStorage.setItem(keyCache, JSON.stringify({ ...currentData, ...data }));
  }

  private _getNameCache() {
    return localStorage.getItem(this.USER_NAME_KEY) || "anonymus";
  }

  saveUserNameLocalStore(name) {
    localStorage.setItem(this.USER_NAME_KEY, name);
  }
  // goi save khi dang nhap thanh cong va co userName
}

export const cacheLocalService = new CacheLocalService();

cacheLocalService.saveDataCache({ [123]: true });
