import path from "path";

export default function (media, src) {
	let ext = path.extname(src);
    let type = null;
    const regex = RegExp("^((http|https|ftp):)");
    if (regex.test(src)){
        ext = "link";
    }

	switch (ext) {
        case "link":
            return "link";
			break;
		case ".mp3":
			type = "mpeg";
			break;
		case ".ogg":
			type = "ogg";
			break;
		case ".wav":
			type = "wav";
			break;
        case ".mp4":
        case ".m4a":
            type = "mp4";
			break;
		case ".webm":
			type = "webm";
			break;
        default:
			return false;
	}

	if (type) {
		return media + "/" + type;
	} else {
		return false;
	}

};
