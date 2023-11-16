import { BASE_URL, API_URL_ADMIN } from '@/config/apiConfig';
import axios from 'axios';

const uploaderService = async (formData, id) => {
  //   const formData = new FormData();
  //   newFiles.forEach((file, index) => {
  //     formData.append(`file[${index}]`, file);
  //     //formData.append(`file[]`, file);
  //   });

  console.log('formData UPLOADER:', formData);
  console.log('id UPLOADER:', id);

  //   Handle validations
  const resp = await axios({
    method: 'post',
    mode: 'no-cors',
    url: `${BASE_URL}/api/admin/uploader/${id}`,
    //url: `http://demo.actsistem.com/upload.php?directory=react_resim`,
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' },
  })
    .then((response) => {
      console.log('RESPONSE from uploader service: ', response);
      return response.data;
    })
    .catch((error) => {
      console.log('Error! Uploader Service: ', error);
    });

  console.log('RESP: ', resp);
  return resp;
};

const uploadProductImages = async (formData, id) => {
  return uploaderService(formData, id);
};

export { uploaderService, uploadProductImages };
