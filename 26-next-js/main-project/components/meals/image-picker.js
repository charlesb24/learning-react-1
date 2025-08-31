'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';

import classes from './image-picker.module.css';

export default function ImagePicker({ label, name, defaultValue }) {
  const imageInput = useRef();
  const [ pickedImage, setPickedImage ] = useState();

  function handlePickImage() {
    imageInput.current.click();
  }

  function handleChangeImage(event) {
    const file = event.target.files[0];

    if (!file) {
      setPickedImage(null);

      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    }

    fileReader.readAsDataURL(file);
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{ label }</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No image selected.</p>}
          {pickedImage && <Image src={pickedImage} alt="The selected image" fill />}
        </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={imageInput}
          onChange={handleChangeImage}
          required
          defaultValue={defaultValue}
        />
        <button className={classes.button} type="button" onClick={handlePickImage}>
          Pick an Image
        </button>
      </div>
    </div>
  );
}