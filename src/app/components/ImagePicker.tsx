'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';

export default function ImagePicker({ label, name } : any) {
  const [pickedImage, setPickedImage] = useState();
  const imageInput: any = useRef();

  function handlePickClick() {
    imageInput.current.click();
  }

  function handleImageChange(event: any) {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    const fileReader: any = new FileReader();

    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  }

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <div>
        <div>
          {!pickedImage && <p>No image picked yet.</p>}
          {pickedImage && (
            <Image
              src={pickedImage}
              alt="The image selected by the user."
              width={100}
              height={100}
            />
          )}
        </div>
        <input
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={imageInput}
          onChange={handleImageChange}
        />
        <button
          type="button"
          onClick={handlePickClick}
        >
          Pick an Image
        </button>
      </div>
    </div>
  );
}
