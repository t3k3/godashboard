'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import Image from 'next/image';
import { uploadProductImages } from '@/services/uploader';
import { editProduct } from '@/services/product';

export default function ProductImages(props) {
  const [selectedFiles, setSelectedFiles] = useState(
    props?.product?.product_images
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [success, setSuccess] = useState(false);

  const fileInputRef = useRef(null);

  const onSelectFile = () => {
    fileInputRef.current.click();
  };

  const onFileChange = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    const images = Array.from(e.target.files);
    const newFiles = images.filter((image) => {
      return !selectedFiles.some(
        (file) => file.name === image.name && file.size === image.size
      );
    });

    // setSelectedFiles((prevSelectedFiles) => [
    //   ...prevSelectedFiles,
    //   ...additionalImages.images,
    // ]);

    handleFileUpload(newFiles);
  };

  const sendNewOrder = async (order) => {
    setSuccess(false);
    setIsUpdate(true);
    // console.log('order: ', order);

    let temp = { ...props.product };
    temp.product_images = order;

    // console.log('BEFORE GÖNDERİLEN PRODUCT DATA:: ', temp);
    // props.setProduct(temp);

    // console.log('ÜRÜN EDİTİNDEN GÖNDERİLEN PRODUCT DATA:: ', temp);
    // Handle validations

    const response = await editProduct(temp, props.product.urunId);

    //TODO: Response Status 201 olmalı.
    if (response.status === 200) {
      props.setProduct(temp);
      setSuccess(true);
    }
    setIsUpdate(false);

    // axios({
    //   method: 'post',
    //   mode: 'no-cors',
    //   url: `http://demo.actsistem.com/api/v1/admin/index.php?route=catalog/product/edit&product_id=${props.product.urunId}`,
    //   //url: `http://demo.actsistem.com/upload.php?directory=react_resim`,
    //   data: temp,
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    // })
    //   .then((response) => {
    //     console.log(response);

    //     // Handle response
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     // Handle error
    //   });
  };

  const addNewImages = (data) => {
    // console.log('DATA: ', data);
    let temp = [];

    for (let i = 0; i < data.length; i++) {
      temp.push(data[i]);
    }
    setSelectedFiles((prevSelectedFiles) => [...prevSelectedFiles, ...temp]);
  };

  const removeFile = (index) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);

    // Input alanını temizle
    fileInputRef.current.value = '';
  };

  const FileItem = ({ file, index }) => {
    const ref = useRef(null);

    const [{ isDragging }, drag] = useDrag({
      type: 'file',
      item: { index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    const [, drop] = useDrop({
      accept: 'file',
      hover(item) {
        if (!ref.current) {
          return;
        }

        const dragIndex = item.index;
        const dropIndex = index;

        if (dragIndex === dropIndex) {
          return;
        }

        moveFile(dragIndex, dropIndex);
        item.index = dropIndex;
      },
    });

    const opacity = isDragging ? 0.4 : 1;

    drag(drop(ref));

    return (
      <div
        ref={ref}
        className={`flex relative m-1 p-1 ${
          isDragging ? 'border border-dashed' : 'border border-solid'
        } border-2 border-gray-200 rounded-lg`}
        style={{ opacity }}
      >
        <div className='w-32 h-32'>
          <Image
            src={'/' + file.image}
            alt='test'
            width={150}
            height={150}
            className='object-cover w-full h-full rounded-lg'
          />
        </div>
        <button
          className='absolute top-1 right-1 text-gray-400 hover:text-red-500 focus:outline-none'
          onClick={() => removeFile(index)}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6 bg-gray-50'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </button>
      </div>
    );
  };

  const moveFile = (dragIndex, dropIndex) => {
    const updatedFiles = [...selectedFiles];
    const dragFile = updatedFiles[dragIndex];

    updatedFiles[dragIndex] = updatedFiles[dropIndex];
    updatedFiles[dropIndex] = dragFile;

    setSelectedFiles(updatedFiles);
    // console.log('New File Order:', updatedFiles);
  };

  // const handleFileUpload = (newFiles) => {
  //   setIsLoading(true);
  //   const formData = new FormData();
  //   newFiles.forEach((file, index) => {
  //     formData.append(`file[${index}]`, file);
  //     //formData.append(`file[]`, file);
  //   });

  //   console.log('formData:', formData);
  //   // Handle validations
  //   axios({
  //     method: 'post',
  //     mode: 'no-cors',
  //     url: `http://demo.actsistem.com/api/v1/admin/index.php?route=catalog/product/uploader&directory=${props.product.urunId}`,
  //     //url: `http://demo.actsistem.com/upload.php?directory=react_resim`,
  //     data: formData,
  //     headers: { 'Content-Type': 'multipart/form-data' },
  //   })
  //     .then((response) => {
  //       console.log(response);
  //       addNewImages(response.data);
  //       setIsLoading(false);
  //       // Handle response
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       setIsLoading(false);
  //       // Handle error
  //     });
  // };

  const handleFileUpload = async (newFiles) => {
    setIsLoading(true);
    const formData = new FormData();
    newFiles.forEach((file, index) => {
      formData.append(`file[${index}]`, file);
      //formData.append(`file[]`, file);
    });

    // Handle validations
    const response = await uploadProductImages(formData, props.product.urunId);

    if (response.status == 200) {
      addNewImages(response.data);
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   console.log('selectedFiles:', selectedFiles);
  // }, [selectedFiles]);

  return (
    <div className='px-8 py-4 justify-center'>
      <div>
        <input
          type='file'
          name='file[]'
          multiple={true}
          ref={fileInputRef}
          className='hidden'
          onChange={onFileChange}
        />
        <div
          className='block w-full py-4 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none'
          onClick={onSelectFile}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6 mx-auto'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 6v6m0 0v6m0-6h6m-6 0H6'
            />
          </svg>
          <p className='text-center'>Resim yüklemek için tıklayın</p>
        </div>
      </div>
      <div className='flex flex-wrap'>
        {selectedFiles?.map((file, index) => (
          <FileItem key={index} file={file} index={index} />
        ))}
      </div>

      {isLoading && (
        <div className='flex my-4'>
          <div className='flex items-center justify-between px-2 '>
            Resimler Yükleniyor...
          </div>
          <div role='status'>
            <svg
              aria-hidden='true'
              className='w-8 h-8 mr-2 text-gray-200 animate-spin fill-blue-600'
              viewBox='0 0 100 101'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                fill='currentColor'
              />
              <path
                d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                fill='currentFill'
              />
            </svg>
            <span className='sr-only'>Loading...</span>
          </div>
        </div>
      )}
      <div
        className='flex items-center justify-between px-2 py-4'
        onClick={() => {
          sendNewOrder(selectedFiles);
        }}
      >
        <button className='font-medium border rounded px-2 py-2 min-w-full '>
          KAYDET
          {isUpdate && (
            <div role='status'>
              <svg
                aria-hidden='true'
                className='w-5 h-5 mx-auto text-gray-200 animate-spin fill-blue-600'
                viewBox='0 0 100 101'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                  fill='currentColor'
                />
                <path
                  d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                  fill='currentFill'
                />
              </svg>
              <span className='sr-only'>Loading...</span>
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
