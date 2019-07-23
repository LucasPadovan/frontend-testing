import { Meteor } from 'meteor/meteor';
import { FilesCollection } from 'meteor/ostrio:files';

const MAX_SIZE = 10485760;

export const ImagesCollection = new FilesCollection({
    collectionName: 'publicImages',
    public: true,
    downloadRoute: 'public-images',
    // ToDo: define upload path
    // storagePath: () => `${process.env.PWD}/public/images/players`,
    storagePath: () => `${process.env.PWD}/.meteor`,
    allowClientCode: false, // Disallow remove files from Client
    onBeforeUpload(file) {
        // Allow upload files under 10MB, and only in png/jpg/jpeg formats
        if (file.size <= MAX_SIZE && /png|jpg|jpeg/i.test(file.extension)) {
            return true;
        }
        return 'La imagen debe ser menor a 10MB';
    },
});
