import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"
import { firebaseService } from "./Firebase"

class StorageService {
    constructor() {
        this.storage = getStorage(firebaseService.app)
    }

    uploadFile(file, path) {
        const fileRef = ref(this.storage, `${path}/${file.name}`);
        return uploadBytes(fileRef, file)
    }

    downloadURL(ref) {
        return getDownloadURL(ref)
    }
}

export const storageService = new StorageService()