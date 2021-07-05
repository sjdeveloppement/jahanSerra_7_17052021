const multer = require('multer');
// Dictionnaire de fichiers
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif'
};
// génération du nom de fichier en gérant les whitespaces.
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        let name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        name = name.replace("." + extension, "_");//test
        req.files.filename = name + Date.now() + '.' + extension;
        callback(null, name + Date.now() + '.' + extension);
        
        
        
    }
    
});

module.exports = multer({ storage: storage }).any('image');