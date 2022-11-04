     //获得文件MIME类型
     export  function fileMIMEType(typeName: string): string {
        return {
            "3gp": "video/3gpp",
            "apk": "application/vnd.android.package-archive",
            "asf": "video/x-ms-asf",
            "avi": "video/avi",
            "bin": "application/octet-stream",
            "bmp": "image/bmp",
            "c": "text/plain",
            "class": "application/octet-stream",
            "conf": "text/plain",
            "cpp": "text/plain",
            "exe": "application/x-msdownload",
            "gif": "image/gif",
            "gtar": "application/x-gtar",
            "gz": "application/x-gzip",
            "h": "text/plain",
            "htm": "text/html",
            "html": "text/html",
            "jar": "application/java-archive",
            "java": "text/plain",
            "jpeg": "image/jpeg",
            "jpg": "image/jpeg",
            "js": "application/x-javascript",
            "log": "text/plain",
            "m3u": "audio/x-mpegurl",
            "m4a": "audio/x-m4a",
            "m4b": "audio/mp4a-latm",
            "m4p": "audio/mp4a-latm",
            "m4u": "video/vnd.mpegurl",
            "m4v": "video/x-m4v",
            "mov": "video/quicktime",
            "mp2": "audio/x-mpeg",
            "mp3": "audio/mpeg",
            "mp4": "video/mp4",
            "mpc": "application/vnd.mpohun.certificate",
            "mpe": "video/mpeg",
            "mpeg": "video/mpeg",
            "mpg": "video/mpeg",
            "mpg4": "video/mp4",
            "mpga": "audio/mpeg",
            "msg": "application/vnd.ms-outlook",
            "ogg": "audio/ogg",
            "pdf": "application/pdf",
            "png": "image/png",
            "pps": "application/vnd.ms-powerpoint",
            "prop": "text/plain",
            "rar": "application/x-rar-compressed",
            "rc": "text/plain",
            "rmvb": "audio/x-pn-realaudio",
            "rtf": "application/rtf",
            "sh": "text/plain",
            "tar": "application/x-tar",
            "tgz": "application/x-compressed",
            "txt": "text/plain",
            "wav": "audio/wav",
            "wma": "audio/x-ms-wma",
            "wmv": "video/x-ms-wmv",
            "wps": "application/vnd.ms-works",
            "xml": "text/plain",
            "xls": "application/vnd.ms-excel",
            "xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "doc": "application/msword",
            "docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "ppt": "application/vnd.ms-powerpoint",
            "pptx": "application/vnd.ms-powerpoint",
            "z": "application/x-compress",
            "zip": "application/x-zip-compressed",
            "svg":"image/svg+xml"
        }[typeName] || ''
    }
