import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { firebase } from "../../services/firebase";

const Slider = () => {
  const ImgInput1 = useRef(null);
  const ImgInput2 = useRef(null);
  const ImgInput3 = useRef(null);
  const [slider, setSlider] = useState(null);
  const { storage, db } = firebase();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "sliders"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setSlider(list);
      },
      (error) => {
        alert(error);
      }
    );

    return () => {
      unsub();
    };
  }, [db]);

  //get all input values;
  function handleInputs(index, e) {
    const name = e.target.name;
    setSlider((prev) => {
      const exist = prev;
      exist[index][name] = e.target.value;
      return exist;
    });
  } //till;

  //upload image to firebase;
  function handleImg(index, e) {
    setLoading(true);

    const storageRef = ref(storage, `slider-${index + 1}`);
    const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        alert(error);
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        setSlider((prev) => {
          prev[index]["img"] = url;
          return { ...prev };
        });
      }
    );

    setLoading(false);
  } //till;

  //form submition;
  async function handleSubmit(index, e) {
    e.preventDefault();
    setLoading(true);
    try {
      const ref = doc(db, "sliders", slider[index].id);
      await updateDoc(ref, slider[index]);
      alert("Your changes successfully saved");
    } catch (error) {
      alert("Opp!, There was an error occured");
    }
    setLoading(false);
  } //till;

  return (
    <section className='deshboard-slider-container'>
      <form onSubmit={(e) => handleSubmit(0, e)} className='item'>
        <h3>Slider-1</h3>
        <div>
          <input
            className='font-medium'
            type='text'
            defaultValue={slider && slider[0]?.header}
            onChange={(e) => handleInputs(0, e)}
            name='header'
            placeholder='Enter slider header'
          />
          <textarea
            onChange={(e) => handleInputs(0, e)}
            name='slag'
            defaultValue={slider && slider[0]?.slag}
            rows={5}
            placeholder='Enter slider slags'
          />
        </div>
        <div className='flex flex-col items-center gap-4'>
          {slider && (
            <Image width={300} height={150} src={slider[0].img} alt='' />
          )}
          <button
            disabled={loading}
            type='button'
            onClick={() => ImgInput1.current?.click()}
          >
            Change Image
          </button>
          <input
            onChange={(e) => handleImg(0, e)}
            ref={ImgInput1}
            hidden
            type='file'
            name='img'
          />
        </div>
        <div className='col-span-2 flex justify-center'>
          <button disabled={loading} type='submit'>
            Save Changes
          </button>
        </div>
      </form>

      <form onSubmit={(e) => handleSubmit(1, e)} className='item'>
        <h3>Slider-2</h3>
        <div>
          <input
            className='font-medium'
            onChange={(e) => handleInputs(1, e)}
            type='text'
            defaultValue={slider && slider[1]?.header}
            name='header'
            placeholder='Enter slider header'
          />
          <textarea
            onChange={(e) => handleInputs(1, e)}
            name='slag'
            rows={5}
            defaultValue={slider && slider[1]?.slag}
            placeholder='Enter slider slags'
          />
        </div>
        <div className='flex flex-col items-center gap-4'>
          {slider && (
            <Image width={300} height={150} src={slider[1].img} alt='' />
          )}
          <button type='button' onClick={() => ImgInput2.current?.click()}>
            Change Image
          </button>
          <input
            onChange={(e) => handleImg(1, e)}
            ref={ImgInput2}
            hidden
            type='file'
            name='img'
          />
        </div>
        <div className='col-span-2 flex justify-center'>
          <button disabled={loading} type='submit'>
            Save Changes
          </button>
        </div>
      </form>

      <form onSubmit={(e) => handleSubmit(2, e)} className='item'>
        <h3>Slider-3</h3>
        <div>
          <input
            className='font-medium'
            onChange={(e) => handleInputs(2, e)}
            type='text'
            name='header'
            defaultValue={slider && slider[2]?.header}
            placeholder='Enter slider header'
          />
          <textarea
            onChange={(e) => handleInputs(2, e)}
            name='slag'
            defaultValue={slider && slider[2]?.slag}
            rows={5}
            placeholder='Enter slider slags'
          />
        </div>
        <div className='flex flex-col items-center gap-4'>
          {slider && (
            <Image width={300} height={150} src={slider[2].img} alt='' />
          )}
          <button type='button' onClick={() => ImgInput3.current?.click()}>
            Change Image
          </button>
          <input
            onChange={(e) => handleImg(2, e)}
            ref={ImgInput3}
            hidden
            type='file'
            name='img'
          />
        </div>
        <div className='col-span-2 flex justify-center'>
          <button disabled={loading} type='submit'>
            Save Changes
          </button>
        </div>
      </form>
    </section>
  );
};

export default Slider;
