

import http from '@/utils/http';

/**
 * 图片上传
 *
 * @param file
 */
export function uploadImg(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  return http({
    url: '/uploadimg',
    method: 'post',
    data: formData,
  });
}

/**
 * 视频上传
 *
 * @param file
 */
 export function uploadVideo(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  return http({
    url: '/uploadvideo',
    method: 'post',
    data: formData,
  });
}

/**
 * 文件下载
 *
 */
 export function uploadDoc() {
  return http({
    url: '/download',
    method: 'get',
  });
}


/**
 * 删除文件
 *
 * @param path
 */
// export function deleteFile(path?: string) {
//   return http({
//     url: '/youlai-admin/api/v1/files',
//     method: 'delete',
//     params: { path: path },
//   });
// }
